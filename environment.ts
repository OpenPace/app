import Constants from "expo-constants";

const { manifest } = Constants;
const devPort = '4000';

let localhost = `http://localhost:${devPort}`;

if (manifest?.debuggerHost) {
  localhost = `http://${manifest.debuggerHost.split(':').shift()}:${devPort}`;
}

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
