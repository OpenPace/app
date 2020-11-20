import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LoggedOutNavigator from "./LoggedOutNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { useThemeContext } from "../contexts/ThemeContext";
import DefaultTheme from "./DefaultTheme";
import DarkTheme from "./DarkTheme";

import { useAuthContext } from "../contexts/AuthContext";
import { ChallengeProvider } from "../contexts/ChallengeContext";
import { NewChallengeProvider } from "../contexts/NewChallengeContext";
import { UserProvider } from "../contexts/UserContext";
import { UserPrefsProvider } from "../contexts/UserPrefsContext";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  const { auth } = useAuthContext();
  const { scheme } = useThemeContext();

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
  const { user, token } = auth;

  if (!user || !token) {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen component={LoggedOutNavigator} name="Root" />
      </Stack.Navigator>
    );
  }

  return (
    <UserProvider authToken={token} user={user}>
      <UserPrefsProvider authToken={token} userPrefs={user.userPrefs}>
        <ChallengeProvider authToken={token}>
          <NewChallengeProvider>
            <Stack.Navigator headerMode="none">
              <Stack.Screen component={BottomTabNavigator} name="Root" />
              <Stack.Screen
                component={NotFoundScreen}
                name="NotFound"
                options={{ title: "Oops!" }}
              />
            </Stack.Navigator>
          </NewChallengeProvider>
        </ChallengeProvider>
      </UserPrefsProvider>
    </UserProvider>
  );
}
