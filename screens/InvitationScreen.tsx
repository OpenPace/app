import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Caption, Title } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import BaseStyles from "../utils/BaseStyles";
import { BottomTabParamList, LoggedOutParamList } from "../types";
import Challenge from "../api/models/Challenge";
import Screen from "../components/Screen";
import { getChallenge } from "../services/ChallengeService";
import { useAuthContext } from "../contexts/AuthContext";
import Podium from "../components/Podium";
import ChallengeMeta from "../components/ChallengeMeta";

type LoggedOutNavigationProp = StackNavigationProp<LoggedOutParamList>;
type LoggedInNavigationProp = StackNavigationProp<BottomTabParamList>;
type InviteRouteProp = RouteProp<LoggedOutParamList, "Invitation">;

export default function InvitationScreen() {
  const route = useRoute<InviteRouteProp>();
  const loggedOutNav = useNavigation<LoggedOutNavigationProp>();
  const loggedInNav = useNavigation<LoggedInNavigationProp>();
  const { auth } = useAuthContext();
  const [challenge, setChallenge] = useState<Challenge | undefined>(undefined);
  const slug = route.params.slug;

  function navigateToChallenge() {
    loggedInNav.navigate("Challenges", {
      screen: "ChallengeShowScreen",
      params: { slug: slug },
    });
  }

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigateToChallenge();
    } else {
      const options = { authToken: auth.token };
      setChallenge(undefined);
      getChallenge(slug, options).then(setChallenge);
    }
  }, [slug]);

  if (!challenge) {
    return (
      <Screen style={[BaseStyles.p4]}>
        <ActivityIndicator animating={true} />
      </Screen>
    );
  }

  return (
    <Screen>
      <SafeAreaView style={[BaseStyles.p4]}>
        <Title>Join the Challenge</Title>
        <Caption style={[BaseStyles.mb4]}>{challenge.name}</Caption>

        <Podium challenge={challenge} />

        <ChallengeMeta challenge={challenge} />

        <Button
          mode="contained"
          onPress={() => loggedOutNav.navigate("SignUp", { slug: slug })}
          style={[BaseStyles.mb2]}
        >
          Sign Up
        </Button>

        <Button
          mode="outlined"
          onPress={() => loggedOutNav.navigate("LogIn", { slug: slug })}
        >
          Sign In
        </Button>
      </SafeAreaView>
    </Screen>
  );
}
