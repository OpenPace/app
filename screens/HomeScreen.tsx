import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

import Screen from "../components/Screen";
import TabBar from "../components/TabBar";
import BaseStyles from "../utils/BaseStyles";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Screen style={[BaseStyles.p4]}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("ChallengeActivityScreen")}
      >
        New Challenge
      </Button>

      <Button
        mode="contained"
        onPress={() => navigation.navigate("ChallengeScreen", { id: 1 })}
      >
        Challenge
      </Button>

      <TabBar />
    </Screen>
  );
}
