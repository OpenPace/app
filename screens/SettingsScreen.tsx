import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Menu, TextInput } from "react-native-paper";
import Screen from "../components/Screen";
import { useAuthContext } from "../contexts/AuthContext";
import BaseStyles from "../utils/BaseStyles";

export default function SettingsScreen() {
  const { auth } = useAuthContext();
  const { navigate } = useNavigation();
  const { user } = auth;

  if (!user) {
    return null;
  }

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [imperial, setImperial] = useState(user.imperial);
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  function save() {
    navigate("ProfileScreen");
  }

  function cancel() {
    navigate("ProfileScreen");
  }

  return (
    <Screen style={[BaseStyles.p4]}>
      <TextInput
        label="First Name"
        mode="outlined"
        onChangeText={setFirstName}
        style={[BaseStyles.mb2]}
        value={firstName}
      />
      <TextInput
        label="Last Name"
        mode="outlined"
        onChangeText={setLastName}
        style={[BaseStyles.mb2]}
        value={lastName}
      />
      <Menu
        anchor={
          <Button onPress={openMenu}>
            {imperial ? "Feet & Miles" : "Meters & Kilometers"}
          </Button>
        }
        onDismiss={closeMenu}
        visible={visible}
      >
        <Menu.Item
          onPress={() => {
            setImperial(true);
            closeMenu();
          }}
          title="Feet & Miles"
        />
        <Menu.Item
          onPress={() => {
            setImperial(false);
            closeMenu();
          }}
          title="Meters & Kilometers"
        />
      </Menu>

      <View style={[BaseStyles.row]}>
        <View style={[BaseStyles.col]}>
          <Button onPress={cancel}>Cancel</Button>
        </View>

        <View style={[BaseStyles.col]}>
          <Button onPress={save}>Save</Button>
        </View>
      </View>
    </Screen>
  );
}
