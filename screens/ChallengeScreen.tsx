import * as React from "react";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { Title } from "react-native-paper";
import { RouteProp, useRoute } from "@react-navigation/native";
import { HomeParamList } from "../types";

type ProfileScreenRouteProp = RouteProp<HomeParamList, "ChallengeScreen">;

export default function ChallengeScreen() {
  const route = useRoute<ProfileScreenRouteProp>();

  return (
    <Screen style={[BaseStyles.p4]}>
      <Title>Challenge Screen: {route.params.id}</Title>
    </Screen>
  );
}
