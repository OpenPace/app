import React from "react";
import BaseStyles from "../utils/BaseStyles";
import { StyleSheet, View } from "react-native";
import { Card, Caption, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Challenge from "../api/models/Challenge";
import { inFuture, inPast, timeAgo, timeLeft } from "../utils/DateTime";
import UserAvatar from "./UserAvatar";

interface Props {
  challenge: Challenge;
}

export default function PreviewCard({ challenge }: Props) {
  const { navigate } = useNavigation();

  return (
    <Card
      onPress={() => navigate("ChallengeShowScreen", { slug: challenge.slug })}
      style={[BaseStyles.mb3]}
    >
      <View style={[BaseStyles.py2, styles.details]}>
        <Title>{challenge.name}</Title>
        <Participants challenge={challenge} />
        <TimeSection challenge={challenge} />
      </View>
    </Card>
  );
}

function Participants({ challenge }: Props) {
  const avatars = challenge.scores.map((score) => (
    <UserAvatar
      key={score.userId}
      size={24}
      user={score}
      style={[BaseStyles.mr1]}
    />
  ));

  return <View style={[BaseStyles.row, styles.avatars]}>{avatars}</View>;
}

function TimeSection({ challenge }: { challenge: Challenge }) {
  // Not started (startDate in the future)
  if (inFuture(challenge.startDate)) {
    return <Caption>Starts {timeLeft(challenge.startDate)}</Caption>;
  }

  // Ended (show when)
  if (inPast(challenge.endDate)) {
    return <Caption>Ended {timeAgo(challenge.endDate)}</Caption>;
  }

  // Current challenge (show time remaining)
  return <Caption>Ends {timeLeft(challenge.endDate)}</Caption>;
}

const styles = StyleSheet.create({
  img: {
    height: 100,
    width: 100,
  },
  avatars: {
    alignItems: "center",
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
