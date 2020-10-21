import { DateTime } from "luxon";

export default interface UserPrefs {
  imperial: boolean;
  timezone: string;
  gender?: string;
  birthdate?: DateTime;
}

export interface UserPrefsParams {
  imperial?: boolean;
  timezone?: string;
  gender?: string;
  birthdate?: DateTime;
}
