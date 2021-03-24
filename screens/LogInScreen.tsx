import React, { useState } from "react";
import { Button, Text, TextInput, Surface, Headline } from "react-native-paper";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  useAuthContext,
  loginSuccess,
  loginFail,
} from "../contexts/AuthContext";
import { logIn } from "../services/AuthService";
import { joinChallenge } from "../services/ChallengeService";
import Screen from "../components/Screen";
import BaseStyles from "../utils/BaseStyles";
import { LoggedOutParamList } from "../types";
import * as WebBrowser from "expo-web-browser";

type InviteRouteProp = RouteProp<LoggedOutParamList, "LogIn">;

function handleForgotPassword() {
  WebBrowser.openBrowserAsync("https://www.openpace.co/forgot-password");
}

export default function LogInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth, dispatch } = useAuthContext();
  const route = useRoute<InviteRouteProp>();

  async function handleLogin() {
    setLoading(true);

    const slug = route.params?.slug;

    try {
      const { token, user } = await logIn({ email, password });
      setLoading(false);
      if (slug) {
        await joinChallenge(slug, { authToken: token });
      }

      dispatch(loginSuccess(token, user));
    } catch (error) {
      setLoading(false);
      dispatch(loginFail(error.message));
    }
  }

  return (
    <Screen style={[BaseStyles.p4]}>
      <Surface style={[BaseStyles.rounded, BaseStyles.p4]}>
        <Headline style={[BaseStyles.mb3]}>Welcome back!</Headline>

        <TextInput
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
          label="Email"
          mode="outlined"
          onChangeText={setEmail}
          style={[BaseStyles.mb2]}
          value={email}
        />
        <TextInput
          autoCompleteType="password"
          label="Password"
          mode="outlined"
          onChangeText={setPassword}
          secureTextEntry
          style={[BaseStyles.mb4]}
          value={password}
        />

        <Button
          style={[BaseStyles.mb3]}
          loading={loading}
          mode="contained"
          onPress={handleLogin}
        >
          Log In
        </Button>

        <Text onPress={handleForgotPassword} style={BaseStyles.textMuted}>
          Forgot password?
        </Text>

        {auth.error && <Text>{auth.error}</Text>}
      </Surface>
    </Screen>
  );
}
