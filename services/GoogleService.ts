import { apiPost } from "../api/client";
import { persistToken } from "./AuthService";

export async function authUser(accessToken: string) {
  const response = await apiPost("/google/auth", {
    data: {
      access_token: accessToken,
    },
  });

  const body = await response.json();
  const token: string = body.token;
  persistToken(body.token);

  return {
    token,
  };
}
