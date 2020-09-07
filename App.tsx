import { StatusBar } from "expo-status-bar";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { AuthProvider } from "./contexts/AuthContext";

const theme = {
  ...DefaultTheme,
};

export default function App() {
  const isLoadingComplete = useCachedResources();

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
