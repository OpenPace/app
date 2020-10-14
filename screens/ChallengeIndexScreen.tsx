import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Headline, FAB, Subheading } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import Header from "../components/Header";
import PreviewCard from "../components/PreviewCard";
import CannedChallenges from "../components/CannedChallenges";
import BaseStyles from "../utils/BaseStyles";
import { useAuthContext } from "../contexts/AuthContext";
import { isStravaConnected } from "../utils";
import { BottomTabParamList } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import Challenge from "../api/models/Challenge";
import { getChallengesByUser } from "../services/ChallengeService";

type NavigationProp = StackNavigationProp<BottomTabParamList>;

export default function HomeScreen() {
  const { auth } = useAuthContext();
  const scheme = useColorScheme();
  const colors = Colors[scheme];
  const { navigate } = useNavigation<NavigationProp>();
  const { user } = auth;

  const [challenges, setChallenges] = useState<Challenge[]>([]);

  // Redirect to strava prompt
  useEffect(() => {
    if (user && !isStravaConnected(user)) {
      navigate("StravaPrompt");
    }
  }, [user]);

  useEffect(() => {
    async function loadChallenge() {
      const allChallenges = await getChallengesByUser({
        authToken: auth.token,
      });
      setChallenges(allChallenges);
    }

    loadChallenge();
  }, []);

  if (!user) {
    return null;
  }

  const cards = challenges.map((challenge) => (
    <PreviewCard key={challenge.slug} challenge={challenge} />
  ));

  // Steps:
  // Activity type: bike, run, swim
  // Challenge type: total distance, total time, altitude, fastest segment
  // Segment select: if segment, show a list of segments
  // Timeline: how long do you want the challenge to last?
  // When to start? This week, next week, tomorrow, today?

  return (
    <Screen>
      <Header
        user={user}
        headline="Challenges"
        subheading="Create a challenge to get started"
      />

      <ScrollView style={[BaseStyles.pbTabBar]}>
        <View style={[BaseStyles.p4]}>
          <SectionHeader text="Create a Challenge" />
          <CannedChallenges />
        </View>

        <View style={[BaseStyles.p4]}>
          <SectionHeader text="Current Challenges" />

          {cards}
        </View>
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() =>
          navigate("Challenges", { screen: "ChallengeActivityScreen" })
        }
      />
    </Screen>
  );
}

function SectionHeader({ text }: { text: string }) {
  return (
    <Subheading
      style={[BaseStyles.textBold, BaseStyles.textMuted, styles.subheading]}
    >
      {text}
    </Subheading>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  subheading: {
    textTransform: "uppercase",
  },
});
