type StringKeyable<T = any> = { [key: string]: T };

export function camelToUnderscore(key: string) {
  return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export function camelizeObject(data: StringKeyable) {
  const newObject: StringKeyable = {};
  for (const key in data) {
    newObject[camelToUnderscore(key)] = data[key];
  }

  return newObject;
}
