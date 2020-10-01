import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { Avatar, Card } from "react-native-paper";
import { useNewChallengeContext } from "../contexts/NewChallengeContext";
import { ChallengeType } from "../api/models/Challenge";

export default function ChallengeTypeScreen() {
  const navigation = useNavigation();
  const { setChallengeType } = useNewChallengeContext();

  function selectOption(option: ChallengeType) {
    setChallengeType(option);
    navigation.navigate("ChallengeTimelineScreen");
  }

  const options = [
    {
      title: "Total Distance",
      icon: "map-marker-distance",
      challengeType: "distance",
    },
    { title: "Total Time", icon: "timer", challengeType: "time" },
    {
      title: "Total Altitude",
      icon: "slope-uphill",
      challengeType: "altitude",
    },
  ];

  const optionBtns = options.map(({ title, icon, challengeType }) => {
    return (
      <Card
        style={[BaseStyles.mb4]}
        key={title}
        onPress={() => selectOption(challengeType)}
      >
        <Card.Title
          title={title}
          left={(props) => <Avatar.Icon {...props} icon={icon} />}
        />
      </Card>
    );
  });

  return <Screen style={[BaseStyles.p4]}>{optionBtns}</Screen>;
}
