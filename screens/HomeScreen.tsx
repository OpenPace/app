import React from "react";
import Screen from "../components/Screen";
import TabBar from "../components/TabBar";
import StravaButton from "../components/StravaButton";
import BaseStyles from "../utils/BaseStyles";

export default function HomeScreen() {
  return (
    <Screen style={[BaseStyles.p4]}>
      <StravaButton />

      <TabBar />
    </Screen>
  );
}
