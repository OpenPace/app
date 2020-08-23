import { Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import * as SecureStore from "expo-secure-store";
import { apiPost } from "../api/client";
import User from "../api/models/User";

type LoginParams = {
  email: string;
  password: string;
};

export async function logIn(params: LoginParams) {
  const response = await apiPost("/users/signin", params);
  if (response.status !== 201) {
    throw new Error("Email or password incorrect");
  }

  const body = await response.json();
  const user = parseUser(body.user);
  const token: string = body.token;
  persistUser(user);
  persistToken(body.token);

  return {
    token,
    user,
  };
}

type SignupParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export async function signUp(params: SignupParams) {
  const response = await apiPost("/users/signup", {
    ...params,
    encryptedPassword: params.password,
  });
  const body = await response.json();

  if (response.status !== 201) {
    throw new Error("Email or password incorrect");
  }

  const user = parseUser(body.user);
  const token: string = body.token;
  persistUser(user);
  persistToken(body.token);

  return {
    token,
    user,
  };
}

export async function logOut() {
  if (Platform.OS !== "web") {
    await SecureStore.deleteItemAsync("authToken");
  }
  await AsyncStorage.clear();
}

export async function loadAuth() {
  let token: string | null;

  if (Platform.OS === "web") {
    token = await AsyncStorage.getItem("authToken");
  } else {
    token = await SecureStore.getItemAsync("authToken");
  }

  const userPayload = await AsyncStorage.getItem("user");
  return {
    token,
    user: userPayload && JSON.parse(userPayload),
  };
}

async function persistUser(user: any) {
  await AsyncStorage.setItem("user", JSON.stringify(user));
}

async function persistToken(token: string) {
  if (Platform.OS === "web") {
    await AsyncStorage.setItem("authToken", token);
  } else {
    await SecureStore.setItemAsync("authToken", token);
  }
}

function parseUser(user: any) {
  const userObj: User = {
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
  };

  return userObj;
}
