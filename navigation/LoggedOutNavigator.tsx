import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoggedOutParamList } from "../types";
import SignUpScreen from "../screens/SignUpScreen";
import LogInScreen from "../screens/LogInScreen";

const LoggedOut = createStackNavigator<LoggedOutParamList>();

export default function LoggedOutNavigator() {
  return (
    <LoggedOut.Navigator headerMode="none">
      <LoggedOut.Screen name="SignUp" component={SignUpScreen} />
      <LoggedOut.Screen name="LogIn" component={LogInScreen} />
    </LoggedOut.Navigator>
  );
}
