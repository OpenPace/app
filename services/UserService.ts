import Credential from "../api/models/Credential";
import User from "../api/models/User";
import { apiGet, Options } from "../api/client";
import { camelizeObject } from "../utils";

export async function getMe(options: Options) {
  const response = await apiGet(`/users/me`, options);

  if (response.status !== 200) {
    throw new Error("User not found");
  }

  const body = await response.json();
  return parseUser(body);
}

export function parseUser(userObj: any) {
  const user = camelizeObject(userObj) as User;
  user.credentials = [];

  if (userObj.credentials) {
    user.credentials = userObj.credentials.map(parseCredential);
  }
  return camelizeObject(user) as User;
}

function parseCredential(obj: any) {
  return obj as Credential;
}
