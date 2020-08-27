import * as React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import Card from "../components/Card";
import TabBar from "../components/TabBar";
import { Text } from "../components/Themed";
import { useAuthContext } from "../contexts/AuthContext";

import BaseStyles from "../utils/BaseStyles";

export default function ProfileScreen() {
  const { auth } = useAuthContext();
  const navigation = useNavigation();

  if (!auth.user) {
    return null;
  }

  return (
    <Screen style={[BaseStyles.p4]}>
      <View style={[BaseStyles.row, BaseStyles.pb4]}>
        <View>
          <Image
            source={{ uri: "http://www.fillmurray.com/200/200" }}
            style={[styles.profileImg, BaseStyles.rounded]}
          />
        </View>

        <View style={{ flexGrow: 1, marginLeft: 8 }}>
          <Text style={[styles.name]}>
            {auth.user.firstName} {auth.user.lastName}
          </Text>
          <Text style={[BaseStyles.textMuted]}>Traverse City, MI</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <FontAwesome name="gear" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Card style={[BaseStyles.row, BaseStyles.p3]}>
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
