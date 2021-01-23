import * as React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import BaseStyles from "../utils/BaseStyles";
import Card from "../components/Card";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

function getTabs() {
  return [
    { route: "Home", icon: "home" },
    { route: "Challenges", icon: "terrain" },
    { route: "Notifications", icon: "notifications" },
    { route: "Profile", icon: "person" },
  ];
}

export default function TabBar() {
  const theme = useColorScheme();
  const color = Colors[theme].text;
  const primaryColor = Colors[theme].primary;

  const { navigate } = useNavigation();
  const route = useRoute();

  const tabs = getTabs().map((tab) => {
    const linkColor = route.name.includes(tab.route) ? primaryColor : color;

    return (
      <View key={tab.route} style={[BaseStyles.col]}>
        <TouchableOpacity onPress={() => navigate(tab.route)}>
          <MaterialIcons
            color={linkColor}
            name={tab.icon}
            size={24}
            style={[BaseStyles.textCenter]}
          />
        </TouchableOpacity>
      </View>
    );
  });

  return <Card style={[BaseStyles.row, styles.container]}>{tabs}</Card>;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 24,
    left: 24,
    bottom: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
});
