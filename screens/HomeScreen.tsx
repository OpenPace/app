import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

import Screen from "../components/Screen";
import TabBar from "../components/TabBar";
import StravaButton from "../components/StravaButton";
import BaseStyles from "../utils/BaseStyles";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Screen style={[BaseStyles.p4]}>
      <StravaButton />

      <TabBar />
    </Screen>
  );
}
