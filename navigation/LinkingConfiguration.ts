import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          StravaPrompt: "strava-connect",
          Challenges: {
            path: "challenges",
            screens: {
              ChallengesScreen: "",
              ChallengeActivityScreen: "new/activity",
              ChallengeTypeScreen: "new/type",
              ChallengeTimelineScreen: "new/timeline",
              ChallengeDateScreen: "new/dates",
              ChallengeDetailsScreen: "new/details",
              ChallengeShowScreen: {
                path: ":slug",
                screens: {
                  Home: "",
                  Leaderboard: "leaderboard",
                  Chat: "chat",
                },
              },
            },
          },
          Notifications: {
            screens: {
              NotificationsScreen: "notifications",
            },
          },
          Profile: {
            screens: {
              ProfileScreen: "profile",
              SettingsScreen: "settings",
            },
          },
          Welcome: "welcome",
          SignUp: "sign-up",
          LogIn: "log-in",
          Invitation: "invite/:slug",
        },
      },
      NotFound: "*",
    },
  },
};
