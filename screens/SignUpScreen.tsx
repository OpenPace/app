import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
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
    } catch (error) {
      setLoading(false);
      dispatch(loginFail(error.message));
    }
  }

  return (
    <Screen style={[BaseStyles.p4]}>
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

      <Button loading={loading} mode="contained" onPress={handleSignUp}>
        Create an Account
      </Button>

      {auth.error && <Text>{auth.error}</Text>}
    </Screen>
  );
}
