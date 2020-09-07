import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { Button, Text } from "react-native-paper";

export default function ChallengeTypeScreen() {
  const navigation = useNavigation();

  return (
    <Screen style={[BaseStyles.p4]}>
      <Text>Challenge Type</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("ChallengeTimelineScreen")}
      >
        Next
      </Button>
    </Screen>
  );
}
