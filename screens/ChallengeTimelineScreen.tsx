import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { Button } from "react-native-paper";
import { useAuthContext } from "../contexts/AuthContext";
import { useChallengeContext } from "../contexts/ChallengeContext";
import { createChallenge } from "../services/ChallengeService";

export default function ChallengeTimelineScreen() {
  const navigation = useNavigation();
  const { challenge } = useChallengeContext();
  const { auth } = useAuthContext();

  async function selectOption(option: "day" | "week" | "weekend" | "month") {
    challenge.timeline = option;
    try {
      const newChallenge = await createChallenge(challenge, {
        authToken: auth.token,
      });
      navigation.navigate("ChallengeShowScreen", { id: newChallenge.id });
    } catch (e) {}
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
