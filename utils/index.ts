import User from "../api/models/User";

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

export function formatNumber(num: number) {
  const str = num.toFixed(0);
  return str.replace(/(.)(?=(\d{3})+$)/g,'$1,');
}

export function formatDistance(distance: number, imperial: boolean): string {
  if (imperial) {
    return formatNumber(distance / 1609) + " mi";
  }

  return formatNumber(distance / 1000) + " km";
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

export function shareLink(slug: string): string {
  return `https://www.openpace.co/invite/${slug}`;
}
