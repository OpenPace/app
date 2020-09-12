import * as React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ChallengeTabParamList, ChallengesParamList } from "../types";

import ChallengeShowScreen from "../screens/ChallengeShowScreen";

const Tab = createMaterialTopTabNavigator<ChallengeTabParamList>();

type ChallengeTabRouteProp = RouteProp<
  ChallengesParamList,
  "ChallengeShowScreen"
>;

export default function ChallengeTabNavigator() {
  const route = useRoute<ChallengeTabRouteProp>();
  console.log(route.params.id);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={ChallengeShowScreen} />
      <Tab.Screen name="Leaderboard" component={ChallengeShowScreen} />
      <Tab.Screen name="Chat" component={ChallengeShowScreen} />
    </Tab.Navigator>
  );
}
