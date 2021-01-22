import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

export async function registerForPushNotifications() {
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

  return token;
}
