import getEnvVars from "../environment";
const { apiUrl } = getEnvVars();

const API_ENDPOINT = `${apiUrl}/api`;

type StringKeyable<T = any> = { [key: string]: T };

export async function apiPost(url: string, data?: StringKeyable): Promise<any> {
  return fetch(`${API_ENDPOINT}${url}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
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
