import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { Button } from "react-native-paper";

interface Params {
  name?: string;
  activityType?: "run" | "ride" | "swim";
  challengeType?: "distance" | "time" | "altitude" | "segment";
  timeline?: "day" | "week" | "weekend" | "month" | "custom";
  startAt?: Date;
  endAt?: Date;
}

export default function ChallengeNewScreen() {
  const route = useRoute();
  console.log(route.params);
  const [params, setParams] = useState<Params>({} as Params);

  function selectChallengeType(
    challengeType: "distance" | "time" | "altitude" | "segment"
  ) {
    params.challengeType = challengeType;
    setParams(params);
  }

  return (
    <Screen style={[BaseStyles.p4]}>
      <Button mode="outlined" onPress={() => selectChallengeType("distance")}>
        Total Distance
      </Button>
      <Button mode="outlined" onPress={() => selectChallengeType("time")}>
        Time
      </Button>
      <Button mode="outlined" onPress={() => selectChallengeType("altitude")}>
        Climbing
      </Button>
    </Screen>
  );
}
