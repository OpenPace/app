import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { Button, Text } from "react-native-paper";
import { useChallengeContext } from "../contexts/ChallengeContext";

export default function ChallengeTypeScreen() {
  const navigation = useNavigation();
  const { challenge } = useChallengeContext();

  return (
    <Screen style={[BaseStyles.p4]}>
      <Text>Challenge Type</Text>
      <Text>{challenge.activityType}</Text>

      <Button
        mode="contained"
        onPress={() => navigation.navigate("ChallengeTimelineScreen")}
      >
        Next
      </Button>
    </Screen>
  );
}
