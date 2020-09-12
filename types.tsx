export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Challenges: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
  ChallengeShowScreen: { id: number };
  ChallengeActivityScreen: undefined;
  ChallengeTypeScreen: undefined;
  ChallengeTimelineScreen: undefined;
};

export type ChallengesParamList = {
  ChallengesScreen: undefined;
  ChallengeShowScreen: { id: number };
};

export type NotificationsParamList = {
  NotificationsScreen: undefined;
};

export type ProfileParamList = {
  ProfileScreen: undefined;
  SettingsScreen: undefined;
};

export type LoggedOutParamList = {
  LogIn: undefined;
  SignUp: undefined;
};

export type ChallengeTabParamList = {
  Leaderboard: { id: number };
  Chat: { id: number };
};
