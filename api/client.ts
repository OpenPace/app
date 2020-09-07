import getEnvVars from "../environment";
const { apiUrl } = getEnvVars();

const API_ENDPOINT = `${apiUrl}/api`;

type StringKeyable<T = any> = { [key: string]: T };

interface Options {
  authToken?: string;
  data?: StringKeyable;
}

export async function apiPost(url: string, options: Options): Promise<any> {
  const { data } = options;

  return fetch(`${API_ENDPOINT}${url}`, {
    method: "POST",
    headers: buildHeaders(options),
    body: data ? stringifyData(data) : undefined,
  });
}

function camelToUnderscore(key: string) {
  return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}

function stringifyData(data: StringKeyable) {
  const newObject: StringKeyable = {};
  for (const key in data) {
    newObject[camelToUnderscore(key)] = data[key];
  }

  return JSON.stringify(newObject);
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
