import React, { useCallback, useEffect, useState } from "react";
import Screen from "../components/Screen";
import LeaderboardItem from "../components/LeaderboardItem";
import BaseStyles from "../utils/BaseStyles";
import { RefreshControl, ScrollView, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useChallengeContext } from "../contexts/ChallengeContext";
import { getLeaderboard, getActivities } from "../services/ChallengeService";
import { useAuthContext } from "../contexts/AuthContext";
import { useUserPrefsContext } from "../contexts/UserPrefsContext";
import Score from "../api/models/Score";
import ChallengeActivity from "../api/models/ChallengeActivity";
import ChallengeFeedItem from "../components/ChallengeFeedItem";

export default function ChallengeFeedScreen() {
  const { challenge } = useChallengeContext();
  const { auth } = useAuthContext();
  const { userPrefs } = useUserPrefsContext();
  const [activities, setActivities] = useState<ChallengeActivity[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  async function loadFeed() {
    if (!challenge) {
      return;
    }

    const result = await getActivities(challenge.slug, {
      authToken: auth.token,
    });

    setActivities(result);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadFeed().then(() => setRefreshing(false));
  }, [challenge]);

  useEffect(() => {
    loadFeed();
  }, [challenge]);

  if (!challenge) {
    return (
      <Screen style={[BaseStyles.p4]}>
        <ActivityIndicator animating={true} />
      </Screen>
    );
  }

  const items = activities.map((activity) => (
    <ChallengeFeedItem key={activity.id} challengeActivity={activity} />
  ));

  return (
    <Screen>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={[BaseStyles.pbTabBar]}
      >
        <View style={[BaseStyles.p4]}>{items}</View>
      </ScrollView>
    </Screen>
  );
}
