import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import StravaPromptScreen from "../screens/StravaPromptScreen";
import InvitationScreen from "../screens/InvitationScreen";
import {
  BottomTabParamList,
  NotificationsParamList,
  ProfileParamList,
} from "../types";
import ChallengesStackNavigator from "./ChallengesStackNavigator";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Challenges" tabBar={() => null}>
      <BottomTab.Screen component={StravaPromptScreen} name="StravaPrompt" />
      <BottomTab.Screen
        component={ChallengesStackNavigator}
        name="Challenges"
      />
      <BottomTab.Screen
        component={NotificationsStackScreen}
        name="Notifications"
      />
      <BottomTab.Screen component={ProfileStackScreen} name="Profile" />
      <BottomTab.Screen component={InvitationScreen} name="Invitation" />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const NotificationsStack = createStackNavigator<NotificationsParamList>();

function NotificationsStackScreen() {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen
        component={NotificationsScreen}
        name="NotificationsScreen"
        options={{ title: "Notifications" }}
      />
    </NotificationsStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        component={ProfileScreen}
        name="ProfileScreen"
        options={{ headerLeft: () => <BackButton />, title: "Profile" }}
      />
      <ProfileStack.Screen
        component={SettingsScreen}
        name="SettingsScreen"
        options={{ title: "Settings" }}
      />
    </ProfileStack.Navigator>
  );
}

function BackButton() {
  const { navigate } = useNavigation();

  return <HeaderBackButton onPress={() => navigate("Challenges")} />;
}
