import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Avatar, Card } from "react-native-paper";
import BaseStyles from "../utils/BaseStyles";
import { ChallengeParams } from "../api/models/Challenge";
import { useNewChallengeContext } from "../contexts/NewChallengeContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { BottomTabParamList } from "../types";
import AvatarIcon from "./AvatarIcon";

type NavigationProp = StackNavigationProp<BottomTabParamList>;

export default function CannedChallenges() {
  const { setParams } = useNewChallengeContext();
  const navigation = useNavigation<NavigationProp>();

  const defaultActivity = "run";

  function selectChallenge(params: ChallengeParams) {
    setParams({ ...params, activityType: defaultActivity });
    if (params.challengeType === "segment") {
      navigation.navigate("Challenges", { screen: "ChallengeSegmentScreen" });
    } else {
      navigation.navigate("Challenges", { screen: "ChallengeTimelineScreen" });
    }
  }

  return (
    <ScrollView horizontal style={[BaseStyles.py2]}>
      <Card
        onPress={() => selectChallenge({ challengeType: "distance" })}
        style={[BaseStyles.mb3, styles.card]}
      >
        <Card.Title
          left={(props) => (
            <AvatarIcon
              {...props}
              bgColor="primary"
              icon="map-marker-distance"
            />
          )}
          subtitle="Who can run the furthest"
          title="Distance Challenge"
        />
      </Card>

      <Card
        onPress={() => selectChallenge({ challengeType: "time" })}
        style={[BaseStyles.mb3, styles.card]}
      >
        <Card.Title
          left={(props) => (
            <AvatarIcon {...props} bgColor="info" icon="timer" />
          )}
          subtitle="Who can run the longest"
          title="Duration Challenge"
        />
      </Card>

      <Card
        onPress={() => selectChallenge({ challengeType: "altitude" })}
        style={[BaseStyles.mb3, styles.card]}
      >
        <Card.Title
          left={(props) => (
            <AvatarIcon {...props} bgColor="danger" icon="terrain" />
          )}
          subtitle="Who can run the most elevation"
          title="Climbing Challenge"
        />
      </Card>

      <Card
        onPress={() => selectChallenge({ challengeType: "segment" })}
        style={[BaseStyles.mb3, styles.card]}
      >
        <Card.Title
          left={(props) => (
            <AvatarIcon {...props} bgColor="success" icon="routes" />
          )}
          subtitle="Who can run the segment the fastest"
          title="Segment Challenge"
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    marginRight: 16,
  },
});
