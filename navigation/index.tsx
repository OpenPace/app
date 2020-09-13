import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LoggedOutNavigator from "./LoggedOutNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import useColorScheme from "../hooks/useColorScheme";
import DefaultTheme from "./DefaultTheme";
import DarkTheme from "./DarkTheme";

import { useAuthContext } from "../contexts/AuthContext";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  const { auth } = useAuthContext();
  const scheme = useColorScheme();

  // Wait until authentication is finished loading
  if (auth.loading) {
    return null;
  }

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={scheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { auth } = useAuthContext();

  if (!auth.isLoggedIn) {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Root" component={LoggedOutNavigator} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
