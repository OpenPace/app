import getEnvVars from "../environment";
import React, { useEffect, useState } from "react";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Button } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";

import { restoreSuccess, useAuthContext } from "../contexts/AuthContext";
import { exchangeCode } from "../services/StravaService";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://www.strava.com/oauth/mobile/authorize",
  tokenEndpoint: "https://www.strava.com/oauth/token",
  revocationEndpoint: "https://www.strava.com/oauth/deauthorize",
};
const { stravaClientId } = getEnvVars();

interface Props {
  onSuccess?: () => void;
}

export default function StravaButton(props: Props) {
  const [loading, setLoading] = useState(false);
  const { auth, dispatch } = useAuthContext();

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
    async function getCredential(code: string) {
      try {
        if (!user || !token) {
          return;
        }

        // Make API call here
        const credential = await exchangeCode(code, { authToken: token });
        user.credentials.push(credential);
        dispatch(restoreSuccess(token, user));
        setLoading(false);
        props.onSuccess && props.onSuccess();
      } catch (error) {
        setLoading(false);
      }
    }

    const { user, token } = auth;

    if (response?.type === "success" && user && token) {
      const { code } = response.params;
      getCredential(code);
    }
  }, [response]);

  return (
    <Button loading={loading} mode="contained" onPress={handleClick}>
      Strava Connect
    </Button>
  );
}
