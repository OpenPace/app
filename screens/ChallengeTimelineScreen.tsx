import * as React from "react";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { Button, Text } from "react-native-paper";

export default function ChallengeTimelineScreen() {
  return (
    <Screen style={[BaseStyles.p4]}>
      <Text>Challenge Timeline</Text>
      <Button>Next</Button>
    </Screen>
  );
}
