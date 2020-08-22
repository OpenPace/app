import React, { useState } from "react";
import { Button, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Text, View } from "../components/Themed";
import {
  useAuthContext,
  loginSuccess,
  loginFail,
} from "../contexts/AuthContext";

import { apiLogin } from "../api/auth";

export default function LogInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth, dispatch } = useAuthContext();
  const { navigate } = useNavigation();

  async function handleLogin() {
    setLoading(true);
    const response = await apiLogin({ email, password });

    if (response.status === 201) {
      const body = await response.json();
      dispatch(loginSuccess(body.email));
    } else {
      dispatch(loginFail("Email or password incorrect"));
    }

    setLoading(false);
  }

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        disabled={loading}
        onPress={handleLogin}
        title="Log In"
        accessibilityLabel="Learn more about this purple button"
      />

      {auth.error && <Text>{auth.error}</Text>}

      <Text>Don't have an account?</Text>
      <TouchableOpacity onPress={() => navigate("SignUp")}>
        <Text>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}
