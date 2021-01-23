import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Card } from "react-native-paper";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { useNewChallengeContext } from "../contexts/NewChallengeContext";
import { ChallengeTimeline } from "../api/models/Challenge";

export default function ChallengeTimelineScreen() {
  const navigation = useNavigation();
  const { setTimeline } = useNewChallengeContext();

  function selectOption(option: ChallengeTimeline) {
    setTimeline(option);
    navigation.navigate("ChallengeDateScreen");
  }

  return (
    <Screen style={[BaseStyles.p4]}>
      <Card onPress={() => selectOption("day")} style={[BaseStyles.mb3]}>
        <Card.Title
          left={(props) => <Avatar.Text {...props} label="1" />}
          title="One Day"
        />
      </Card>

      <Card onPress={() => selectOption("week")} style={[BaseStyles.mb3]}>
        <Card.Title
          left={(props) => <Avatar.Text {...props} label="2" />}
          title="Week"
        />
      </Card>

      <Card onPress={() => selectOption("weekend")} style={[BaseStyles.mb3]}>
        <Card.Title
          left={(props) => <Avatar.Text {...props} label="3" />}
          title="Weekend"
        />
      </Card>

      <Card onPress={() => selectOption("custom")} style={[BaseStyles.mb3]}>
        <Card.Title
          left={(props) => <Avatar.Text {...props} label="4" />}
          title="Custom Dates"
        />
      </Card>
    </Screen>
  );
}
