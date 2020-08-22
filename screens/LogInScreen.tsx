import React, { useState } from "react";
import { Button, TextInput } from "react-native";
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
  const { dispatch } = useAuthContext();

  async function handleLogin() {
    setLoading(true);
    try {
      await apiLogin(email, password);
      setLoading(false);
      dispatch(loginSuccess(email));
    } catch (error) {
      setLoading(false);
      dispatch(loginFail(error.message));
    }
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

      <Text>{loading ? "Loading..." : "Not Loading"}</Text>

      <Button
        disabled={loading}
        onPress={handleLogin}
        title="Log In"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
