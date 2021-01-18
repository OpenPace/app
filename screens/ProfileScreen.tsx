import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/Screen";
import DotCalendar from "../components/DotCalendar";
import UserAvatar from "../components/UserAvatar";
import { useUserContext } from "../contexts/UserContext";
import { FontAwesome } from "@expo/vector-icons";

import BaseStyles from "../utils/BaseStyles";

export default function ProfileScreen() {
  const { navigate } = useNavigation();
  const { user } = useUserContext();

  return (
    <Screen>
      <View style={[BaseStyles.row, BaseStyles.p4, BaseStyles.alignCenter]}>
        <View>
          <UserAvatar user={user} size={50} />
        </View>

        <View style={{ flexGrow: 1, marginLeft: 8 }}>
          <Text style={[styles.name]}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={[BaseStyles.textMuted]}>
            {user.city} {user.state}
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigate("SettingsScreen")}>
          <FontAwesome name="gear" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={[BaseStyles.p4]}>
        <DotCalendar />
      </View>
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
