import React from "react";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { ScrollView } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";
import { useChallengeContext } from "../contexts/ChallengeContext";

export default function LeaderboardScreen() {
  const { challenge } = useChallengeContext();

  if (!challenge) {
    return (
      <Screen style={[BaseStyles.p4]}>
        <ActivityIndicator animating={true} />
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView>
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </ScrollView>
    </Screen>
  );
}

function ListItem() {
  return (
    <List.Item
      title="First Item"
      description="Item description"
      right={(props) => <List.Icon {...props} icon="folder" />}
      left={(props) => <List.Icon {...props} icon="folder" />}
    />
  );
}
