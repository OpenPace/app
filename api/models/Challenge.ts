export type ActivityType = "run" | "ride" | "swim";
export type ChallengeType = "distance" | "time" | "altitude" | "segment";
export type ChallengeTimeline = "day" | "week" | "weekend" | "month" | "custom";

export default interface Challenge {
  id: number;
  name: string;
  activityType: ActivityType;
  challengeType: ChallengeType;
  timeline: ChallengeTimeline;
  startAt: Date;
  endAt: Date;
}
