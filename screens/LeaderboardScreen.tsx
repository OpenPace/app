import React, { useCallback, useEffect, useState } from "react";
import Screen from "../components/Screen";
import LeaderboardItem from "../components/LeaderboardItem";
import BaseStyles from "../utils/BaseStyles";
import { RefreshControl, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useChallengeContext } from "../contexts/ChallengeContext";
import { getLeaderboard } from "../services/ChallengeService";
import { useAuthContext } from "../contexts/AuthContext";
import { useUserPrefsContext } from "../contexts/UserPrefsContext";
import Score from "../api/models/Score";

export default function LeaderboardScreen() {
  const { challenge } = useChallengeContext();
  const { auth } = useAuthContext();
  const { userPrefs } = useUserPrefsContext();
  const [scores, setScores] = useState<Score[] | undefined>(undefined);
  const [refreshing, setRefreshing] = useState(false);

  async function loadLeaderboard() {
    if (!challenge) {
      return;
    }

    const result = await getLeaderboard(challenge.slug, {
      authToken: auth.token,
    });
    setScores(result);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadLeaderboard().then(() => setRefreshing(false));
  }, [challenge]);

  useEffect(() => {
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
    <LeaderboardItem
      challenge={challenge}
      imperial={userPrefs.imperial}
      key={score.userId}
      position={idx + 1}
      score={score}
    />
  ));

  return (
    <Screen>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={[BaseStyles.pbTabBar]}
      >
        {items}
      </ScrollView>
    </Screen>
  );
}
