import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Avatar, Card } from "react-native-paper";
import BaseStyles from "../utils/BaseStyles";
import { ChallengeParams } from "../api/models/Challenge";
import { useNewChallengeContext } from "../contexts/NewChallengeContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { BottomTabParamList } from "../types";

type NavigationProp = StackNavigationProp<BottomTabParamList>;

export default function CannedChallenges() {
  const { setParams } = useNewChallengeContext();
  const navigation = useNavigation<NavigationProp>();

  const defaultActivity = "run";

  function selectChallenge(params: ChallengeParams) {
    setParams({ ...params, activityType: defaultActivity });
    navigation.navigate("Challenges", { screen: "ChallengeTimelineScreen" });
  }

  return (
    <ScrollView horizontal style={[BaseStyles.py2]}>
      <Card
        style={[BaseStyles.mb3, styles.card]}
        onPress={() => selectChallenge({ challengeType: "distance" })}
      >
        <Card.Title
          title="Distance Challenge"
          subtitle="Who can run the furthest"
          left={(props) => <Avatar.Icon {...props} icon="run" />}
        />
      </Card>

      <Card
        style={[BaseStyles.mb3, styles.card]}
        onPress={() => selectChallenge({ challengeType: "time" })}
      >
        <Card.Title
          title="Duration Challenge"
          subtitle="Who can run the longest"
          left={(props) => <Avatar.Icon {...props} icon="run" />}
        />
      </Card>

      <Card
        style={[BaseStyles.mb3, styles.card]}
        onPress={() => selectChallenge({ challengeType: "altitude" })}
      >
        <Card.Title
          title="Climbing Challenge"
          subtitle="Who can run the most elevation"
          left={(props) => <Avatar.Icon {...props} icon="run" />}
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
