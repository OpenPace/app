import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { Button, List, Paragraph } from "react-native-paper";
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
  const { setSegmentId } = useNewChallengeContext();
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
    setSegmentId(segment.id);
    navigate("ChallengeTimelineScreen");
  }

  return (
    <Screen style={[BaseStyles.py4]}>
      <ScrollView style={[BaseStyles.pbTabBar]}>
        <Paragraph style={[BaseStyles.px4]}>{segment.id}</Paragraph>
        <Paragraph style={[BaseStyles.px4]}>{segment.polyline}</Paragraph>
        <Button onPress={onNext}>Next</Button>
      </ScrollView>
    </Screen>
  );
}
