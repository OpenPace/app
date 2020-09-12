import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import HomeScreen from "../screens/HomeScreen";
import ChallengeIndexScreen from "../screens/ChallengeIndexScreen";
import ChallengeShowScreen from "../screens/ChallengeShowScreen";
import ChallengeActivityScreen from "../screens/ChallengeActivityScreen";
import ChallengeTypeScreen from "../screens/ChallengeTypeScreen";
import ChallengeTimelineScreen from "../screens/ChallengeTimelineScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import {
  BottomTabParamList,
  ChallengesParamList,
  HomeParamList,
  NotificationsParamList,
  ProfileParamList,
} from "../types";
import ChallengeTabNavigator from "./ChallengeTabNavigator";

import { ChallengeProvider } from "../contexts/ChallengeContext";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Home" tabBar={() => null}>
      <BottomTab.Screen name="Home" component={HomeStackScreen} />
      <BottomTab.Screen name="Challenges" component={ChallengesStackScreen} />
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
    <ChallengeProvider>
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <HomeStack.Screen
          name="ChallengeActivityScreen"
          component={ChallengeActivityScreen}
          options={{ title: "Choose Activity Type" }}
        />
        <HomeStack.Screen
          name="ChallengeTypeScreen"
          component={ChallengeTypeScreen}
          options={{ title: "Choose Your Challenge" }}
        />
        <HomeStack.Screen
          name="ChallengeTimelineScreen"
          component={ChallengeTimelineScreen}
          options={{ title: "Choose Your Timeline" }}
        />
        <HomeStack.Screen
          name="ChallengeShowScreen"
          component={ChallengeShowScreen}
        />
      </HomeStack.Navigator>
    </ChallengeProvider>
  );
}

const ChallengesStack = createStackNavigator<ChallengesParamList>();

function ChallengesStackScreen() {
  return (
    <ChallengesStack.Navigator>
      <ChallengesStack.Screen
        name="ChallengesScreen"
        component={ChallengeIndexScreen}
        options={{ title: "Challenges" }}
      />
      <ChallengesStack.Screen
        name="ChallengeShowScreen"
        component={ChallengeTabNavigator}
        options={{ title: "Challenge" }}
      />
    </ChallengesStack.Navigator>
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
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </ProfileStack.Navigator>
  );
}
