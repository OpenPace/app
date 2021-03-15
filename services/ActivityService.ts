import { DateTime } from "luxon";
import Activity from "../api/models/Activity";
import { apiGet, Options } from "../api/client";

export async function getActivitiesByDates(
  startDate: DateTime,
  endDate: DateTime,
  options: Options,
) {
  const url = `/users/me/activities?start_date=${startDate.toISODate()}&end_date=${endDate.toISODate()}`;
  const response = await apiGet(url, options);

  if (response.status !== 200) {
    throw new Error("Error fetching activities");
  }

  return response.body.activities.map(parseActivity);
}

export function parseActivity(activityObj: any) {
  return {
    id: activityObj.id,
    name: activityObj.name,
    description: activityObj.description,
    activityType: activityObj.activity_type,
    workoutType: activityObj.workout_type,
    distance: activityObj.distance,
    startAt: DateTime.fromISO(activityObj.start_at),
    startAtLocal: DateTime.fromISO(activityObj.start_at_local),
    duration: activityObj.duration,
    elevationGain: activityObj.elevation_gain,
    externalId: activityObj.external_id,
    polyline: activityObj.polyline,
  } as Activity;
}
