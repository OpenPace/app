import * as React from "react";
import { Banner } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image } from "react-native";
import { cloudinaryImg } from "../utils";
import BaseStyles from "../utils/BaseStyles";
import { ChallengesParamList } from "../types";

type NavigationProp = StackNavigationProp<ChallengesParamList>;

const logo = {
  uri: cloudinaryImg("strava-app-logo.png"),
};

export default function StravaBanner() {
  const { navigate } = useNavigation<NavigationProp>();

  return (
    <Banner
      visible
      actions={[
        {
          label: "Connect",
          onPress: () => navigate("StravaPrompt"),
        },
      ]}
      icon={({ size }) => (
        <Image
          source={logo}
          style={{
            width: size,
            height: size,
          }}
        />
      )}
      style={[BaseStyles.mb4, BaseStyles.rounded]}
    >
      In order to compete in challenges, we need to connect to your Strava
      account.
    </Banner>
  );
}
