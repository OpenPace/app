import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Button, Menu, Text, TextInput, Title } from "react-native-paper";
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
        style={[BaseStyles.mb2]}
        label="First Name"
        value={firstName}
        onChangeText={setFirstName}
        mode="outlined"
      />
      <TextInput
        style={[BaseStyles.mb2]}
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
        mode="outlined"
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button onPress={openMenu}>
            {imperial ? "Feet & Miles" : "Meters & Kilometers"}
          </Button>
        }
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
