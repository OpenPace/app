import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import StatusBar from "./components/StatusBar";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

export default function App(): React.ReactNode {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <AuthProvider>
      <ThemeProvider>
        <SafeAreaProvider>
          <Navigation />

          <StatusBar />
        </SafeAreaProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
