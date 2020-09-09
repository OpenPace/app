import getEnvVars from "../environment";
import React, { useEffect, useState } from "react";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Button } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";

import { useAuthContext } from "../contexts/AuthContext";
import { exchangeCode } from "../services/StravaService";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://www.strava.com/oauth/mobile/authorize",
  tokenEndpoint: "https://www.strava.com/oauth/token",
  revocationEndpoint: "https://www.strava.com/oauth/deauthorize",
};
const { stravaClientId } = getEnvVars();

export default function StravaButton() {
  const [loading, setLoading] = useState(false);
  const { auth } = useAuthContext();

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: stravaClientId,
      scopes: ["activity:read_all"],
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        // For usage in bare and standalone
        // the "redirect" must match your "Authorization Callback Domain" in the Strava dev console.
        native: "openpace://redirect",
      }),
    },
    discovery
  );

  function handleClick() {
    setLoading(true);
    promptAsync();
  }

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      // Make API call here
      exchangeCode(code, { authToken: auth.token });
    }
    setLoading(false);
  }, [response]);

  return (
    <Button loading={loading} mode="contained" onPress={handleClick}>
      Strava Connect
    </Button>
  );
}
