import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Portal,
  Dialog,
  TextInput,
  Button,
  List,
  Text,
} from "react-native-paper";
import Screen from "../components/Screen";
import { useAuthContext, logout } from "../contexts/AuthContext";
import { useUserContext } from "../contexts/UserContext";

import BaseStyles from "../utils/BaseStyles";
import { fullName, locationName, unitsLabel, timezoneLabel } from "../utils";
import User, { UserParams } from "../api/models/User";

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
        <NameDialog
          user={user}
          saveUser={saveUser}
          visible={visible}
          close={() => setVisible(false)}
        />
      </Portal>
    </Screen>
  );
}

interface NameProps {
  user: User;
  visible: boolean;
  saveUser: (params: UserParams) => Promise<void>;
  close: () => void;
}

function NameDialog(props: NameProps) {
  const { user } = props;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [city, setCity] = useState(user.city);
  const [state, setState] = useState(user.state);
  const [loading, setLoading] = useState(false);

  function close() {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    props.close();
  }

  async function save() {
    setLoading(true);
    try {
      await props.saveUser({
        email,
        firstName,
        lastName,
        city,
        state,
      });
      setLoading(false);
      props.close();
    } catch (e) {
      setLoading(false);
      props.close();
    }
  }

  return (
    <Dialog visible={props.visible} onDismiss={close}>
      <Dialog.Title>Edit User Information</Dialog.Title>

      <Dialog.Content>
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
        <TextInput
          style={[BaseStyles.mb2]}
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
        />
        <TextInput
          style={[BaseStyles.mb2]}
          label="City"
          value={city}
          onChangeText={setCity}
          mode="outlined"
        />
        <TextInput
          style={[BaseStyles.mb2]}
          label="state"
          value={state}
          onChangeText={setState}
          mode="outlined"
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button mode="outlined" onPress={close}>
          Cancel
        </Button>
        <Button mode="contained" onPress={save} loading={loading}>
          Save
        </Button>
      </Dialog.Actions>
    </Dialog>
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
