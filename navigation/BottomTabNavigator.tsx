import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import HomeScreen from "../screens/HomeScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import StravaPromptScreen from "../screens/StravaPromptScreen";
import {
  BottomTabParamList,
  HomeParamList,
  NotificationsParamList,
  ProfileParamList,
} from "../types";
import ChallengesStackNavigator from "./ChallengesStackNavigator";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Home" tabBar={() => null}>
      <BottomTab.Screen name="StravaPrompt" component={StravaPromptScreen} />
      <BottomTab.Screen name="Home" component={HomeStackScreen} />
      <BottomTab.Screen
        name="Challenges"
        component={ChallengesStackNavigator}
      />
      <BottomTab.Screen
        name="Notifications"
        component={NotificationsStackScreen}
      />
      <BottomTab.Screen name="Profile" component={ProfileStackScreen} />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
    </HomeStack.Navigator>
  );
}

const NotificationsStack = createStackNavigator<NotificationsParamList>();

function NotificationsStackScreen() {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
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
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
      <ProfileStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </ProfileStack.Navigator>
  );
}
