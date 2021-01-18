import { DateTime } from "luxon";

export default interface Score {
  amount: number;
  userId: number;
  firstName: string;
  lastName: string;
  avatar: string;
  updatedAt: DateTime;
}
