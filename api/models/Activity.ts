import { DateTime } from "luxon";

type ActivityType = "run" | "bike" | "swim";
type WorkoutType = "race" | "long_run" | "workout";

export default interface Activity {
  id: number;
  name: string;
  activityType: ActivityType;
  workoutType: WorkoutType;
  distance: number;
  startAt: DateTime;
  duration: number;
  elevationGain: number;
  externalId: string;
  polyline: string;
}
