import Challenge from "../api/models/Challenge";
import { apiPost } from "../api/client";
import { camelizeObject } from "../utils";

export async function createChallenge(authToken: string, challenge: Challenge) {
  const response = await apiPost("/challenges", {
    authToken,
    data: {
      challenge: camelizeObject(challenge),
    },
  });
  if (response.status !== 201) {
    throw new Error("Error creating challenge");
  }
  const body = await response.json();
  return parseChallenge(body);
}

function parseChallenge(challenge: any) {
  const challengeObj: Challenge = {
    name: challenge.name,
    activityType: challenge.activity_type,
    challengeType: challenge.challenge_type,
    timeline: challenge.timeline,
    startAt: challenge.start_at,
    endAt: challenge.end_at,
  };

  return challengeObj;
}
