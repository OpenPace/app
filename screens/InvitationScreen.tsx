import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Headline } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import BaseStyles from "../utils/BaseStyles";
import { LoggedOutParamList } from "../types";
import Challenge from "../api/models/Challenge";
import Screen from "../components/Screen";
import { getChallenge, joinChallenge } from "../services/ChallengeService";
import { useAuthContext } from "../contexts/AuthContext";

type NavigationProp = StackNavigationProp<LoggedOutParamList>;
type InviteRouteProp = RouteProp<LoggedOutParamList, "Invitation">;

export default function InvitationScreen() {
  const route = useRoute<InviteRouteProp>();
  const { navigate } = useNavigation<NavigationProp>();
  const { auth } = useAuthContext();
  const [challenge, setChallenge] = useState<Challenge | undefined>(undefined);
  const slug = route.params.slug

  useEffect(() => {
    async function loadChallenge() {
      const newChallenge = await getChallenge(slug, {
        authToken: auth.token,
      });
      setChallenge(newChallenge);
    }

    setChallenge(undefined);
    loadChallenge();
  }, [route.params.slug]);

  async function join() {
    if (!challenge) {
      return;
    }

    await joinChallenge(slug, { authToken: auth.token });
    navigate("ChallengeShowScreen", { slug: challenge.slug });
  }

  let actionButtons;

  if (auth.isLoggedIn) {
    actionButtons = (
      <Button style={[BaseStyles.mb2]} mode="contained" onPress={() => join()}>
        Join
      </Button>
    );
  } else {
    actionButtons = (
      <>
        <Button
          style={[BaseStyles.mb2]}
          mode="contained"
          onPress={() => navigate("SignUp")}
        >
          Sign Up
        </Button>

        <Button mode="outlined" onPress={() => navigate("LogIn")}>
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
    <Screen style={[BaseStyles.p4]}>
      <SafeAreaView>
        <Headline style={[BaseStyles.mb4]}>
          {challenge.slug} Invitation
        </Headline>

        {actionButtons}
      </SafeAreaView>
    </Screen>
  );
}
