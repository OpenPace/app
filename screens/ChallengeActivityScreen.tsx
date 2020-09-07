import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { useChallengeContext } from "../contexts/ChallengeContext";
import { Button } from "react-native-paper";

export default function ChallengeActivityScreen() {
  const navigation = useNavigation();
  const { challenge, setChallenge } = useChallengeContext();

  function selectOption(option: "run" | "ride" | "swim") {
    challenge.activityType = option;
    setChallenge(challenge);
    navigation.navigate("ChallengeTypeScreen");
  }

  return (
    <Screen style={[BaseStyles.p4]}>
      <Button mode="outlined" onPress={() => selectOption("run")}>
        Run
      </Button>
      <Button mode="outlined" onPress={() => selectOption("ride")}>
        Ride
      </Button>
      <Button mode="outlined" onPress={() => selectOption("swim")}>
        Swim
      </Button>
    </Screen>
  );
}
