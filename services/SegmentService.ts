import Segment from "../api/models/Segment";
import { apiGet, Options } from "../api/client";

export async function getStarredSegments(options: Options): Promise<Segment[]> {
  const response = await apiGet(`/segments/starred`, options);

  if (response.status !== 200) {
    throw new Error("Error fetching segments");
  }

  const body = await response.json();
  return body.segments.map(parseSegment);
}

function parseSegment(segment: any) {
  return {
    id: segment.id,
    name: segment.name,
    distance: segment.distance,
    activityType: segment.activity_type,
    averageGrade: segment.average_grade,
    city: segment.city,
    state: segment.state,
    country: segment.country,
    private: segment.private,
  } as Segment;
}
