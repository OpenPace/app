import * as React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import TabBar from "../components/TabBar";

import { useAuthContext, logout } from "../contexts/AuthContext";
import { logOut } from "../services/AuthService";

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

  async function handleLogOut() {
    await logOut();
    dispatch(logout());
  }

  return (
    <Text>
      Hello, {auth.user && auth.user.firstName}!
      <TouchableOpacity onPress={handleLogOut}>
        <Text>Logout</Text>
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
