import Credential from "./Credential";

export default interface User {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  city?: string;
  state?: string;
  credentials: Credential[];
  imperial: boolean;
  timezone?: string;
  gender?: string;
  birthdate?: Date;
}
