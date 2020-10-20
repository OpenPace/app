import { DateTime } from "luxon";

export default interface UserPrefs {
  imperial: boolean;
  timezone: string;
  gender?: string;
  birthdate?: DateTime;
}
