import React, { useEffect } from "react";
import { TouchableOpacity, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  useAuthContext,
  loginSuccess,
  loginFail,
} from "../contexts/AuthContext";
import BaseStyles from "../utils/BaseStyles";
import { authUser } from "../services/GoogleService";
import { getMe } from "../services/UserService";
import btnImage from "../assets/images/btn_google_signin.png";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {
  const { dispatch } = useAuthContext();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "884165526905-u35655pjohtuj1e7tl4bp6fq4lburmf3.apps.googleusercontent.com",
    androidClientId:
      "884165526905-714qe2eh9d8bn9b94i2lgdk5qhc6nvrc.apps.googleusercontent.com",
    webClientId:
      "884165526905-3g1g6v54p51uj1596o0frefk84bjdpcp.apps.googleusercontent.com",
    iosClientId:
      "884165526905-u0b4524ff6a290l4kes18lhca9nmemc8.apps.googleusercontent.com",
  });

  useEffect(() => {
    async function handleAuth(accessToken: string) {
      try {
        const { token } = await authUser(accessToken);
        const user = await getMe({ authToken: token });
        dispatch(loginSuccess(token, user));
      } catch (error) {
        dispatch(loginFail(error.message));
      }
    }

    if (response?.type === "success") {
      const accessToken = response.authentication?.accessToken;

      if (!accessToken) {
        return;
      }

      handleAuth(accessToken);
    }
  }, [response]);

  function handleClick() {
    promptAsync();
  }

  return (
    <TouchableOpacity onPress={handleClick}>
      <Image
        source={btnImage}
        style={[{ width: 191, height: 46 }, BaseStyles.mr2]}
      />
    </TouchableOpacity>
  );
}
