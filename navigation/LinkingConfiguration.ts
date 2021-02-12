import * as Linking from "expo-linking";
import { getStateFromPath } from "@react-navigation/native";

export default {
  prefixes: [Linking.makeUrl("/"), "https://www.openpace.co"],
  config: {
    screens: {
      Root: {
        path: "",
        initialRouteName: "Challenges",
        screens: {
          Challenges: {
            path: "challenges",
            screens: {
              ChallengesScreen: "",
              StravaPrompt: "strava-connect",
              ChallengeActivityScreen: "new/activity",
              ChallengeSegmentSelectScreen: "new/segment",
              ChallengeSegmentScreen: "new/segment/:segmentId",
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
  getStateFromPath: (path: string, options: any) => {
    // Don't handle expo-auth-session strings
    if (path.indexOf("expo-auth-session") !== -1) {
      return;
    }

    return getStateFromPath(path, options);
  },
};
