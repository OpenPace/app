import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

import { apiPost, Options } from "../api/client";

export async function savePushToken(token: string, options: Options) {
  const response = await apiPost("/push_tokens", {
    ...options,
    data: {
      token,
    },
  });

  if (response.status !== 201) {
    throw new Error("Error saving push token");
  }

  return token;
}

export async function registerForPushNotifications(options: Options) {
  let token: string;

  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      throw new Error("Failed to get push token for push notification!");
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    throw new Error("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return savePushToken(token, options);
}
