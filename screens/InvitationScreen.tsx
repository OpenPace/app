import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import {
  ActivityIndicator,
  Avatar,
  Button,
  ProgressBar,
  Caption,
  Title,
  Text,
} from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import BaseStyles from "../utils/BaseStyles";
import { BottomTabParamList, LoggedOutParamList } from "../types";
import Challenge from "../api/models/Challenge";
import Screen from "../components/Screen";
import { getChallenge, joinChallenge } from "../services/ChallengeService";
import { useAuthContext } from "../contexts/AuthContext";
import Podium from "../components/Podium";
import { capitalize } from "../utils";
import { inFuture, inPast, timeAgo, timeLeft } from "../utils/DateTime";

type LoggedOutNavigationProp = StackNavigationProp<LoggedOutParamList>;
type LoggedInNavigationProp = StackNavigationProp<BottomTabParamList>;
type InviteRouteProp = RouteProp<LoggedOutParamList, "Invitation">;

const challengeTypeIcons = {
  distance: "map-marker-distance",
  time: "timer",
  altitude: "terrain",
  segment: "",
};

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

  useEffect(() => {
    async function loadChallenge() {
      const newChallenge = await getChallenge(slug, {
        authToken: auth.token,
      });
      setChallenge(newChallenge);
    }

    setChallenge(undefined);
    loadChallenge();
  }, [slug]);

  function navigateToChallenge() {
    loggedInNav.navigate("Challenges", {
      screen: "ChallengeShowScreen",
      params: { slug: slug },
    });
  }

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

        <View style={[BaseStyles.row, BaseStyles.mb4, styles.info]}>
          <Avatar.Icon
            icon={challenge.activityType}
            size={24}
            style={[BaseStyles.mr1]}
          />
          <Avatar.Icon
            icon={challengeTypeIcons[challenge.challengeType]}
            size={24}
            style={[BaseStyles.mr2]}
          />

          <Caption>
            {capitalize(challenge.activityType)} &middot;{" "}
            {capitalize(challenge.challengeType)}
          </Caption>
        </View>

        <TimeLeft challenge={challenge} />

        {actionButtons}

        {errorMessage && <Text>{errorMessage}</Text>}
      </SafeAreaView>
    </Screen>
  );
}

interface Props {
  challenge: Challenge;
}

function TimeLeft({ challenge }: Props) {
  let caption = `Ends ${timeLeft(challenge.endAt)}`;
  const totalTime = challenge.endAt.diff(challenge.startAt).as("seconds");
  const timeElapsed = DateTime.local().diff(challenge.startAt).as("seconds");
  let progress = timeElapsed / totalTime;

  // Not started (startAt in the future)
  if (inFuture(challenge.startAt)) {
    progress = 0;
    caption = `Starts ${timeLeft(challenge.startAt)}`;
  }

  // Ended (show when)
  if (inPast(challenge.endAt)) {
    progress = 1;
    caption = `Ended ${timeAgo(challenge.startAt)}`;
  }

  return (
    <View style={[BaseStyles.mb4]}>
      <ProgressBar progress={progress} />
      <Caption>{caption}</Caption>
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    alignItems: "center",
  },
});
