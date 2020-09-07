import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { Button, Text } from "react-native-paper";

export default function ChallengeActivityScreen() {
  const navigation = useNavigation();

  return (
    <Screen style={[BaseStyles.p4]}>
      <Text>Activity Type</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("ChallengeTypeScreen")}
      >
        Next
      </Button>
    </Screen>
  );
}
