import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Headline, Text } from "react-native-paper";
import BaseStyles from "../utils/BaseStyles";
import Challenge from "../api/models/Challenge";
import Score from "../api/models/Score";
import { toOrdinal } from "../utils";

interface Props {
  challenge: Challenge;
}

export default function Podium({ challenge }: Props) {
  const [first, second, third] = challenge.scores.slice(0, 3);

  return (
    <View style={[BaseStyles.row, BaseStyles.mb4, styles.placeContainer]}>
      <View style={[BaseStyles.col]}>
        {second && <Place place={2} score={second} />}
      </View>
      <View style={[BaseStyles.col]}>
        {first && <Place place={1} score={first} />}
      </View>
      <View style={[BaseStyles.col]}>
        {third && <Place place={3} score={third} />}
      </View>
    </View>
  );
}

interface PlaceProps {
  place: number;
  score: Score;
}

const sizes: number[] = [80, 60, 50];

function Place({ place, score }: PlaceProps) {
  const { avatar, firstName, lastName } = score;
  const size = sizes[place - 1];

  return (
    <View style={[styles.place]}>
      <Avatar.Image
        size={size}
        source={{ uri: avatar }}
        style={[BaseStyles.mb2]}
      />
      <Text>
        {firstName} {lastName}
      </Text>
      <Headline>{toOrdinal(place)}</Headline>
    </View>
  );
}

const styles = StyleSheet.create({
  placeContainer: {
    alignItems: "flex-end",
  },
  place: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
