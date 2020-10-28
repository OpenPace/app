import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Menu, Portal, Button, List, Text } from "react-native-paper";
import Screen from "../components/Screen";
import UserInfoDialog from "../components/profile/UserInfoDialog";
import TimezoneDialog from "../components/profile/TimezoneDialog";
import { useAuthContext, logout } from "../contexts/AuthContext";
import { useUserContext } from "../contexts/UserContext";
import { useUserPrefsContext } from "../contexts/UserPrefsContext";

import BaseStyles from "../utils/BaseStyles";
import { fullName, locationName, unitsLabel, timezoneLabel } from "../utils";

export default function ProfileScreen() {
  const { dispatch } = useAuthContext();
  const { user, saveUser } = useUserContext();
  const { userPrefs, savePrefs } = useUserPrefsContext();
  const [visible, setVisible] = useState(false);
  const [unitMenuVisible, setUnitMenuVisible] = useState(false);
  const [timezoneDialogVisible, setTimezoneDialogVisible] = useState(false);

  async function saveUnits(imperial: boolean) {
    try {
      await savePrefs({ imperial });
      setUnitMenuVisible(false);
    } catch (e) {
      setUnitMenuVisible(false);
    }
  }

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

          <Menu
            visible={unitMenuVisible}
            onDismiss={() => {
              setUnitMenuVisible(false);
            }}
            anchor={
              <List.Item
                title={unitsLabel(userPrefs.imperial)}
                description="Units & Measurements"
                onPress={() => setUnitMenuVisible(true)}
              />
            }
          >
            <Menu.Item
              onPress={() => {
                saveUnits(false);
              }}
              title="Meters & Kilometers"
            />
            <Menu.Item
              onPress={() => {
                saveUnits(true);
              }}
              title="Feet & Miles"
            />
          </Menu>

          <List.Item
            title={timezoneLabel(userPrefs.timezone)}
            description="Timezone"
            onPress={() => setTimezoneDialogVisible(true)}
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
        <TimezoneDialog
          userPrefs={userPrefs}
          savePrefs={savePrefs}
          visible={timezoneDialogVisible}
          close={() => setTimezoneDialogVisible(false)}
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
