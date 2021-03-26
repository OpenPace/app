import User from "../api/models/User";
import { ChallengeParams } from "../api/models/Challenge";

export type StringKeyable<T = any> = { [key: string]: T };

export function camelToUnderscore(key: string): string {
  return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export function underscoreToCamel(key: string): string {
  return key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

export function underscoreObject(data: StringKeyable): StringKeyable {
  const newObject: StringKeyable = {};
  for (const key in data) {
    newObject[camelToUnderscore(key)] = data[key];
  }

  return newObject;
}

export function camelizeObject(data: StringKeyable): StringKeyable {
  const newObject: StringKeyable = {};
  for (const key in data) {
    newObject[underscoreToCamel(key)] = data[key];
  }

  return newObject;
}

export function isStravaConnected(user: User): boolean {
  return user.credentials.some((x) => x.provider === "strava");
}

export function cloudinaryImg(path: string): string {
  return `https://res.cloudinary.com/openpace/image/upload/v1600917437/${path}`;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toOrdinal(num: number): string {
  const j = num % 10,
    k = num % 100;

  if (j == 1 && k != 11) {
    return num + "st";
  }
  if (j == 2 && k != 12) {
    return num + "nd";
  }
  if (j == 3 && k != 13) {
    return num + "rd";
  }
  return num + "th";
}

export function formatDuration(duration: number): string {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration - hours * 3600) / 60);
  const seconds = duration - hours * 3600 - minutes * 60;
  const parts = [padNum(minutes), padNum(seconds)];
  if (hours > 0) {
    parts.unshift(hours.toString());
  }

  return parts.join(":");
}

function padNum(num: number) {
  if (num < 10) {
    return `0${num}`;
  }

  return num.toString();
}

export function formatNumber(num: number, decimals = 0) {
  const str = num.toFixed(decimals);
  const parts = str.split(".");
  const firstPart = parts[0].replace(/(.)(?=(\d{3})+$)/g, "$1,");
  parts.shift();
  if (parts.length === 0) {
    return firstPart;
  }
  return `${firstPart}.${parts.join("")}`;
}

export function formatDistance(
  distance: number,
  imperial: boolean,
  decimals = 0,
): string {
  if (imperial) {
    return formatNumber(distance / 1609, decimals) + " mi";
  }

  return formatNumber(distance / 1000, decimals) + " km";
}

export function formatAltitude(altitude: number, imperial: boolean): string {
  if (imperial) {
    return formatNumber(altitude * 3.28) + " ft";
  }

  return formatNumber(altitude) + " m";
}

export function fullName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}

export function locationName(user: User): string {
  const arr: Array<string | undefined> = [user.city, user.state];

  return arr.filter((x) => !!x).join(", ");
}

export function unitsLabel(imperial: boolean): string {
  return imperial ? "Feet & Miles" : "Meters & Kilometers";
}

export function timezoneLabel(timezone: string): string {
  if (timezone) {
    return timezone.replace(/_/, " ");
  }

  return "Not Set";
}

export function generateChallengeName(params: ChallengeParams) {
  const challengeSyn = ["challenge", "gauntlet", "bracket", "competition"];

  const activityMap = {
    run: "Running",
    bike: "Biking",
    swim: "Swimming",
  };

  const parts = [challengeSyn[Math.floor(Math.random() * challengeSyn.length)]];

  const { activityType, timeline, challengeType, segmentName } = params;

  if (challengeType === 'segment' && segmentName) {
    parts.unshift(segmentName);
  } else {
    if (challengeType) {
      parts.unshift(challengeType);
    }

    if (activityType) {
      parts.unshift(activityMap[activityType]);
    }

    if (timeline && timeline !== "custom") {
      parts.unshift(timeline);
    }
  }

  return parts.map((x) => capitalize(x)).join(" ");
}
