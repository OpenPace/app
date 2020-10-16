import * as React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Button, Text, Title } from "react-native-paper";
import Screen from "../components/Screen";
import { useAuthContext, logout } from "../contexts/AuthContext";

import BaseStyles from "../utils/BaseStyles";

export default function ProfileScreen() {
  const { auth, dispatch } = useAuthContext();
  const navigation = useNavigation();
  const { user } = auth;

  if (!user) {
    return null;
  }

  return (
    <Screen style={[BaseStyles.p4]}>
      <View style={[BaseStyles.row, BaseStyles.pb4]}>
        <View>
          <Image
            source={{ uri: user.avatar }}
            style={[styles.profileImg, BaseStyles.rounded]}
          />
        </View>

        <View style={{ flexGrow: 1, marginLeft: 8 }}>
          <Text style={[styles.name]}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={[BaseStyles.textMuted]}>
            {user.city} {user.state}
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <FontAwesome name="gear" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        <Title>User Information</Title>

        <Text>Name</Text>
        <Text>
          {user.firstName} {user.lastName}
        </Text>

        <Text>Location</Text>
        <Text>
          {user.city} {user.state}
        </Text>

        <Title>Settings</Title>

        <Text>Units</Text>
        <Text>{user.imperial ? "Feet & Miles" : "Meters & Kilometers"}</Text>
      </View>

      <Button mode="contained" onPress={() => dispatch(logout())}>
        Log Out
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileImg: {
    height: 50,
    width: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
