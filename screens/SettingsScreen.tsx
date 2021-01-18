import React, { useState } from "react";
import { View } from "react-native";
import { Menu, Portal, Button, List } from "react-native-paper";

import Screen from "../components/Screen";
import UserInfoDialog from "../components/profile/UserInfoDialog";
import TimezoneDialog from "../components/profile/TimezoneDialog";
import { useAuthContext } from "../contexts/AuthContext";
import { useUserContext } from "../contexts/UserContext";
import { useUserPrefsContext } from "../contexts/UserPrefsContext";
import { useThemeContext } from "../contexts/ThemeContext";

import BaseStyles from "../utils/BaseStyles";
import { fullName, locationName, unitsLabel, timezoneLabel } from "../utils";

export default function ProfileScreen() {
  const { logOut } = useAuthContext();
  const { user, saveUser } = useUserContext();
  const { userPrefs, savePrefs } = useUserPrefsContext();
  const { scheme, toggleScheme } = useThemeContext();
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
      <View>
        <List.Section>
          <List.Subheader>User Information</List.Subheader>
          <List.Item
            description="Name"
            onPress={() => setVisible(true)}
            title={fullName(user)}
          />
          <List.Item
            description="Email"
            onPress={() => setVisible(true)}
            title={user.email}
          />
          <List.Item
            description="Location"
            onPress={() => setVisible(true)}
            title={locationName(user) || "Not Set"}
          />

          <List.Subheader>Preferences</List.Subheader>

          <Menu
            anchor={
              <List.Item
                description="Units & Measurements"
                onPress={() => setUnitMenuVisible(true)}
                title={unitsLabel(userPrefs.imperial)}
              />
            }
            onDismiss={() => {
              setUnitMenuVisible(false);
            }}
            visible={unitMenuVisible}
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
            description="Timezone"
            onPress={() => setTimezoneDialogVisible(true)}
            title={timezoneLabel(userPrefs.timezone)}
          />

          <List.Item
            title="App Theme"
            onPress={() => toggleScheme()}
            description={scheme}
          />
        </List.Section>
      </View>

      <View style={[BaseStyles.p4]}>
        <Button mode="contained" onPress={() => logOut()}>
          Log Out
        </Button>
      </View>

      <Portal>
        <UserInfoDialog
          close={() => setVisible(false)}
          saveUser={saveUser}
          user={user}
          visible={visible}
        />
        <TimezoneDialog
          close={() => setTimezoneDialogVisible(false)}
          savePrefs={savePrefs}
          userPrefs={userPrefs}
          visible={timezoneDialogVisible}
        />
      </Portal>
    </Screen>
  );
}
