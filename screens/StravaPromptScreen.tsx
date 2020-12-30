import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Paragraph, Headline } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import BaseStyles from "../utils/BaseStyles";
import { cloudinaryImg } from "../utils";
import { useAuthContext } from "../contexts/AuthContext";
import { isStravaConnected } from "../utils";
import { ChallengesParamList } from "../types";
import StravaButton from "../components/StravaButton";
import Screen from "../components/Screen";
import { markHasSeen } from "../services/HasSeenService";

type NavigationProp = StackNavigationProp<ChallengesParamList>;

const logo = {
  uri: cloudinaryImg("strava-app-logo.png"),
};

export default function StravaPrompt() {
  const { auth } = useAuthContext();
  const navigation = useNavigation<NavigationProp>();
  const { user } = auth;

  // Redirect to home
  useEffect(() => {
    if (user && isStravaConnected(user)) {
      return navigation.navigate("ChallengesScreen");
    }

    markHasSeen("StravaPrompt");
  }, [user]);

  function onSuccess() {
    navigation.navigate("ChallengesScreen");
  }

  return (
    <Screen style={styles.screen}>
      <SafeAreaView style={[BaseStyles.p4, styles.container]}>
        <View style={[BaseStyles.p4, styles.logoContainer]}>
          <View style={[BaseStyles.alignCenter]}>
            <Image source={logo} style={[BaseStyles.mb4, styles.logo]} />
            <Headline>Connect your Strava</Headline>
            <Paragraph style={[BaseStyles.textCenter]}>
              In order to compete in challenges, we need to connect to your
              Strava account.
            </Paragraph>
          </View>
        </View>

        <View style={BaseStyles.mb4}>
          <StravaButton onSuccess={onSuccess} />
        </View>
      </SafeAreaView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  secondaryBtn: {
    backgroundColor: "white",
    color: "black",
  },
  logoContainer: {
    flex: 1,
    flexDirection: "column",
  },
  logo: {
    width: 150,
    height: 150,
  },
});
