import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  useAuthContext,
  loginSuccess,
  loginFail,
} from "../contexts/AuthContext";
import { logIn } from "../services/AuthService";
import { joinChallenge } from "../services/ChallengeService";
import Screen from "../components/Screen";
import AppleSignInButton from "../components/AppleSignInButton";
import GoogleSignInButton from "../components/GoogleSignInButton";
import BaseStyles from "../utils/BaseStyles";
import { LoggedOutParamList } from "../types";

type InviteRouteProp = RouteProp<LoggedOutParamList, "LogIn">;

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
      <AppleSignInButton />
      <GoogleSignInButton />

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

      <Button loading={loading} mode="contained" onPress={handleLogin}>
        Log In
      </Button>

      {auth.error && <Text>{auth.error}</Text>}
    </Screen>
  );
}
