import User from "../api/models/User";

type StringKeyable<T = any> = { [key: string]: T };

export function camelToUnderscore(key: string) {
  return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export function underscoreToCamel(key: string) {
  return key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

export function underscoreObject(data: StringKeyable) {
  const newObject: StringKeyable = {};
  for (const key in data) {
    newObject[camelToUnderscore(key)] = data[key];
  }

  return newObject;
}

export function camelizeObject(data: StringKeyable) {
  const newObject: StringKeyable = {};
  for (const key in data) {
    newObject[underscoreToCamel(key)] = data[key];
  }

  return newObject;
}

export function isStravaConnected(user: User) {
  return user.credentials.some((x) => x.provider === "strava");
}

export function cloudinaryImg(path: string) {
  return `https://res.cloudinary.com/openpace/image/upload/v1600917437/${path}`;
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toOrdinal(num: number) {
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

  return padNum(hours) + ":" + padNum(minutes) + ":" + padNum(seconds);
}

function padNum(num: number) {
  if (num < 10) {
    return `0${num}`;
  }

  return num.toString();
}

export function formatDistance(distance: number, imperial: boolean): string {
  if (imperial) {
    return (distance / 1609).toFixed(1) + " mi";
  }

  return (distance / 1000).toFixed(1) + " km";
}

export function formatAltitude(altitude: number, imperial: boolean): string {
  if (imperial) {
    return altitude * 3.28 + " ft";
  }

  return altitude + " m";
}

export function fullName(user: User) {
  return `${user.firstName} ${user.lastName}`;
}

export function locationName(user: User) {
  const arr: (string | undefined)[] = [user.city, user.state];

  return arr.filter((x) => !!x).join(", ");
}

export function unitsLabel(user: User) {
  return user.imperial ? "Feet & Miles" : "Meters & Kilometers";
}

export function timezoneLabel(user: User) {
  const { timezone } = user;

  if (timezone) {
    return timezone.replace(/_/, " ");
  }

  return "Not Set";
}
