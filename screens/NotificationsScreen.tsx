import * as React from "react";
import Screen from "../components/Screen";
import TabBar from "../components/TabBar";
import BaseStyles from "../utils/BaseStyles";
import { Text } from "react-native-paper";

export default function NotificationsScreen() {
  return (
    <Screen style={[BaseStyles.p4]}>
      <Text>Notifications</Text>

      <TabBar />
    </Screen>
  );
}
