import * as React from "react";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { Button, Text, TextInput, Title } from "react-native-paper";

export default function NewChallengeScreen() {
  return (
    <Screen style={[BaseStyles.p4]}>
      <Title style={[BaseStyles.mb4]}>New Challenge</Title>
      <Text>Activity Type</Text>
      <Text>Challenge Type</Text>
      <Text>Challenge Timeline</Text>
    </Screen>
  );
}
