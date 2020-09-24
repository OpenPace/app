import React, { useState } from "react";
import { Button, Text, TextInput, Title } from "react-native-paper";
import {
  useAuthContext,
  loginSuccess,
  loginFail,
} from "../contexts/AuthContext";
import { logIn } from "../services/AuthService";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";

export default function LogInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth, dispatch } = useAuthContext();

  async function handleLogin() {
    setLoading(true);

    try {
      const { token, user } = await logIn({ email, password });
      setLoading(false);
      dispatch(loginSuccess(token, user));
    } catch (error) {
      setLoading(false);
      dispatch(loginFail(error.message));
    }
  }

  return (
    <Screen style={[BaseStyles.p4]}>
      <TextInput
        style={[BaseStyles.mb2]}
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        autoCompleteType="email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={[BaseStyles.mb4]}
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        autoCompleteType="password"
        secureTextEntry
      />

      <Button mode="contained" loading={loading} onPress={handleLogin}>
        Log In
      </Button>

      {auth.error && <Text>{auth.error}</Text>}
    </Screen>
  );
}
