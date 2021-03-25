import User from "./User";
import Activity from "./Activity";

export default interface ChallengeActivity {
  amount: number;
  user: User;
  activity: Activity;
}
