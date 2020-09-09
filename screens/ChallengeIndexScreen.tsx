import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import TabBar from "../components/TabBar";
import { ScrollView } from "react-native";
import { ActivityIndicator, Button, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import Challenge from "../api/models/Challenge";
import { getChallengesByUser } from "../services/ChallengeService";
import { useAuthContext } from "../contexts/AuthContext";

export default function ChallengeIndexScreen() {
  const { auth } = useAuthContext();
  const [challenges, setChallenges] = useState<Challenge[] | undefined>(
    undefined
  );

  useEffect(() => {
    async function loadChallenge() {
      try {
        const allChallenges = await getChallengesByUser({
          authToken: auth.token,
        });
        setChallenges(allChallenges);
      } catch (e) {}
    }

    loadChallenge();
  }, []);

  if (!challenges) {
    return (
      <Screen style={[BaseStyles.p4]}>
        <ActivityIndicator animating={true} />

        <TabBar />
      </Screen>
    );
  }

  const cards = challenges.map((challenge) => (
    <ChallengeCard challenge={challenge} />
  ));

  return (
    <Screen>
      <ScrollView style={[BaseStyles.p4]}>{cards}</ScrollView>

      <TabBar />
    </Screen>
  );
}

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const navigation = useNavigation();
  const name =
    challenge.name ||
    `${challenge.timeline} ${challenge.activityType} challenge`;

  return (
    <Card key={challenge.id} style={[BaseStyles.mb4]}>
      <Card.Title title={name} subtitle="Card Subtitle" />
      <Card.Actions>
        <Button
          onPress={() =>
            navigation.navigate("ChallengeShowScreen", { id: challenge.id })
          }
        >
          View
        </Button>
      </Card.Actions>
    </Card>
  );
}
