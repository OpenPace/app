import AsyncStorage from "@react-native-community/async-storage";
import getEnvVars from "../environment";
const { apiUrl } = getEnvVars();
import { underscoreObject } from "../utils";
import { DateTime } from "luxon";

const API_ENDPOINT = `${apiUrl}/api`;

type StringKeyable<T = any> = { [key: string]: T };

interface ApiResponse {
  status: number;
  body: any;
}

interface CachedEntry {
  requestTime: DateTime;
  response: ApiResponse;
}

export interface Options {
  authToken?: string;
  data?: StringKeyable;
  ttl?: number;
}

export async function apiGet(url: string, options: Options) {
  return cachedApiGet(url, options);
}

export async function apiPost(url: string, options: Options) {
  const { data } = options;

  const response = await fetch(`${API_ENDPOINT}${url}`, {
    method: "POST",
    headers: buildHeaders(options),
    body: data ? JSON.stringify(underscoreObject(data)) : undefined,
  });

  return parseApiResponse(response);
}

export async function apiPut(url: string, options: Options) {
  const { data } = options;

  const response = await fetch(`${API_ENDPOINT}${url}`, {
    method: "PUT",
    headers: buildHeaders(options),
    body: data ? JSON.stringify(underscoreObject(data)) : undefined,
  });

  return parseApiResponse(response);
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

async function parseApiResponse(response: Response) {
  const body = response.status === 204 ? {} : await response.json();
  return {
    body,
    status: response.status,
  } as ApiResponse;
}

async function cachedApiGet(url: string, options: Options) {
  const cachedEntryStr = await AsyncStorage.getItem(url);
  let cachedEntry: CachedEntry | undefined;
  let cacheAge = Infinity;

  if (cachedEntryStr) {
    const obj = JSON.parse(cachedEntryStr);
    cachedEntry = {
      response: obj.response as ApiResponse,
      requestTime: DateTime.fromISO(obj.requestTime),
    } as CachedEntry;

    cacheAge = DateTime.utc().diff(cachedEntry.requestTime).as("minutes");
  }

  if (cachedEntry && options.ttl && options.ttl > cacheAge) {
    return cachedEntry.response;
  } else {
    const response = await fetch(`${API_ENDPOINT}${url}`, {
      headers: buildHeaders(options),
    });

    const apiResponse = await parseApiResponse(response);

    cachedEntry = {
      response: apiResponse,
      requestTime: DateTime.utc(),
    } as CachedEntry;

    try {
      await AsyncStorage.setItem(url, JSON.stringify(cachedEntry));
    } catch (e) {
      console.log(e.message);
    }

    return apiResponse;
  }
}
