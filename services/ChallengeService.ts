import Challenge from "../api/models/Challenge";
import { apiGet, apiPost, Options } from "../api/client";
import { camelizeObject, underscoreObject } from "../utils";

export async function getChallengesByUser(options: Options) {
  const response = await apiGet(`/challenges`, options);

  if (response.status !== 200) {
    throw new Error("Error creating challenge");
  }

  const body = await response.json();
  return body.challenges.map(parseChallenge);
}

export async function getChallenge(id: number, options: Options) {
  const response = await apiGet(`/challenges/${id}`, options);

  if (response.status !== 200) {
    throw new Error("Error creating challenge");
  }

  const body = await response.json();
  return parseChallenge(body);
}

export async function createChallenge(challenge: Challenge, options: Options) {
  const response = await apiPost("/challenges", {
    ...options,
    data: {
      challenge: underscoreObject(challenge),
    },
  });
  if (response.status !== 201) {
    throw new Error("Error creating challenge");
  }
  const body = await response.json();
  return parseChallenge(body);
}

function parseChallenge(challenge: any) {
  return camelizeObject(challenge) as Challenge;
}
