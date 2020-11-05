import React, { createContext, useContext, useEffect, useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import { DefaultTheme, DarkTheme } from "../themes";
import useColorScheme from "../hooks/useColorScheme";

type ContextType = {
  scheme: "light" | "dark";
  setScheme: (scheme: "light" | "dark") => void;
  toggleScheme: () => void;
};

type Props = {
  children: React.ReactNode;
};

export const ThemeContext = createContext<ContextType>({} as any);

function ThemeProvider({ children }: Props) {
  const defaultScheme = useColorScheme();
  const [scheme, setScheme] = useState<"light" | "dark">(defaultScheme);

  async function loadScheme() {
    const newScheme = await AsyncStorage.getItem("scheme");

    if (newScheme === "light" || newScheme === "dark") {
      setScheme(newScheme);
    }
  }

  useEffect(() => {
    loadScheme();
  }, []);

  function toggleScheme() {
    setScheme(scheme === "light" ? "dark" : "light");
  }

  const theme = scheme === "light" ? DefaultTheme : DarkTheme;

  return (
    <ThemeContext.Provider value={{ scheme, setScheme, toggleScheme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
}

function useThemeContext() {
  return useContext(ThemeContext);
}

export { ThemeProvider, useThemeContext };
