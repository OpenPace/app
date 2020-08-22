import * as React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import TabBar from "../components/TabBar";

import { useAuthContext, loginSuccess, logout } from "../contexts/AuthContext";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Greeting />

      <TabBar />
    </View>
  );
}

function Greeting() {
  const { auth, dispatch } = useAuthContext();
  if (auth.isLoggedIn)
    return (
      <Text>
        Hello, {auth.token}!
        <TouchableOpacity onPress={() => dispatch(logout())}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </Text>
    );
  return (
    <Text>
      You are not logged in
      <TouchableOpacity onPress={() => dispatch(loginSuccess("Evan"))}>
        <Text>Log In</Text>
      </TouchableOpacity>
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
