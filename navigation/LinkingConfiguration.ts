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
              ChallengeActivityScreen: 'challenges/activity',
              ChallengeTypeScreen: 'challenges/type',
              ChallengeTimelineScreen: 'challenges/timeline',
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
