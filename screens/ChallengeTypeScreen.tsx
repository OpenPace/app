import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { Avatar, Card } from "react-native-paper";
import { useNewChallengeContext } from "../contexts/NewChallengeContext";
import { ChallengeType } from "../api/models/Challenge";

export default function ChallengeTypeScreen() {
  const navigation = useNavigation();
  const { params, setChallengeType } = useNewChallengeContext();

  function selectOption(option: ChallengeType) {
    setChallengeType(option);
    navigation.navigate("ChallengeTimelineScreen");
  }

  const activity = params.activityType;

  const options = [
    {
      title: "Total Distance",
      subtitle: `Who can ${activity || "go"} the furthest`,
      icon: "map-marker-distance",
      challengeType: "distance",
    },
    {
      title: "Total Time",
      subtitle: `Who can ${activity || "go"} the longest`,
      icon: "timer",
      challengeType: "time",
    },
  ];

  if (activity !== "swim") {
    options.push({
      title: "Total Altitude",
      subtitle: `Who can ${activity || "go"} the most elevation`,
      icon: "terrain",
      challengeType: "altitude",
    });
  }

  const optionBtns = options.map(({ title, subtitle, icon, challengeType }) => {
    return (
      <Card
        style={[BaseStyles.mb3]}
        key={title}
        onPress={() => selectOption(challengeType)}
      >
        <Card.Title
          title={title}
          subtitle={subtitle}
          left={(props) => <Avatar.Icon {...props} icon={icon} />}
        />
      </Card>
    );
  });

  return <Screen style={[BaseStyles.p4]}>{optionBtns}</Screen>;
}
