import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Caption, ProgressBar } from "react-native-paper";
import BaseStyles from "../utils/BaseStyles";
import Challenge from "../api/models/Challenge";
import { capitalize } from "../utils";
import { DateTime } from "luxon";
import { timeLeft, inFuture, inPast, timeAgo } from "../utils/DateTime";

const challengeTypeIcons = {
  distance: "map-marker-distance",
  time: "timer",
  altitude: "terrain",
  segment: "routes",
};

interface Props {
  challenge: Challenge;
}

const styles = StyleSheet.create({
  info: {
    alignItems: "center",
  },
});

export default function ChallengeMeta({ challenge }: Props) {
  return (
    <View>
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
          {capitalize(challenge.challengeType)} &middot;{" "}
          {challenge.startDate.toLocaleString(DateTime.DATE_MED)}
          {" - "}
          {challenge.endDate.toLocaleString(DateTime.DATE_MED)}
        </Caption>
      </View>

      <TimeLeft challenge={challenge} />
    </View>
  );
}

function TimeLeft({ challenge }: Props) {
  let caption = `Ends ${timeLeft(challenge.endDate)}`;
  const totalTime = challenge.endDate.diff(challenge.startDate).as("seconds");
  const timeElapsed = DateTime.local().diff(challenge.startDate).as("seconds");
  let progress = timeElapsed / totalTime;

  // Not started (startDate in the future)
  if (inFuture(challenge.startDate)) {
    progress = 0;
    caption = `Starts ${timeLeft(challenge.startDate)}`;
  }

  // Ended (show when)
  if (inPast(challenge.endDate)) {
    progress = 1;
    caption = `Ended ${timeAgo(challenge.endDate)}`;
  }

  return (
    <View style={[BaseStyles.mb4]}>
      <ProgressBar progress={progress} />
      <Caption>{caption}</Caption>
    </View>
  );
}
