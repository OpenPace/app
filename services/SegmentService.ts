import Segment, { DetailedSegment } from "../api/models/Segment";
import { apiGet, Options } from "../api/client";

export async function getStarredSegments(options: Options): Promise<Segment[]> {
  const response = await apiGet(`/segments/starred`, options);

  if (response.status !== 200) {
    throw new Error("Error fetching segments");
  }

  const body = response.body;
  return body.segments.map(parseSegment);
}

export async function getDetailedSegment(
  id: number | string,
  options: Options,
) {
  const url = `/segments/${id}`;
  const response = await apiGet(url, options);

  if (response.status !== 200) {
    throw new Error("Error fetching segments");
  }

  const body = response.body;
  return parseDetailedSegment(body);
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

function parseDetailedSegment(segmentObj: any) {
  const segment = parseSegment(segmentObj);
  return {
    ...segment,
    polyline: segmentObj.polyline,
  } as DetailedSegment;
}
