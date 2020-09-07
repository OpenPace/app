import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { Button } from "react-native-paper";
import { useChallengeContext } from "../contexts/ChallengeContext";
import { createChallenge } from "../services/ChallengeService";

export default function ChallengeTimelineScreen() {
  const navigation = useNavigation();
  const { challenge } = useChallengeContext();

  function selectOption(option: "day" | "week" | "weekend" | "month") {
    challenge.timeline = option;
    createChallenge(challenge);
    navigation.navigate("HomeScreen");
  }

  return (
    <Screen style={[BaseStyles.p4]}>
      <Button mode="outlined" onPress={() => selectOption("day")}>
        Day
      </Button>
      <Button mode="outlined" onPress={() => selectOption("week")}>
        Week
      </Button>
      <Button mode="outlined" onPress={() => selectOption("weekend")}>
        Weekend
      </Button>
      <Button mode="outlined" onPress={() => selectOption("month")}>
        Month
      </Button>
    </Screen>
  );
}
