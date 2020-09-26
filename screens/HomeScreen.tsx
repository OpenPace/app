import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Headline, Subheading } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import TabBar from "../components/TabBar";
import Header from "../components/Header";
import PreviewCard from "../components/PreviewCard";
import BaseStyles from "../utils/BaseStyles";
import { useAuthContext } from "../contexts/AuthContext";
import { isStravaConnected } from "../utils";
import { BottomTabParamList } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

type NavigationProp = StackNavigationProp<BottomTabParamList>;

export default function HomeScreen() {
  const { auth } = useAuthContext();
  const scheme = useColorScheme();
  const colors = Colors[scheme];
  const navigation = useNavigation<NavigationProp>();
  const { user } = auth;

  // Redirect to strava prompt
  useEffect(() => {
    if (user && !isStravaConnected(user)) {
      navigation.navigate("StravaPrompt");
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <Screen>
      <Header
        user={user}
        headline="Challenges"
        subheading="Create a challenge to get started"
      />

      <View style={[BaseStyles.p4]}>
        <Subheading
          style={[BaseStyles.textBold, BaseStyles.textMuted, styles.subheading]}
        >
          Current Challenges
        </Subheading>

        <ScrollView horizontal style={[BaseStyles.py2]}>
          <PreviewCard />
          <PreviewCard />
          <PreviewCard />
        </ScrollView>
      </View>

      <View style={[BaseStyles.p4]}>
        <Subheading
          style={[BaseStyles.textBold, BaseStyles.textMuted, styles.subheading]}
        >
          Upcoming Challenges
        </Subheading>
        <Button>Create a 5k Challenge</Button>
      </View>

      <View style={[BaseStyles.p4]}>
        <Subheading
          style={[BaseStyles.textBold, BaseStyles.textMuted, styles.subheading]}
        >
          By Distance
        </Subheading>
        <Button>Create a 5k Challenge</Button>
      </View>

      <TabBar />
    </Screen>
  );
}

const styles = StyleSheet.create({
  subheading: {
    textTransform: "uppercase",
  },
});
