import { DateTime } from "luxon";

export type ActivityType = "run" | "bike" | "swim";
export type ChallengeType = "distance" | "time" | "altitude" | "segment";
export type ChallengeTimeline = "day" | "week" | "weekend" | "custom";

export default interface Challenge {
  id: number;
  name: string;
  activityType: ActivityType;
  challengeType: ChallengeType;
  timeline: ChallengeTimeline;
  startAt: DateTime;
  endAt: DateTime;
}

export interface ChallengeParams {
  name?: string;
  activityType?: ActivityType;
  challengeType?: ChallengeType;
  timeline?: ChallengeTimeline;
  startAt?: DateTime;
  endAt?: DateTime;
}
