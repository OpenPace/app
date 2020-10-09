import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import LeaderboardItem from "../components/LeaderboardItem";
import BaseStyles from "../utils/BaseStyles";
import { ScrollView } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";
import { useChallengeContext } from "../contexts/ChallengeContext";
import { getLeaderboard } from "../services/ChallengeService";
import { useAuthContext } from "../contexts/AuthContext";
import Score from "../api/models/Score";

export default function LeaderboardScreen() {
  const { challenge } = useChallengeContext();
  const { auth } = useAuthContext();
  const [scores, setScores] = useState<Score[] | undefined>(undefined);

  useEffect(() => {
    async function loadLeaderboard() {
      if (!challenge) {
        return;
      }

      const result = await getLeaderboard(challenge.slug, {
        authToken: auth.token,
      });
      setScores(result);
    }

    loadLeaderboard();
  }, [challenge]);

  if (!challenge || !scores) {
    return (
      <Screen style={[BaseStyles.p4]}>
        <ActivityIndicator animating={true} />
      </Screen>
    );
  }

  const items = scores.map((score, idx) => (
    <LeaderboardItem key={score.userId} position={idx + 1} score={score} />
  ));

  return (
    <Screen>
      <ScrollView>{items}</ScrollView>
    </Screen>
  );
}

interface ListItemProps {
  score: Score;
}

function ListItem({ score }: ListItemProps) {
  const name = `${score.firstName} ${score.lastName}`;

  return (
    <List.Item
      title={name}
      description={score.updatedAt}
      right={(props) => <List.Icon {...props} icon="folder" />}
      left={(props) => <List.Icon {...props} icon="folder" />}
    />
  );
}
