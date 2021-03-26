import User from "./User";
import Activity from "./Activity";

export default interface ChallengeActivity {
  id: number;
  amount: number;
  user: User;
  activity: Activity;
}
