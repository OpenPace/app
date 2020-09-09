import Constants from "expo-constants";
import { Platform } from "react-native";

const localhost =
  Platform.OS === "web" ? "http://localhost:4000" : "http://192.168.1.10:4000";

const ENV = {
  dev: {
    apiUrl: localhost,
    stravaClientId: "20972",
  },
  prod: {
    apiUrl: "https://www.openpace.co",
    stravaClientId: "20972",
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (env === "prod") {
    return ENV.prod;
  }

  return ENV.dev;
};

export default getEnvVars;
