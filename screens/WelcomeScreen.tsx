import React from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import Screen from "../components/Screen";
import { Button, Headline } from "react-native-paper";
import BaseStyles from "../utils/BaseStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { LoggedOutParamList } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { cloudinaryImg } from "../utils";

type NavigationProp = StackNavigationProp<LoggedOutParamList>;

const image = {
  uri: cloudinaryImg("welcome.jpg"),
};

const logo = {
  uri: cloudinaryImg("welcome-logo.png"),
};

export default function WelcomeScreen() {
  const { navigate } = useNavigation<NavigationProp>();

  return (
    <Screen style={styles.screen}>
      <ImageBackground source={image} style={styles.image}>
        <SafeAreaView style={[BaseStyles.p4, styles.container]}>
          <View style={[BaseStyles.p4, styles.logoContainer]}>
            <Image style={styles.logo} source={logo} />
          </View>

          <View>
            <Button
              style={[BaseStyles.mb3]}
              mode="contained"
              onPress={() => navigate("SignUp")}
            >
              Sign Up
            </Button>

            <Button
              style={[BaseStyles.mb4, styles.secondaryBtn]}
              mode="outline"
              onPress={() => navigate("LogIn")}
            >
              Sign In
            </Button>
          </View>
        </SafeAreaView>
      </ImageBackground>
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
    flexDirection: "row",
    justifyContent: "center",
  },
  logo: {
    width: 225,
    height: 60,
  },
});
