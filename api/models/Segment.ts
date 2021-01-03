export default interface Segment {
  id: number;
  name: string;
  activityType: "Ride" | "Run";
  distance: number;
  averageGrade: number;
  // maximumGrade: number;
  // elevationHigh: number;
  // elevationLow: number;

  // The category of the climb [0, 5]. Higher is harder ie. 5 is Hors catégorie, 0 is uncategorized in climb_category.
  // climbCategory: number;

  city: string;
  state: string;
  country: string;

  private: boolean;

  // start_latlng: [44.86, -85.53]
  // end_latlng: [44.86, -85.52]
}
