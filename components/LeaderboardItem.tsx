import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Score from "../api/models/Score";
import Challenge from "../api/models/Challenge";
import BaseStyles from "../utils/BaseStyles";
import { formatDistance, formatDuration, formatAltitude } from "../utils";
import { timeAgo } from "../utils/DateTime";
import UserAvatar from "./UserAvatar";

interface ListItemProps {
  score: Score;
  position: number;
  challenge: Challenge;
  imperial: boolean;
}

function formatScore(score: Score, challenge: Challenge, imperial: boolean) {
  if (challenge.challengeType === "distance") {
    return formatDistance(score.amount, imperial, 2);
  }

  if (challenge.challengeType === "time") {
    return formatDuration(score.amount);
  }

  if (challenge.challengeType === "altitude") {
    return formatAltitude(score.amount, imperial);
  }

  if (challenge.challengeType === "segment" && score.amount === 0) {
    return "No Attempt";
  }

  return formatDuration(score.amount);
}

// distance -> meters
// time -> seconds
// altitude -> meters
// segment -> seconds
export default function LeaderboardItem(props: ListItemProps) {
  const { score, position, challenge, imperial } = props;
  const name = `${score.firstName} ${score.lastName}`;

  return (
    <View style={[BaseStyles.row, BaseStyles.py2, styles.container]}>
      <View style={[BaseStyles.p3]}>
        <Text>{position}</Text>
      </View>
      <View>
        <UserAvatar user={score} />
      </View>

      <View style={{ flexGrow: 1, marginLeft: 8 }}>
        <Text>{name}</Text>
        <Text style={[BaseStyles.textMuted]}>{timeAgo(score.updatedAt)}</Text>
      </View>

      <View style={[BaseStyles.p3]}>
        <Text>{formatScore(score, challenge, imperial)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
