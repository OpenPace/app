import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { View } from "../components/Themed";
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
  const { navigate } = useNavigation();

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
      <View>
        <Title style={[BaseStyles.mb4]}>Welcome Back</Title>
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
          style={[BaseStyles.mb2]}
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

        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigate("SignUp")}>
          <Text>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
