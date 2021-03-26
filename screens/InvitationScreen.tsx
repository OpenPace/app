import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BottomTabParamList, LoggedOutParamList } from "../types";
import { useAuthContext } from "../contexts/AuthContext";

type LoggedOutNavigationProp = StackNavigationProp<LoggedOutParamList>;
type LoggedInNavigationProp = BottomTabNavigationProp<BottomTabParamList>;
type InviteRouteProp = RouteProp<LoggedOutParamList, "Invitation">;

export default function InvitationScreen() {
  const route = useRoute<InviteRouteProp>();
  const loggedOutNav = useNavigation<LoggedOutNavigationProp>();
  const loggedInNav = useNavigation<LoggedInNavigationProp>();
  const { auth } = useAuthContext();
  const slug = route.params.slug;

  if (auth.isLoggedIn) {
    loggedInNav.navigate("Challenges", {
      screen: "ChallengeShowScreen",
      params: { slug: slug },
    });
  } else {
    loggedOutNav.navigate("Welcome");
  }

  return null;
}
