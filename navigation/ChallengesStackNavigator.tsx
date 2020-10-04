import * as React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
  HeaderBackButton,
} from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import ChallengeIndexScreen from "../screens/ChallengeIndexScreen";
import ChallengeActivityScreen from "../screens/ChallengeActivityScreen";
import ChallengeTypeScreen from "../screens/ChallengeTypeScreen";
import ChallengeTimelineScreen from "../screens/ChallengeTimelineScreen";
import ChallengeDateScreen from "../screens/ChallengeDateScreen";
import ChallengeDetailsScreen from "../screens/ChallengeDetailsScreen";
import { ChallengesParamList } from "../types";
import ChallengeTabNavigator from "./ChallengeTabNavigator";

type ChallengeNavigationProp = StackNavigationProp<ChallengesParamList>;

const ChallengesStack = createStackNavigator<ChallengesParamList>();

export default function ChallengesStackNavigator() {
  return (
    <ChallengesStack.Navigator>
      <ChallengesStack.Screen
        name="ChallengesScreen"
        component={ChallengeIndexScreen}
        options={{ title: "Challenges" }}
      />
      <ChallengesStack.Screen
        name="ChallengeShowScreen"
        component={ChallengeTabNavigator}
        options={{ headerLeft: () => <BackButton />, title: "Challenge" }}
      />
      <ChallengesStack.Screen
        name="ChallengeActivityScreen"
        component={ChallengeActivityScreen}
        options={{ title: "Choose Activity" }}
      />
      <ChallengesStack.Screen
        name="ChallengeTypeScreen"
        component={ChallengeTypeScreen}
        options={{ title: "Choose Your Challenge" }}
      />
      <ChallengesStack.Screen
        name="ChallengeTimelineScreen"
        component={ChallengeTimelineScreen}
        options={{ title: "Choose Your Timeline" }}
      />
      <ChallengesStack.Screen
        name="ChallengeDateScreen"
        component={ChallengeDateScreen}
        options={{ title: "Choose Your Dates" }}
      />
      <ChallengesStack.Screen
        name="ChallengeDetailsScreen"
        component={ChallengeDetailsScreen}
        options={{ title: "Choose Your Dates" }}
      />
    </ChallengesStack.Navigator>
  );
}

function BackButton() {
  const { navigate } = useNavigation<ChallengeNavigationProp>();

  return <HeaderBackButton onPress={() => navigate("ChallengesScreen")} />;
}
