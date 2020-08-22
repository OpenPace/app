import React, { useState } from "react";
import { Button, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Text, View } from "../components/Themed";
import {
  useAuthContext,
  loginSuccess,
  loginFail,
} from "../contexts/AuthContext";

import { apiSignup } from "../api/auth";

export default function SignUpScreen() {
  const { navigate } = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  async function handleSignUp() {
    setLoading(true);
    try {
      await apiSignup(name, email, password);
      setLoading(false);
      dispatch(loginSuccess(email));
    } catch (error) {
      setLoading(false);
      dispatch(loginFail(error.message));
    }
  }

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        disabled={loading}
        onPress={handleSignUp}
        title="Sign Up"
        accessibilityLabel="Learn more about this purple button"
      />

      <Text>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigate("LogIn")}>
        <Text>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}
