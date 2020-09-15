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
}
