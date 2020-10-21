import Credential from "./Credential";
import UserPrefs from "./UserPrefs";

export default interface User {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  city?: string;
  state?: string;
  credentials: Credential[];
  userPrefs: UserPrefs;
}

export interface UserParams {
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  city?: string;
  state?: string;
}
