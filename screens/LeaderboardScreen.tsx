import React, { useCallback, useEffect, useState } from "react";
import Screen from "../components/Screen";
import LeaderboardItem from "../components/LeaderboardItem";
import BaseStyles from "../utils/BaseStyles";
import { RefreshControl, FlatList } from "react-native";
import { useChallengeContext } from "../contexts/ChallengeContext";
import { getLeaderboard } from "../services/ChallengeService";
import { useAuthContext } from "../contexts/AuthContext";
import { useUserPrefsContext } from "../contexts/UserPrefsContext";
import Score from "../api/models/Score";

export default function LeaderboardScreen() {
  const { challenge } = useChallengeContext();
  const { auth } = useAuthContext();
  const { userPrefs } = useUserPrefsContext();
  const [scores, setScores] = useState<Score[]>([]);
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

  function renderItem({ item, index }: { item: Score; index: number }) {
    if (!challenge) {
      return null;
    }

    return (
      <LeaderboardItem
        challenge={challenge}
        imperial={userPrefs.imperial}
        position={index + 1}
        score={item}
      />
    );
  }

  return (
    <Screen>
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={[BaseStyles.pbTabBar]}
        data={scores}
        renderItem={renderItem}
        keyExtractor={(item) => item.userId.toString()}
      />
    </Screen>
  );
}
