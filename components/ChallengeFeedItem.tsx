import * as React from "react";
import { Card, Title, Text } from "react-native-paper";
import ChallengeActivity from "../api/models/ChallengeActivity";
import {
  fullName,
  formatDistance,
  formatDuration,
  formatAltitude,
} from "../utils";
import UserAvatar from "./UserAvatar";
import { staticMapUrl } from "../utils/StaticMap";
import { Dimensions, StyleSheet, View } from "react-native";
import BaseStyles, { SPACER_4 } from "../utils/BaseStyles";
import { DateTime } from "luxon";
import Challenge from "../api/models/Challenge";

interface Props {
  challenge: Challenge;
  challengeActivity: ChallengeActivity;
  imperial: boolean;
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

export default function ChallengeFeedItem(props: Props) {
  const { challengeActivity, challenge, imperial } = props;
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

        <View style={[BaseStyles.row, BaseStyles.py3]}>
          <View style={[BaseStyles.mr4]}>
            <Text style={[BaseStyles.textMuted]}>Distance</Text>
            <Title>{formatDistance(activity.distance, imperial, 1)}</Title>
          </View>
          <View style={[BaseStyles.mr4]}>
            <Text style={[BaseStyles.textMuted]}>Pace</Text>
            <Title>3000</Title>
          </View>
          <View style={[BaseStyles.mr4]}>
            <Text style={[BaseStyles.textMuted]}>Duration</Text>
            <Title>{formatDuration(activity.duration)}</Title>
          </View>
          <View style={[BaseStyles.mr4]}>
            <Text style={[BaseStyles.textMuted]}>Elevation</Text>
            <Title>{formatAltitude(activity.elevationGain, imperial)}</Title>
          </View>
        </View>
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
