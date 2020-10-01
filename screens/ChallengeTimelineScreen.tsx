import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { Button } from "react-native-paper";
import { useAuthContext } from "../contexts/AuthContext";
import { useNewChallengeContext } from "../contexts/NewChallengeContext";
import { createChallenge } from "../services/ChallengeService";

export default function ChallengeTimelineScreen() {
  const navigation = useNavigation();
  const { params, setTimeline } = useNewChallengeContext();
  const { auth } = useAuthContext();

  async function selectOption(option: "day" | "week" | "weekend" | "month") {
    setTimeline(option);
    params.timeline = option;

    try {
      const newChallenge = await createChallenge(params, {
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
