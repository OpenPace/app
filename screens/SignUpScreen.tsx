import React, { useState } from "react";
import { Button, Text, TextInput, Title } from "react-native-paper";
import BaseStyles from "../utils/BaseStyles";
import Screen from "../components/Screen";
import {
  useAuthContext,
  loginSuccess,
  loginFail,
} from "../contexts/AuthContext";
import { signUp } from "../services/AuthService";

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth, dispatch } = useAuthContext();

  async function handleSignUp() {
    setLoading(true);
    try {
      const { token, user } = await signUp({
        firstName,
        lastName,
        email,
        password,
      });
      setLoading(false);
      dispatch(loginSuccess(token, user));
    } catch (error) {
      setLoading(false);
      dispatch(loginFail(error.message));
    }
  }

  return (
    <Screen style={[BaseStyles.p4]}>
      <Title style={[BaseStyles.mb4]}>Create an Account</Title>
      <TextInput
        style={[BaseStyles.mb2]}
        label="First Name"
        value={firstName}
        onChangeText={setFirstName}
        mode="outlined"
      />
      <TextInput
        style={[BaseStyles.mb2]}
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
        mode="outlined"
      />
      <TextInput
        style={[BaseStyles.mb2]}
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
      />
      <TextInput
        style={[BaseStyles.mb2]}
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
      />

      <Button
        style={[BaseStyles.mb2]}
        mode="contained"
        loading={loading}
        onPress={handleSignUp}
      >
        Create an Account
      </Button>

      {auth.error && <Text>{auth.error}</Text>}
    </Screen>
  );
}
