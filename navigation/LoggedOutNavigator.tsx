import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoggedOutParamList } from "../types";
import SignUpScreen from "../screens/SignUpScreen";
import InvitationScreen from "../screens/InvitationScreen";
import LogInScreen from "../screens/LogInScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const LoggedOut = createStackNavigator<LoggedOutParamList>();

export default function LoggedOutNavigator() {
  return (
    <LoggedOut.Navigator>
      <LoggedOut.Screen
        component={WelcomeScreen}
        name="Welcome"
        options={{ headerShown: false }}
      />
      <LoggedOut.Screen
        component={SignUpScreen}
        name="SignUp"
        options={{ title: "Create an Account" }}
      />
      <LoggedOut.Screen
        component={LogInScreen}
        name="LogIn"
        options={{ title: "Welcome Back" }}
      />
      <LoggedOut.Screen
        component={InvitationScreen}
        name="Invitation"
        options={{ title: "Challenge Invite" }}
      />
    </LoggedOut.Navigator>
  );
}
