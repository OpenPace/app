import React from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoggedOutParamList } from "../types";
import BaseStyles from "../utils/BaseStyles";
import Screen from "../components/Screen";
import { cloudinaryImg } from "../utils";

type NavigationProp = StackNavigationProp<LoggedOutParamList>;

const image = {
  uri: cloudinaryImg("welcome-bg.jpg"),
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
            <Image source={logo} style={styles.logo} />
          </View>

          <View>
            <Button
              mode="contained"
              onPress={() => navigate("SignUp")}
              style={[BaseStyles.mb3]}
            >
              Sign Up
            </Button>

            <Button
              mode="outline"
              onPress={() => navigate("LogIn")}
              style={[BaseStyles.mb4, styles.secondaryBtn]}
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
