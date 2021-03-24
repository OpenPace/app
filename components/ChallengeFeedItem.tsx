import * as React from "react";
import { MaterialIcons } from "@expo/vector-icons";
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
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

interface Props {
  challenge: Challenge;
  challengeActivity: ChallengeActivity;
  imperial: boolean;
}

function UpArrow() {
  const theme = useColorScheme();
  const color = Colors[theme]["success"];

  return <MaterialIcons color={color} name="arrow-upward" size={18} />;
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
    <Card style={[BaseStyles.mb4]}>
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
            <Title>
              {formatDistance(activity.distance, imperial, 1)}
              {challenge.challengeType === "distance" && <UpArrow />}
            </Title>
          </View>
          <View style={[BaseStyles.mr4]}>
            <Text style={[BaseStyles.textMuted]}>Duration</Text>
            <Title>
              {formatDuration(activity.duration)}
              {challenge.challengeType === "time" && <UpArrow />}
            </Title>
          </View>
          <View style={[BaseStyles.mr4]}>
            <Text style={[BaseStyles.textMuted]}>Elevation</Text>
            <Title>
              {challenge.challengeType === "altitude" && <UpArrow />}
              {formatAltitude(activity.elevationGain, imperial)}
            </Title>
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
