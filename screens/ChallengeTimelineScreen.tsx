import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { Avatar, Card } from "react-native-paper";
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
      <Card style={[BaseStyles.mb3]} onPress={() => selectOption("day")}>
        <Card.Title
          title="One Day"
          left={(props) => <Avatar.Text {...props} label="1" />}
        />
      </Card>

      <Card style={[BaseStyles.mb3]} onPress={() => selectOption("week")}>
        <Card.Title
          title="Week"
          left={(props) => <Avatar.Text {...props} label="2" />}
        />
      </Card>

      <Card style={[BaseStyles.mb3]} onPress={() => selectOption("weekend")}>
        <Card.Title
          title="Weekend"
          left={(props) => <Avatar.Text {...props} label="3" />}
        />
      </Card>

      <Card style={[BaseStyles.mb3]} onPress={() => selectOption("custom")}>
        <Card.Title
          title="Custom Dates"
          left={(props) => <Avatar.Text {...props} label="4" />}
        />
      </Card>
    </Screen>
  );
}
