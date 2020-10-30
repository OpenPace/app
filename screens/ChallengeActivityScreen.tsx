import React from "react";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { capitalize } from "../utils";
import { Avatar, Card } from "react-native-paper";
import { useNewChallengeContext } from "../contexts/NewChallengeContext";

export default function ChallengeActivityScreen() {
  const navigation = useNavigation();
  const { setActivityType } = useNewChallengeContext();

  function selectOption(option: "run" | "ride" | "swim") {
    setActivityType(option);
    navigation.navigate("ChallengeTypeScreen");
  }

  const options = ["run", "bike", "swim"].map((opt) => {
    return (
      <Card
        key={opt}
        onPress={() => selectOption(opt)}
        style={[BaseStyles.mb3]}
      >
        <Card.Title
          left={(props) => <Avatar.Icon {...props} icon={opt} />}
          title={capitalize(opt)}
        />
      </Card>
    );
  });

  return <Screen style={[BaseStyles.p4]}>{options}</Screen>;
}
