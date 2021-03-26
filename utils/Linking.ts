import * as Linking from "expo-linking";
import getEnvVars from "../environment";

export function shareLink(slug: string): string {
  const { linkingUrl } = getEnvVars();

  if (linkingUrl) {
    return `${linkingUrl}/invite/${slug}`;
  }

  return Linking.makeUrl(`/invite/${slug}`);
}
