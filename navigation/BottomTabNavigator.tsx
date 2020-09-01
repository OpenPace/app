import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import HomeScreen from "../screens/HomeScreen";
import NewChallengeScreen from "../screens/NewChallengeScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import {
  BottomTabParamList,
  HomeParamList,
  NotificationsParamList,
  ProfileParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Home" tabBar={() => null}>
      <BottomTab.Screen name="Home" component={HomeStackScreen} />
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
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen
        name="NewChallengeScreen"
        component={NewChallengeScreen}
      />
    </HomeStack.Navigator>
  );
}

const NotificationsStack = createStackNavigator<NotificationsParamList>();

function NotificationsStackScreen() {
  return (
    <NotificationsStack.Navigator headerMode="none">
      <NotificationsStack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
    </NotificationsStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </ProfileStack.Navigator>
  );
}
