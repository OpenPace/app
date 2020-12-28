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
import StravaPromptScreen from "../screens/StravaPromptScreen";
import { ChallengesParamList } from "../types";
import ChallengeTabNavigator from "./ChallengeTabNavigator";

type ChallengeNavigationProp = StackNavigationProp<ChallengesParamList>;

const ChallengesStack = createStackNavigator<ChallengesParamList>();

export default function ChallengesStackNavigator() {
  return (
    <ChallengesStack.Navigator>
      <ChallengesStack.Screen
        component={StravaPromptScreen}
        name="StravaPrompt"
        options={{ headerLeft: () => <BackButton />, title: "Connect to Strava" }}
      />
      <ChallengesStack.Screen
        component={ChallengeIndexScreen}
        name="ChallengesScreen"
        options={{ title: "Challenges", headerShown: false }}
      />
      <ChallengesStack.Screen
        component={ChallengeTabNavigator}
        name="ChallengeShowScreen"
        options={{ headerLeft: () => <BackButton />, title: "Challenge" }}
      />
      <ChallengesStack.Screen
        component={ChallengeActivityScreen}
        name="ChallengeActivityScreen"
        options={{ title: "Choose Activity" }}
      />
      <ChallengesStack.Screen
        component={ChallengeTypeScreen}
        name="ChallengeTypeScreen"
        options={{ title: "Choose Your Challenge" }}
      />
      <ChallengesStack.Screen
        component={ChallengeTimelineScreen}
        name="ChallengeTimelineScreen"
        options={{ title: "Choose Your Timeline" }}
      />
      <ChallengesStack.Screen
        component={ChallengeDateScreen}
        name="ChallengeDateScreen"
        options={{ title: "Choose Your Dates" }}
      />
      <ChallengesStack.Screen
        component={ChallengeDetailsScreen}
        name="ChallengeDetailsScreen"
        options={{ title: "Choose Your Dates" }}
      />
    </ChallengesStack.Navigator>
  );
}

function BackButton() {
  const { navigate } = useNavigation<ChallengeNavigationProp>();

  return <HeaderBackButton onPress={() => navigate("ChallengesScreen")} />;
}
