import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import Score from "../api/models/Score";

import BaseStyles from "../utils/BaseStyles";

interface ListItemProps {
  score: Score;
  position: number;
}

export default function LeaderboardItem({ score, position }: ListItemProps) {
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
        <Text>{score.score}</Text>
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
