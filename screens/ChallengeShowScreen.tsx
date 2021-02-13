import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import Screen from "../components/Screen";
import ChallengeHomeInfo from "../components/ChallengeHomeInfo";
import BaseStyles from "../utils/BaseStyles";
import { useChallengeContext } from "../contexts/ChallengeContext";

export default function ChallengeShowScreen() {
  const { fetchChallenge, challenge } = useChallengeContext();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    if (!challenge) {
      return;
    }

    setRefreshing(true);
    fetchChallenge(challenge.slug).then(() => setRefreshing(false));
  }, [challenge]);

  return (
    <Screen>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={[BaseStyles.pbTabBar]}
      >
        <View style={[BaseStyles.p4]}>
          {challenge && <ChallengeHomeInfo challenge={challenge} />}
        </View>
      </ScrollView>
    </Screen>
  );
}
