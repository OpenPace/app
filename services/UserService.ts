import { DateTime } from "luxon";
import Credential from "../api/models/Credential";
import User, { UserParams } from "../api/models/User";
import { apiGet, Options, apiPut } from "../api/client";
import { camelizeObject, underscoreObject } from "../utils";
import UserPrefs, { UserPrefsParams } from "../api/models/UserPrefs";
import { persistUser } from "./AuthService";

export async function getMe(options: Options) {
  const response = await apiGet(`/users/me`, options);

  if (response.status !== 200) {
    throw new Error("User not found");
  }

  const body = await response.json();
  const user = parseUser(body);
  persistUser(user);

  return user;
}

export async function saveMe(params: UserParams, options: Options) {
  const response = await apiPut("/users/me", {
    ...options,
    data: {
      user: underscoreObject(params),
    },
  });

  if (response.status !== 204) {
    throw new Error("User not saved");
  }

  return {};
}

export async function savePrefs(params: UserPrefsParams, options: Options) {
  const response = await apiPut("/user_prefs/me", {
    ...options,
    data: {
      user_prefs: underscoreObject(params),
    },
  });

  if (response.status !== 204) {
    throw new Error("User not saved");
  }

  return {};
}

export function parseUser(userObj: any) {
  const user = camelizeObject(userObj) as User;
  user.credentials = [];

  if (userObj.credentials) {
    user.credentials = userObj.credentials.map(parseCredential);
  }
  user.userPrefs = parseUserPrefs(userObj.user_prefs);

  return camelizeObject(user) as User;
}

function parseCredential(obj: any) {
  return obj as Credential;
}

function parseUserPrefs(obj: any) {
  return {
    imperial: obj.imperial,
    timezone: obj.timezone,
    gender: obj.gender,
    birthdate: obj.birthdate ? DateTime.fromISO(obj.birthdate) : null,
  } as UserPrefs;
}
