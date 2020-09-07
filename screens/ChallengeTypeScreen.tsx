import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { Button } from "react-native-paper";
import { useChallengeContext } from "../contexts/ChallengeContext";

export default function ChallengeTypeScreen() {
  const navigation = useNavigation();
  const { challenge, setChallenge } = useChallengeContext();

  function selectOption(option: "distance" | "time" | "altitude" | "segment") {
    challenge.challengeType = option;
    setChallenge(challenge);
    navigation.navigate("ChallengeTimelineScreen");
  }

  return (
    <Screen style={[BaseStyles.p4]}>
      <Button mode="outlined" onPress={() => selectOption("distance")}>
        Total Distance
      </Button>
      <Button mode="outlined" onPress={() => selectOption("time")}>
        Time
      </Button>
      <Button mode="outlined" onPress={() => selectOption("altitude")}>
        Climbing
      </Button>
    </Screen>
  );
}
