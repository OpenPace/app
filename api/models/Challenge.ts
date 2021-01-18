import { DateTime } from "luxon";
import Score from "./Score";

export type ActivityType = "run" | "bike" | "swim";
export type ChallengeType = "distance" | "time" | "altitude" | "segment";
export type ChallengeTimeline = "day" | "week" | "weekend" | "custom";

export default interface Challenge {
  slug: string;
  name: string;
  activityType: ActivityType;
  challengeType: ChallengeType;
  timeline: ChallengeTimeline;
  startAt: DateTime;
  endAt: DateTime;
  scores: Score[];
  segmentId?: string;
  polyline?: string;
}

export interface ChallengeParams {
  name?: string;
  activityType?: ActivityType;
  challengeType?: ChallengeType;
  timeline?: ChallengeTimeline;
  startAt?: DateTime;
  endAt?: DateTime;
  segmentId?: string;
  polyline?: string;
}
