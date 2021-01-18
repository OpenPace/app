import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, RefreshControl, ScrollView, View } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Headline, List, Paragraph } from "react-native-paper";

import Screen from "../components/Screen";
import SegmentStaticMap from "../components/SegmentStaticMap";
import BaseStyles, { SPACER_4 } from "../utils/BaseStyles";
import { useAuthContext } from "../contexts/AuthContext";
import { useNewChallengeContext } from "../contexts/NewChallengeContext";
import { useUserPrefsContext } from "../contexts/UserPrefsContext";
import Segment from "../api/models/Segment";
import { getDetailedSegment } from "../services/SegmentService";
import { formatDistance } from "../utils";
import { ChallengesParamList } from "../types";

type SegmentRouteProp = RouteProp<
  ChallengesParamList,
  "ChallengeSegmentScreen"
>;

export default function ChallengeSegmentScreen() {
  const { navigate } = useNavigation();
  const route = useRoute<SegmentRouteProp>();
  const segmentId = route.params.segmentId;
  const { params, setParams } = useNewChallengeContext();
  const { userPrefs } = useUserPrefsContext();
  const { auth } = useAuthContext();
  const [segment, setSegment] = useState<DetailedSegment | undefined>(
    undefined,
  );

  useEffect(() => {
    getDetailedSegment(segmentId, { authToken: auth.token }).then(setSegment);
  }, [segmentId]);

  if (!segment) {
    return null;
  }

  function onNext() {
    setParams({ ...params, segmentId: segment.id, polyline: segment.polyline });
    navigate("ChallengeTimelineScreen");
  }

  const { polyline } = segment;
  const distance = formatDistance(segment.distance, userPrefs.imperial);
  const description = `${distance} - ${segment.city}, ${segment.state}`;
  const width = Dimensions.get("window").width - SPACER_4 * 2;

  return (
    <Screen style={[BaseStyles.py4]}>
      <ScrollView style={[BaseStyles.pbTabBar]}>
        <View style={[BaseStyles.px4]}>
          <Headline>{segment.name}</Headline>
          <Paragraph style={[BaseStyles.pb4]}>{description}</Paragraph>

          <SegmentStaticMap polyline={polyline} size={width} />

          <Button mode="contained" onPress={onNext} style={[BaseStyles.mt3]}>
            Select
          </Button>
        </View>
      </ScrollView>
    </Screen>
  );
}
