import User from '../api/models/User';

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
  return user.credentials.some((x) => x.provider === 'strava');
}

export function cloudinaryImg(path: string) {
  return `https://res.cloudinary.com/openpace/image/upload/v1600917437/${path}`;
}
