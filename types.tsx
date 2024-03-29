import {
  ActivityType,
  ChallengeType,
  ChallengeTimeline,
} from "./api/models/Challenge";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Challenges: undefined;
  Notifications: undefined;
  Profile: undefined;
  Invitation: { slug: string };
};

// Activity type: bike, run, swim
// Challenge type: total distance, total time, altitude, fastest segment
// Segment select: if segment, show a list of segments
// Timeline: how long do you want the challenge to last?
// When to start? This week, next week, tomorrow, today?
interface challengeParams {
  activityType?: ActivityType;
  challengeType?: ChallengeType;
  timeline?: ChallengeTimeline;
}

export type ChallengesParamList = {
  StravaPrompt: undefined;
  ChallengesScreen: undefined;
  ChallengeShowScreen: { slug: string };
  ChallengeActivityScreen: challengeParams;
  ChallengeTypeScreen: challengeParams;
  ChallengeTimelineScreen: challengeParams;
  ChallengeDateScreen: challengeParams;
  ChallengeDetailsScreen: challengeParams;
  ChallengeSegmentSelectScreen: challengeParams;
  ChallengeSegmentScreen: { segmentId: string };
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
  SignUp: { slug: string } | undefined;
  LogIn: { slug: string } | undefined;
  Invitation: { slug: string };
};

export type ChallengeTabParamList = {
  Home: undefined;
  Leaderboard: undefined;
  Feed: undefined;
};
