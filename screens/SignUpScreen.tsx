import React, { useState } from "react";
import { Button, Headline, Text, TextInput, Surface } from "react-native-paper";
import { RouteProp, useRoute } from "@react-navigation/native";
import BaseStyles from "../utils/BaseStyles";
import Screen from "../components/Screen";
import {
  useAuthContext,
  loginSuccess,
  loginFail,
} from "../contexts/AuthContext";
import { signUp } from "../services/AuthService";
import { joinChallenge } from "../services/ChallengeService";
import { registerForPushNotifications } from "../services/NotificationService";
import { LoggedOutParamList } from "../types";
type InviteRouteProp = RouteProp<LoggedOutParamList, "LogIn">;

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth, dispatch } = useAuthContext();
  const route = useRoute<InviteRouteProp>();

  async function handleSignUp() {
    setLoading(true);

    const slug = route.params?.slug;

    try {
      const { token, user } = await signUp({
        firstName,
        lastName,
        email,
        password,
      });

      if (slug) {
        await joinChallenge(slug, { authToken: token });
      }

      setLoading(false);
      dispatch(loginSuccess(token, user));
      await afterLoginSuccess(token);
    } catch (error) {
      setLoading(false);
      dispatch(loginFail(error.message));
    }
  }

  async function afterLoginSuccess(authToken: string) {
    try {
      await registerForPushNotifications({ authToken });
    } catch (error) {}
  }

  return (
    <Screen style={[BaseStyles.p4]}>
      <Surface style={[BaseStyles.rounded, BaseStyles.p4]}>
        <Headline style={[BaseStyles.mb3]}>Create an Account</Headline>
        <TextInput
          label="First Name"
          mode="outlined"
          onChangeText={setFirstName}
          style={[BaseStyles.mb2]}
          value={firstName}
        />
        <TextInput
          label="Last Name"
          mode="outlined"
          onChangeText={setLastName}
          style={[BaseStyles.mb2]}
          value={lastName}
        />
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
          label="Password"
          mode="outlined"
          onChangeText={setPassword}
          secureTextEntry
          style={[BaseStyles.mb4]}
          value={password}
        />

        {auth.error && <Text>{auth.error}</Text>}

        <Button
          style={[BaseStyles.mt2, BaseStyles.mb3]}
          loading={loading}
          mode="contained"
          onPress={handleSignUp}
        >
          Sign Up
        </Button>
      </Surface>
    </Screen>
  );
}
