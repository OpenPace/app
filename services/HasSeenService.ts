import AsyncStorage from "@react-native-community/async-storage";

export async function hasSeen(feature: string): Promise<boolean> {
  let hasSeen;

  try {
    hasSeen = await AsyncStorage.getItem(storageKey(feature));
  } catch {}

  return !!hasSeen || false;
}

export async function markHasSeen(feature: string): Promise<void> {
  try {
    await AsyncStorage.setItem(storageKey(feature), 'true');
  } catch {}
}

function storageKey(feature: string) {
  return `hasSeen:${feature}`;
}
