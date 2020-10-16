import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import Score from "../api/models/Score";
import Challenge from "../api/models/Challenge";
import User from "../api/models/User";
import BaseStyles from "../utils/BaseStyles";
import { formatDistance, formatDuration, formatAltitude } from "../utils";

interface ListItemProps {
  score: Score;
  position: number;
  challenge: Challenge;
  user: User;
}

function formatScore(score: Score, challenge: Challenge, user: User) {
  if (challenge.challengeType === "distance") {
    return formatDistance(score.score, user.imperial);
  }

  if (challenge.challengeType === "time") {
    return formatDuration(score.score);
  }

  if (challenge.challengeType === "altitude") {
    return formatAltitude(score.score, user.imperial);
  }

  return formatDuration(score.score);
}

// distance -> meters
// time -> seconds
// altitude -> meters
// segment -> seconds
export default function LeaderboardItem(props: ListItemProps) {
  const { score, position, challenge, user } = props;
  const name = `${score.firstName} ${score.lastName}`;

  return (
    <View style={[BaseStyles.row, BaseStyles.py2, styles.container]}>
      <View style={[BaseStyles.p3]}>
        <Text>{position}</Text>
      </View>
      <View>
        <Avatar.Image source={{ uri: score.avatar }} />
      </View>

      <View style={{ flexGrow: 1, marginLeft: 8 }}>
        <Text>{name}</Text>
        <Text style={[BaseStyles.textMuted]}>Test</Text>
      </View>

      <View style={[BaseStyles.p3]}>
        <Text>{formatScore(score, challenge, user)}</Text>
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
