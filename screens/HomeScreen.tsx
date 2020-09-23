import React from "react";
import { Button, Subheading } from "react-native-paper";
import { View } from "react-native";

import Screen from "../components/Screen";
import TabBar from "../components/TabBar";
import StravaButton from "../components/StravaButton";
import BaseStyles from "../utils/BaseStyles";
import { useAuthContext } from "../contexts/AuthContext";
import { isStravaConnected } from "../utils";

export default function HomeScreen() {
  const { auth } = useAuthContext();
  const { user } = auth;

  if (!user) {
    return null;
  }

  return (
    <Screen style={[BaseStyles.p4]}>
      {!isStravaConnected(user) && <StravaButton />}

      <Subheading>Distance Challenges</Subheading>
      <Button>Create a 5k Challenge</Button>

      <TabBar />
    </Screen>
  );
}
