import React from "react";
import { View, Share } from "react-native";
import { ActivityIndicator, Button, Text, Title } from "react-native-paper";
import Screen from "../components/Screen";
import Podium from "../components/Podium";
import BaseStyles from "../utils/BaseStyles";
import { useChallengeContext } from "../contexts/ChallengeContext";

export default function ChallengeShowScreen() {
  const { challenge } = useChallengeContext();

  if (!challenge) {
    return (
      <Screen style={[BaseStyles.p4]}>
        <ActivityIndicator animating={true} />
      </Screen>
    );
  }

  async function inviteFriends() {
    try {
      const result = await Share.share({
        message: "Join the Challenge: URL",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Screen style={[BaseStyles.p4]}>
      <Title>{challenge.name}</Title>

      <Podium challenge={challenge} />

      <View>
      </View>

      <Text>Activity Type: {challenge.activityType}</Text>
      <Text>Challenge Type: {challenge.challengeType}</Text>
      <Text>Timeline: {challenge.timeline}</Text>
      <Text>Show the amount of time left</Text>
      <Text>Show 1st, 2nd, 3rd place</Text>

      <Button mode="contained" onPress={inviteFriends} style={[BaseStyles.mb4]}>
        Invite Friends
      </Button>
    </Screen>
  );
}
