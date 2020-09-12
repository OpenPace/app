import React, { useEffect } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ChallengeTabParamList, ChallengesParamList } from "../types";

import ChallengeShowScreen from "../screens/ChallengeShowScreen";
import { getChallenge } from "../services/ChallengeService";
import { useAuthContext } from "../contexts/AuthContext";
import { useChallengeContext } from "../contexts/ChallengeContext";

const Tab = createMaterialTopTabNavigator<ChallengeTabParamList>();

type ChallengeTabRouteProp = RouteProp<
  ChallengesParamList,
  "ChallengeShowScreen"
>;

export default function ChallengeTabNavigator() {
  const { auth } = useAuthContext();
  const { setChallenge } = useChallengeContext();
  const route = useRoute<ChallengeTabRouteProp>();

  useEffect(() => {
    async function loadChallenge() {
      try {
        const newChallenge = await getChallenge(route.params.id, {
          authToken: auth.token,
        });
        setChallenge(newChallenge);
      } catch (e) {}
    }

    setChallenge(undefined);
    loadChallenge();
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={ChallengeShowScreen} />
      <Tab.Screen name="Leaderboard" component={ChallengeShowScreen} />
      <Tab.Screen name="Chat" component={ChallengeShowScreen} />
    </Tab.Navigator>
  );
}
