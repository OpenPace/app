import * as React from "react";
import { Card, Title, Text } from "react-native-paper";
import ChallengeActivity from "../api/models/ChallengeActivity";
import { fullName } from "../utils";
import UserAvatar from "./UserAvatar";
import { staticMapUrl } from "../utils/StaticMap";
import { Dimensions, StyleSheet, View } from "react-native";
import BaseStyles, { SPACER_4 } from "../utils/BaseStyles";
import { DateTime } from "luxon";

interface Props {
  challengeActivity: ChallengeActivity;
}

function formatDate(datetime: DateTime) {
  const now = DateTime.local();

  if (datetime.hasSame(now, "day")) {
    return datetime.toFormat("'Today at' t");
  }

  if (datetime.hasSame(now.minus({ days: 1 }), "day")) {
    return datetime.toFormat("'Yesterday at' t");
  }

  return datetime.toFormat("ccc DD 'at' t");
}

export default function ChallengeFeedItem({ challengeActivity }: Props) {
  const { activity, user } = challengeActivity;
  const width = Dimensions.get("window").width - SPACER_4 * 2;
  const height = width * 0.6;
  const url = staticMapUrl(activity.polyline, { height, width });

  return (
    <Card>
      <Card.Cover style={{ width, height }} source={{ uri: url }} />

      <Card.Content>
        <View style={[BaseStyles.row, BaseStyles.py3, styles.container]}>
          <View>
            <UserAvatar size={44} user={user} />
          </View>

          <View style={{ flexGrow: 1, marginLeft: 8 }}>
            <Title>{fullName(user)}</Title>
            <Text style={[BaseStyles.textMuted]}>
              {formatDate(activity.startAtLocal)}
            </Text>
          </View>
        </View>

        <Title>{activity.name}</Title>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
