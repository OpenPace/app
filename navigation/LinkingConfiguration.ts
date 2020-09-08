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
              ChallengeShowScreen: 'challenges/:id',
              ChallengeActivityScreen: 'challenges/activity',
              ChallengeTypeScreen: 'challenges/type',
              ChallengeTimelineScreen: 'challenges/timeline',
            },
          },
          Challenges: {
            screens: {
              ChallengesScreen: 'challenges',
              ChallengeShowScreen: 'challenges/:id',
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
