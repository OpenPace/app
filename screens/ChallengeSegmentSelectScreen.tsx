import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { List, Paragraph } from "react-native-paper";
import { useAuthContext } from "../contexts/AuthContext";
import { useUserPrefsContext } from "../contexts/UserPrefsContext";
import Segment from "../api/models/Segment";
import { getStarredSegments } from "../services/SegmentService";
import { formatDistance } from "../utils";

export default function ChallengeSegmentScreen() {
  const navigation = useNavigation();
  const { auth } = useAuthContext();
  const { userPrefs } = useUserPrefsContext();
  const [segments, setSegments] = useState<Segment[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  async function loadStarredSegments() {
    const result = await getStarredSegments({ authToken: auth.token });
    setSegments(result);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadStarredSegments().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    onRefresh();
  }, []);

  function selectSegment(segment: Segment) {
    navigation.navigate("ChallengeSegmentScreen", { segmentId: segment.id });
  }

  const segmentList = segments.map((segment) => {
    const distance = formatDistance(segment.distance, userPrefs.imperial);
    const description = `${distance} - ${segment.city}, ${segment.state}`;

    return (
      <List.Item
        key={segment.id}
        title={segment.name}
        description={description}
        left={() => <List.Icon icon="routes" />}
        onPress={() => selectSegment(segment)}
      />
    );
  });

  return (
    <Screen>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={[BaseStyles.py4]}
      >
        <Paragraph style={[BaseStyles.px4]}>
          To see segments in this list, please star them in your Strava app.
        </Paragraph>
        <List.Section style={[BaseStyles.pb4]}>
          <List.Subheader>Starred Segments</List.Subheader>
          {segmentList}
        </List.Section>
      </ScrollView>
    </Screen>
  );
}
