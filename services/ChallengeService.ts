import { DateTime } from "luxon";
import Challenge, { ChallengeParams } from "../api/models/Challenge";
import Score from "../api/models/Score";
import { apiGet, apiPost, apiPut, Options } from "../api/client";
import { underscoreObject } from "../utils";

export async function getChallengesByUser(options: Options) {
  const response = await apiGet(`/challenges`, options);

  if (response.status !== 200) {
    throw new Error("Error creating challenge");
  }

  const body = await response.json();
  return body.challenges.map(parseChallenge);
}

export async function getChallenge(slug: string, options: Options) {
  const response = await apiGet(`/challenges/${slug}`, options);

  if (response.status !== 200) {
    throw new Error("Error creating challenge");
  }

  const body = await response.json();
  return parseChallenge(body);
}

export async function getLeaderboard(slug: string, options: Options) {
  const response = await apiGet(`/challenges/${slug}/leaderboard`, options);

  if (response.status !== 200) {
    throw new Error("Error getting leaderboard");
  }

  const body = await response.json();
  return body.scores.map(parseScore);
}

export async function createChallenge(
  params: ChallengeParams,
  options: Options,
) {
  const response = await apiPost("/challenges", {
    ...options,
    data: {
      challenge: underscoreObject(params),
    },
  });
  if (response.status !== 201) {
    throw new Error("Error creating challenge");
  }
  const body = await response.json();
  return parseChallenge(body);
}

export async function joinChallenge(slug: string, options: Options) {
  const response = await apiPut(`/challenges/${slug}/join`, options);

  if (response.status !== 204) {
    throw new Error("User already joined");
  }

  return {};
}

function parseChallenge(challenge: any) {
  return {
    slug: challenge.slug,
    name: challenge.name,
    activityType: challenge.activity_type,
    challengeType: challenge.challenge_type,
    timeline: challenge.timeline,
    startAt: DateTime.fromISO(challenge.start_at),
    endAt: DateTime.fromISO(challenge.end_at),
    scores: challenge.scores.map(parseScore),
  } as Challenge;
}

function parseScore(score: any): Score {
  return {
    score: score.score,
    userId: score.user_id,
    firstName: score.first_name,
    lastName: score.last_name,
    avatar: score.avatar,
    updatedAt: DateTime.fromISO(score.updated_at, { zone: "utc" }),
  } as Score;
}
