import React from "react";
import BaseStyles from "../utils/BaseStyles";
import { StyleSheet, View } from "react-native";
import { Card, Caption, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Challenge from "../api/models/Challenge";
import { inFuture, inPast, timeAgo, timeLeft } from "../utils/DateTime";

interface Props {
  challenge: Challenge;
}

export default function PreviewCard({ challenge }: Props) {
  const { navigate } = useNavigation();

  return (
    <Card
      onPress={() => navigate("ChallengeShowScreen", { slug: challenge.slug })}
      style={[BaseStyles.mb4]}
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
