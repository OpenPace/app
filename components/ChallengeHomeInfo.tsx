import * as React from "react";
import { DateTime } from "luxon";
import { Dimensions, View, Share, StyleSheet } from "react-native";
import {
  Avatar,
  Button,
  Caption,
  ProgressBar,
  Title,
} from "react-native-paper";

import Podium from "../components/Podium";
import SegmentStaticMap from "../components/SegmentStaticMap";
import { capitalize, shareLink } from "../utils";
import BaseStyles, { SPACER_4 } from "../utils/BaseStyles";
import { inFuture, inPast, timeAgo, timeLeft } from "../utils/DateTime";
import Challenge from "../api/models/Challenge";

interface Props {
  challenge: Challenge;
}

const challengeTypeIcons = {
  distance: "map-marker-distance",
  time: "timer",
  altitude: "terrain",
  segment: "",
};

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
      // show error
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

      <View style={[BaseStyles.row, BaseStyles.mb4, styles.info]}>
        <Avatar.Icon
          icon={challenge.activityType}
          size={24}
          style={[BaseStyles.mr1]}
        />
        <Avatar.Icon
          icon={challengeTypeIcons[challenge.challengeType]}
          size={24}
          style={[BaseStyles.mr2]}
        />

        <Caption>
          {capitalize(challenge.activityType)} &middot;{" "}
          {capitalize(challenge.challengeType)}
        </Caption>
      </View>

      <TimeLeft challenge={challenge} />

      <Button mode="contained" onPress={inviteFriends} style={[BaseStyles.mb4]}>
        Invite Friends
      </Button>
    </View>
  );
}

function TimeLeft({ challenge }: Props) {
  let caption = `Ends ${timeLeft(challenge.endAt)}`;
  const totalTime = challenge.endAt.diff(challenge.startAt).as("seconds");
  const timeElapsed = DateTime.local().diff(challenge.startAt).as("seconds");
  let progress = timeElapsed / totalTime;

  // Not started (startAt in the future)
  if (inFuture(challenge.startAt)) {
    progress = 0;
    caption = `Starts ${timeLeft(challenge.startAt)}`;
  }

  // Ended (show when)
  if (inPast(challenge.endAt)) {
    progress = 1;
    caption = `Ended ${timeAgo(challenge.startAt)}`;
  }

  return (
    <View style={[BaseStyles.mb4]}>
      <ProgressBar progress={progress} />
      <Caption>{caption}</Caption>
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    alignItems: "center",
  },
});
