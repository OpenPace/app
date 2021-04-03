import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Text, Menu, Portal, Button, List } from "react-native-paper";
import * as Updates from "expo-updates";

import Screen from "../components/Screen";
import UserInfoDialog from "../components/profile/UserInfoDialog";
import TimezoneDialog from "../components/profile/TimezoneDialog";
import { useAuthContext } from "../contexts/AuthContext";
import { useUserContext } from "../contexts/UserContext";
import { useUserPrefsContext } from "../contexts/UserPrefsContext";
import { useThemeContext } from "../contexts/ThemeContext";
import { registerForPushNotifications, savePushToken } from "../services/NotificationService";

import BaseStyles from "../utils/BaseStyles";
import { fullName, locationName, unitsLabel, timezoneLabel } from "../utils";

export default function ProfileScreen() {
  const { auth, logOut } = useAuthContext();
  const { user, saveUser } = useUserContext();
  const { userPrefs, savePrefs } = useUserPrefsContext();
  const { scheme, toggleScheme } = useThemeContext();
  const [visible, setVisible] = useState(false);
  const [token, setToken] = useState<string>("No Token");
  const [updateMsg, setUpdateMsg] = useState<string>("Check for Updates");
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

  async function checkUpdate() {
    try {
      setUpdateMsg("Checking for Updates...");

      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        setUpdateMsg("Updating...");
        // ... notify user of update ...
        await Updates.reloadAsync();
        setUpdateMsg("Up to Date");
      } else {
        setUpdateMsg("No Update Found");
      }
    } catch (e) {
      // handle or log error
    }
  }

  async function notificationCheck() {
    try {
      const token = await registerForPushNotifications({authToken: auth.token});
      setToken(token);
    } catch (e) {
      setToken(e.message);
    }
  }

  return (
    <Screen>
      <ScrollView>
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

          <List.Item
            title={updateMsg}
            description="App Updates"
            onPress={() => checkUpdate()}
          />

          <List.Item
            title={token}
            description="Debug Notifications"
            onPress={() => notificationCheck()}
          />
        </List.Section>

        <View style={[BaseStyles.p4]}>
          <Text>{token}</Text>
        </View>

        <View style={[BaseStyles.p4]}>
          <Button mode="contained" onPress={() => logOut()}>
            Log Out
          </Button>
        </View>
      </ScrollView>

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
