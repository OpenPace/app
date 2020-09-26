export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Challenges: undefined;
  Notifications: undefined;
  Profile: undefined;
  StravaPrompt: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
  ChallengeNewScreen: undefined;
};

export type ChallengesParamList = {
  ChallengesScreen: undefined;
  ChallengeShowScreen: { id: number };
  ChallengeActivityScreen: undefined;
  ChallengeTypeScreen: undefined;
  ChallengeTimelineScreen: undefined;
};

export type NotificationsParamList = {
  NotificationsScreen: undefined;
};

export type ProfileParamList = {
  ProfileScreen: undefined;
  SettingsScreen: undefined;
};

export type LoggedOutParamList = {
  Welcome: undefined;
  SignUp: undefined;
  LogIn: undefined;
  Invitation: { id: number };
};

export type ChallengeTabParamList = {
  Home: undefined;
  Leaderboard: undefined;
  Chat: undefined;
};
