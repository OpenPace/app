import React from "react";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { ActivityIndicator, Text, Title } from "react-native-paper";
import { useChallengeContext } from "../contexts/ChallengeContext";

export default function ChallengeShowScreen() {
  const { challenge } = useChallengeContext();

  if (!challenge) {
    return (
      <Screen style={[BaseStyles.p4]}>
        <ActivityIndicator animating={true} />
      </Screen>
    );
  }

  return (
    <Screen style={[BaseStyles.p4]}>
      <Title>{challenge.name}</Title>

      <Text>Activity Type: {challenge.activityType}</Text>
      <Text>Challenge Type: {challenge.challengeType}</Text>
      <Text>Timeline: {challenge.timeline}</Text>
      <Text>Show the amount of time left</Text>
      <Text>Show 1st, 2nd, 3rd place</Text>
    </Screen>
  );
}
