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
              ChallengeShowScreen: 'challenges/:id/old',
              ChallengeActivityScreen: 'challenges/activity',
              ChallengeTypeScreen: 'challenges/type',
              ChallengeTimelineScreen: 'challenges/timeline',
            },
          },
          Challenges: {
            screens: {
              ChallengesScreen: 'challenges',
              ChallengeShowScreen: {
                path: 'challenges/:id',
                screens: {
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
