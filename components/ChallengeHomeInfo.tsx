import * as React from "react";
import { Dimensions, View, Share } from "react-native";
import { Button, Title } from "react-native-paper";

import Podium from "../components/Podium";
import SegmentStaticMap from "../components/SegmentStaticMap";
import { shareLink } from "../utils";
import BaseStyles, { SPACER_4 } from "../utils/BaseStyles";
import Challenge from "../api/models/Challenge";
import ChallengeMeta from "./ChallengeMeta";

interface Props {
  challenge: Challenge;
}

function buildShareMessage(challenge: Challenge) {
  return shareLink(challenge.slug);
}

export default function ChallengeHomeInfo({ challenge }: Props) {
  const { polyline } = challenge;
  const width = Dimensions.get("window").width - SPACER_4 * 2;

  async function inviteFriends() {
    try {
      const result = await Share.share({
        message: buildShareMessage(challenge),
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <View>
      <Title style={[BaseStyles.mb4]}>{challenge.name}</Title>

      {polyline && (
        <SegmentStaticMap
          style={[BaseStyles.mb4]}
          polyline={polyline}
          size={width}
        />
      )}

      <Podium challenge={challenge} />

      <ChallengeMeta challenge={challenge} />

      <Button mode="contained" onPress={inviteFriends} style={[BaseStyles.mb4]}>
        Invite Friends
      </Button>
    </View>
  );
}
