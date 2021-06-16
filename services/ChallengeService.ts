import { DateTime } from "luxon";
import Challenge, { ChallengeParams } from "../api/models/Challenge";
import Score from "../api/models/Score";
import { apiGet, apiPost, apiPut, Options } from "../api/client";
import { underscoreObject } from "../utils";
import ChallengeActivity from "../api/models/ChallengeActivity";
import { parseUser } from "./UserService";
import { parseActivity } from "./ActivityService";

export async function getChallengesByUser(options: Options) {
  const response = await apiGet(`/challenges`, options);

  if (response.status !== 200) {
    throw new Error("Error creating challenge");
  }

  return response.body.challenges.map(parseChallenge);
}

export async function getChallenge(slug: string, options: Options) {
  const response = await apiGet(`/challenges/${slug}`, options);

  if (response.status !== 200) {
    throw new Error("Error creating challenge");
  }

  return parseChallenge(response.body);
}

export async function getActivities(slug: string, options: Options) {
  const response = await apiGet(`/challenges/${slug}/activities`, options);

  if (response.status !== 200) {
    throw new Error("Error getting feed");
  }

  return response.body.challenge_activities.map(parseChallengeActivity);
}

export async function getLeaderboard(slug: string, options: Options) {
  const response = await apiGet(`/challenges/${slug}/leaderboard`, options);

  if (response.status !== 200) {
    throw new Error("Error getting leaderboard");
  }

  return response.body.scores.map(parseScore);
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
  return parseChallenge(response.body);
}

export async function joinChallenge(slug: string, options: Options) {
  const response = await apiPut(`/challenges/${slug}/join`, options);

  if (response.status !== 204) {
    throw new Error("User already joined");
  }

  return {};
}

export async function userHasJoinedChallenge(slug: string, options: Options) {
  const response = await apiGet(`/challenges/${slug}/status`, options);
  return !!response.body.joined;
}

function parseChallenge(challenge: any) {
  return {
    slug: challenge.slug,
    name: challenge.name,
    activityType: challenge.activity_type,
    challengeType: challenge.challenge_type,
    timeline: challenge.timeline,
    segmentId: challenge.segment_id,
    polyline: challenge.polyline,
    startDate: DateTime.fromISO(challenge.start_date),
    endDate: DateTime.fromISO(challenge.end_date).endOf("day"),
    scores: challenge.scores.map(parseScore),
  } as Challenge;
}

function parseChallengeActivity(challengeActivity: any): ChallengeActivity {
  return {
    id: challengeActivity.id,
    amount: challengeActivity.amount,
    user: parseUser(challengeActivity.user),
    activity: parseActivity(challengeActivity.activity),
  } as ChallengeActivity;
}

function parseScore(score: any): Score {
  return {
    amount: score.amount,
    userId: score.user_id,
    firstName: score.first_name,
    lastName: score.last_name,
    avatar: score.avatar,
    updatedAt: DateTime.fromISO(score.updated_at, { zone: "utc" }),
  } as Score;
}
