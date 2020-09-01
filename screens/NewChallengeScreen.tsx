import * as React from "react";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { Text } from "../components/Themed";

export default function NewChallengeScreen() {
  return (
    <Screen style={[BaseStyles.p4]}>
      <Text>New Challenge</Text>
    </Screen>
  );
}
