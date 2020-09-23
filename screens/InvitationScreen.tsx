import React from "react";
import Screen from "../components/Screen";
import { Button, Headline } from "react-native-paper";
import BaseStyles from "../utils/BaseStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { LoggedOutParamList } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";

type NavigationProp = StackNavigationProp<LoggedOutParamList>;
type InviteRouteProp = RouteProp<LoggedOutParamList, "Invitation">;

export default function WelcomeScreen() {
  const route = useRoute<InviteRouteProp>();
  console.log(route.params.id);
  const { navigate } = useNavigation<NavigationProp>();

  return (
    <Screen style={[BaseStyles.p4]}>
      <SafeAreaView>
        <Headline style={[BaseStyles.mb4]}>Invitation</Headline>

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
      </SafeAreaView>
    </Screen>
  );
}
