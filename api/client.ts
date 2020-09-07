import getEnvVars from "../environment";
const { apiUrl } = getEnvVars();
import { camelizeObject } from "../utils";

const API_ENDPOINT = `${apiUrl}/api`;

type StringKeyable<T = any> = { [key: string]: T };

export interface Options {
  authToken?: string;
  data?: StringKeyable;
}

export async function apiPost(url: string, options: Options): Promise<any> {
  const { data } = options;

  return fetch(`${API_ENDPOINT}${url}`, {
    method: "POST",
    headers: buildHeaders(options),
    body: data ? JSON.stringify(camelizeObject(data)) : undefined,
  });
}

function buildHeaders({ authToken }: Options) {
  const headers: StringKeyable = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  return headers;
}
