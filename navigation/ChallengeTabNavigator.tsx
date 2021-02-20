import React from "react";
import { RouteProp, useRoute, useFocusEffect } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ChallengeTabParamList, ChallengesParamList } from "../types";

import ChallengeShowScreen from "../screens/ChallengeShowScreen";
import { useChallengeContext } from "../contexts/ChallengeContext";
import LeaderboardScreen from "../screens/LeaderboardScreen";

const Tab = createMaterialTopTabNavigator<ChallengeTabParamList>();

type ChallengeTabRouteProp = RouteProp<
  ChallengesParamList,
  "ChallengeShowScreen"
>;

export default function ChallengeTabNavigator() {
  const { getChallenge } = useChallengeContext();
  const route = useRoute<ChallengeTabRouteProp>();

  useFocusEffect(() => {
    getChallenge(route.params.slug);
  });

  return (
    <Tab.Navigator>
      <Tab.Screen component={ChallengeShowScreen} name="Home" />
      <Tab.Screen component={LeaderboardScreen} name="Leaderboard" />
    </Tab.Navigator>
  );
}
