import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { DefaultTheme, DarkTheme } from "./themes";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const scheme = useColorScheme();
  const theme = scheme === "light" ? DefaultTheme : DarkTheme;

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AuthProvider>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <Navigation />

            <StatusBar />
          </SafeAreaProvider>
        </PaperProvider>
      </AuthProvider>
    );
  }
}
