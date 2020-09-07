import Challenge from "../api/models/Challenge";
import { apiPost } from "../api/client";

export async function createChallenge(authToken: string, challenge: Challenge) {
  const response = await apiPost("/challenges", {
    authToken,
    data: challenge,
  });
  console.log(response);

  return {};
}
