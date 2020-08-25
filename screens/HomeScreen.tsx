import * as React from "react";
import { Card, Button } from "react-native-paper";
import { ScrollView } from "react-native";

import Screen from "../components/Screen";
import TabBar from "../components/TabBar";

import BaseStyles from "../utils/BaseStyles";

export default function HomeScreen() {
  return (
    <Screen>
      <ScrollView style={[BaseStyles.p4]}>
        <CardExample />
        <CardExample />
        <CardExample />
        <CardExample />
      </ScrollView>
      <TabBar />
    </Screen>
  );
}

function CardExample() {
  return (
    <Card style={[BaseStyles.mb4]}>
      <Card.Cover source={{ uri: "https://picsum.photos/700" }} />

      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
}
