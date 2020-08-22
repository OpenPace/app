import * as React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Text, View } from "../components/Themed";

export default function SignUpScreen() {
  const { navigate } = useNavigation();

  return (
    <View>
      <Text>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigate("LogIn")}>
        <Text>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}
