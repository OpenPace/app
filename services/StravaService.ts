import Credential from "../api/models/Credential";
import { apiPost, Options } from "../api/client";

export async function exchangeCode(code: string, options: Options) {
  const response = await apiPost("/strava/exchange", {
    ...options,
    data: {
      code,
    },
  });

  const body = await response.json();
  return {
    provider: body.provider,
    uid: body.uid,
  } as Credential;
}
