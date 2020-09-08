import * as React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import Screen from "../components/Screen";
import Card from "../components/Card";
import TabBar from "../components/TabBar";
import { Text } from "../components/Themed";
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

      <Card style={[BaseStyles.row, BaseStyles.p3, BaseStyles.mb4]}>
        <View style={[BaseStyles.col]}>
          <TouchableOpacity onPress={() => alert("Hello, world!")}>
            <Text style={[BaseStyles.text, BaseStyles.textCenter]}>Run</Text>
          </TouchableOpacity>
        </View>
        <View style={[BaseStyles.col]}>
          <TouchableOpacity onPress={() => alert("Hello, world!")}>
            <Text style={[BaseStyles.text, BaseStyles.textCenter]}>Ride</Text>
          </TouchableOpacity>
        </View>
        <View style={[BaseStyles.col]}>
          <TouchableOpacity onPress={() => alert("Hello, world!")}>
            <Text style={[BaseStyles.text, BaseStyles.textCenter]}>Swim</Text>
          </TouchableOpacity>
        </View>
        <View style={[BaseStyles.col]}>
          <TouchableOpacity onPress={() => alert("Hello, world!")}>
            <Text style={[BaseStyles.text, BaseStyles.textCenter]}>Other</Text>
          </TouchableOpacity>
        </View>
      </Card>

      <Button mode="contained" onPress={() => dispatch(logout())}>
        Log Out
      </Button>

      <TabBar />
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
