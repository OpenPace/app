import React, { useEffect } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import StatusBar from "./components/StatusBar";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App(): React.ReactNode {
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    if (Platform.OS === "web") {
      return;
    }

    registerForPushNotificationsAsync().then(token => alert(token));

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    Notifications.addNotificationResponseReceivedListener(response => {
      alert(response);
    });
  }, []);


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

async function registerForPushNotificationsAsync() {
  let token: string|null = null;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return null;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
