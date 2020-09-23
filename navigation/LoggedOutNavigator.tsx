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
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <LoggedOut.Screen name="SignUp" component={SignUpScreen} />
      <LoggedOut.Screen name="LogIn" component={LogInScreen} />
      <LoggedOut.Screen name="Invitation" component={InvitationScreen} />
    </LoggedOut.Navigator>
  );
}
