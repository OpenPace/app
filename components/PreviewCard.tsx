import React from "react";
import BaseStyles from "../utils/BaseStyles";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Caption, Title, Surface } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Challenge from "../api/models/Challenge";
import { cloudinaryImg } from "../utils";
import { inFuture, inPast, timeAgo, timeLeft } from "../utils/DateTime";

interface Props {
  challenge: Challenge;
}

const images = {
  distance: [cloudinaryImg("altitude-1.jpg"), cloudinaryImg("altitude-2.jpg")],
  time: [cloudinaryImg("altitude-1.jpg"), cloudinaryImg("altitude-2.jpg")],
  altitude: [cloudinaryImg("altitude-1.jpg"), cloudinaryImg("altitude-2.jpg")],
  segment: [cloudinaryImg("altitude-1.jpg"), cloudinaryImg("altitude-2.jpg")],
};

function imageSrc(challenge: Challenge): string {
  return images[challenge.challengeType][0];
}

export default function PreviewCard({ challenge }: Props) {
  const { navigate } = useNavigation();

  return (
    <Card
      style={[BaseStyles.mb4]}
      onPress={() => navigate("ChallengeShowScreen", { slug: challenge.slug })}
    >
      <View style={[BaseStyles.py2, styles.details]}>
        <Title>{challenge.name}</Title>
        <TimeSection challenge={challenge} />
      </View>
    </Card>
  );
}

function TimeSection({ challenge }: { challenge: Challenge }) {
  // Not started (startAt in the future)
  if (inFuture(challenge.startAt)) {
    return <Caption>Starts {timeLeft(challenge.startAt)}</Caption>;
  }

  // Ended (show when)
  if (inPast(challenge.endAt)) {
    return <Caption>Ended {timeAgo(challenge.startAt)}</Caption>;
  }

  // Current challenge (show time remaining)
  return <Caption>Ends {timeLeft(challenge.endAt)}</Caption>;
}

const styles = StyleSheet.create({
  img: {
    height: 100,
    width: 100,
  },
  details: {
    flexGrow: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  card: {
    height: 100,
    overflow: "hidden",
    flex: 0,
    flexBasis: "auto",
    flexDirection: "row",
  },
});
