import { useNavigation, useRoute } from "@react-navigation/native";

// Steps:
// Activity type: bike, run, swim
// Challenge type: total distance, total time, altitude, fastest segment
// Segment select: if segment, show a list of segments
// Timeline: how long do you want the challenge to last?
// When to start? This week, next week, tomorrow, today?

export default function ChallengeNewScreen() {
  const route = useRoute();
  console.log(route.params);

  const navigation = useNavigation();
  navigation.navigate("Challenges", {
    screen: "ChallengeActivityScreen",
  });

  return null;
}
