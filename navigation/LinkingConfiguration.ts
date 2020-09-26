import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
              ChallengeNewScreen: 'new',
            },
          },
          StravaPrompt: 'strava-connect',
          Challenges: {
            path: 'challenges',
            screens: {
              ChallengesScreen: '',
              ChallengeActivityScreen: 'new/activity',
              ChallengeTypeScreen: 'new/type',
              ChallengeTimelineScreen: 'new/timeline',
              ChallengeShowScreen: {
                path: ':id',
                screens: {
                  Home: '',
                  Leaderboard: 'leaderboard',
                  Chat: 'chat',
                },
              }
            },
          },
          Notifications: {
            screens: {
              NotificationsScreen: 'notifications',
            },
          },
          Profile: {
            screens: {
              ProfileScreen: 'profile',
            },
          },
          Welcome: 'welcome',
          SignUp: 'sign-up',
          LogIn: 'log-in',
          Invitation: 'invite/:id',
        },
      },
      NotFound: '*',
    },
  },
};
