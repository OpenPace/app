import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Portal, Button, List, Text } from "react-native-paper";
import Screen from "../components/Screen";
import UserInfoDialog from "../components/profile/UserInfoDialog";
import { useAuthContext, logout } from "../contexts/AuthContext";
import { useUserContext } from "../contexts/UserContext";

import BaseStyles from "../utils/BaseStyles";
import { fullName, locationName, unitsLabel, timezoneLabel } from "../utils";

export default function ProfileScreen() {
  const { dispatch } = useAuthContext();
  const navigation = useNavigation();
  const { user, saveUser } = useUserContext();
  const [visible, setVisible] = useState(false);

  const prefs = user.userPrefs;

  return (
    <Screen>
      <View style={[BaseStyles.row, BaseStyles.p4]}>
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
        <List.Section>
          <List.Subheader>User Information</List.Subheader>
          <List.Item
            title={fullName(user)}
            description="Name"
            onPress={() => setVisible(true)}
          />
          <List.Item
            title={user.email}
            description="Email"
            onPress={() => setVisible(true)}
          />
          <List.Item
            title={locationName(user)}
            description="Location"
            onPress={() => setVisible(true)}
          />

          <List.Subheader>Preferences</List.Subheader>
          <List.Item
            title={unitsLabel(prefs.imperial)}
            description="Units & Measurements"
          />

          <List.Item
            title={timezoneLabel(prefs.timezone)}
            description="Timezone"
          />
        </List.Section>
      </View>

      <View style={[BaseStyles.p4]}>
        <Button mode="contained" onPress={() => dispatch(logout())}>
          Log Out
        </Button>
      </View>

      <Portal>
        <UserInfoDialog
          user={user}
          saveUser={saveUser}
          visible={visible}
          close={() => setVisible(false)}
        />
      </Portal>
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
