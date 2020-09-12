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
            },
          },
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
          SignUp: 'sign-up',
          LogIn: 'log-in',
        },
      },
      NotFound: '*',
    },
  },
};
