import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
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
    <Screen style={[BaseStyles.p4]}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={[BaseStyles.pbTabBar]}
      >
        {challenge && <ChallengeHomeInfo challenge={challenge} />}
      </ScrollView>
    </Screen>
  );
}
