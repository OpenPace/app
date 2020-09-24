import React, { useEffect } from "react";
import { Button, Subheading } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import TabBar from "../components/TabBar";
import BaseStyles from "../utils/BaseStyles";
import { useAuthContext } from "../contexts/AuthContext";
import { isStravaConnected } from "../utils";
import { BottomTabParamList } from "../types";

type NavigationProp = StackNavigationProp<BottomTabParamList>;

export default function HomeScreen() {
  const { auth } = useAuthContext();
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
    <Screen style={[BaseStyles.p4]}>
      <Subheading>Distance Challenges</Subheading>
      <Button>Create a 5k Challenge</Button>

      <TabBar />
    </Screen>
  );
}
