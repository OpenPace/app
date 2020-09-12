import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { ActivityIndicator, Text, Title } from "react-native-paper";
import { RouteProp, useRoute } from "@react-navigation/native";
import { HomeParamList } from "../types";
import { useChallengeContext } from "../contexts/ChallengeContext";

type ProfileScreenRouteProp = RouteProp<HomeParamList, "ChallengeShowScreen">;

export default function ChallengeShowScreen() {
  const { challenge } = useChallengeContext();

  if (!challenge) {
    return (
      <Screen style={[BaseStyles.p4]}>
        <ActivityIndicator animating={true} />
      </Screen>
    );
  }

  // Build out the two tabs
  // Two tabs: leaderboard and chat?
  return (
    <Screen style={[BaseStyles.p4]}>
      <Title>{challenge.name}</Title>

      <Text>Activity Type: {challenge.activityType}</Text>
      <Text>Challenge Type: {challenge.challengeType}</Text>
      <Text>Timeline: {challenge.timeline}</Text>
    </Screen>
  );
}
