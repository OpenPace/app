import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts as useGoogleFonts,
  Lato_700Bold,
} from "@expo-google-fonts/dev";

export default function useCachedResources() {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });
  const [googleFontsLoaded] = useGoogleFonts({ Lato_700Bold });

  SplashScreen.preventAutoHideAsync();

  if (fontsLoaded && googleFontsLoaded) {
    SplashScreen.hideAsync();
  }

  return fontsLoaded && googleFontsLoaded;
}
