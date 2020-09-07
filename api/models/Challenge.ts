export default interface Challenge {
  id?: number;
  name?: string;
  activityType?: "run" | "ride" | "swim";
  challengeType?: "distance" | "time" | "altitude" | "segment";
  timeline?: "day" | "week" | "weekend" | "month" | "custom";
  startAt?: Date;
  endAt?: Date;
}
