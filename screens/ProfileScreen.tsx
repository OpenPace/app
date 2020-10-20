import * as React from "react";
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

import BaseStyles from "../utils/BaseStyles";
import { fullName, locationName, unitsLabel, timezoneLabel } from "../utils";
import User from "../api/models/User";

export default function ProfileScreen() {
  const { auth, dispatch } = useAuthContext();
  const navigation = useNavigation();
  const { user } = auth;
  const [visible, setVisible] = React.useState(false);

  if (!user) {
    return null;
  }

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
          <List.Item title={user.email} description="Email" />
          <List.Item title={locationName(user)} description="Location" />

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
          visible={visible}
          close={() => setVisible(false)}
          save={() => setVisible(false)}
        />
      </Portal>
    </Screen>
  );
}

interface NameProps {
  user: User;
  visible: boolean;
  save: () => void;
  close: () => void;
}

function NameDialog(props: NameProps) {
  return (
    <Dialog visible={props.visible} onDismiss={props.close}>
      <Dialog.Title>Edit Name</Dialog.Title>
      <Dialog.Content>
        <TextInput
          style={[BaseStyles.mb2]}
          label="First Name"
          mode="outlined"
        />
        <TextInput style={[BaseStyles.mb2]} label="Last Name" mode="outlined" />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={props.save}>Done</Button>
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
