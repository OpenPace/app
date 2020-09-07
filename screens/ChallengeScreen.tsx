import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { ActivityIndicator, Text, Title } from "react-native-paper";
import { RouteProp, useRoute } from "@react-navigation/native";
import { HomeParamList } from "../types";
import Challenge from "../api/models/Challenge";
import { getChallenge } from "../services/ChallengeService";
import { useAuthContext } from "../contexts/AuthContext";

type ProfileScreenRouteProp = RouteProp<HomeParamList, "ChallengeScreen">;

export default function ChallengeScreen() {
  const route = useRoute<ProfileScreenRouteProp>();
  const { auth } = useAuthContext();
  const [challenge, setChallenge] = useState<Challenge | undefined>(undefined);

  useEffect(() => {
    async function loadChallenge() {
      try {
        const newChallenge = await getChallenge(route.params.id, {
          authToken: auth.token,
        });
        setChallenge(newChallenge);
      } catch (e) {}
    }

    loadChallenge();
  }, []);

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
