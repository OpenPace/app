import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Caption,
  Title,
  Text,
} from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import BaseStyles from "../utils/BaseStyles";
import { BottomTabParamList, LoggedOutParamList } from "../types";
import Challenge from "../api/models/Challenge";
import Screen from "../components/Screen";
import {
  getChallenge,
  joinChallenge,
  userHasJoinedChallenge,
} from "../services/ChallengeService";
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
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMesssage] = useState<string | undefined>(
    undefined,
  );
  const slug = route.params.slug;

  function navigateToChallenge() {
    loggedInNav.navigate("Challenges", {
      screen: "ChallengeShowScreen",
      params: { slug: slug },
    });
  }

  useEffect(() => {
    async function loadChallenge() {
      const options = { authToken: auth.token };
      const hasJoined = await userHasJoinedChallenge(slug, options);

      if (hasJoined) {
        navigateToChallenge();
      } else {
        const newChallenge = await getChallenge(slug, options);
        setChallenge(newChallenge);
      }
    }

    setChallenge(undefined);
    loadChallenge();
  }, [slug]);

  async function join() {
    if (!challenge) {
      return;
    }

    setLoading(true);

    try {
      await joinChallenge(slug, { authToken: auth.token });
      navigateToChallenge();
    } catch (error) {
      if (error.message === "User already joined") {
        navigateToChallenge();
      } else {
        setErrorMesssage(error.message);
      }
    }
    setLoading(false);
  }

  let actionButtons;

  if (auth.isLoggedIn) {
    actionButtons = (
      <Button
        loading={loading}
        mode="contained"
        onPress={() => join()}
        style={[BaseStyles.mb2]}
      >
        Join
      </Button>
    );
  } else {
    actionButtons = (
      <>
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
      </>
    );
  }

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

        {actionButtons}

        {errorMessage && <Text>{errorMessage}</Text>}
      </SafeAreaView>
    </Screen>
  );
}
