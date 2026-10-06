import "server-only";
import { extractHandle, matchesFormat } from "./handle";
import { getTwitchAppToken, getSpotifyAppToken } from "./tokens";

export type VerifyStatus = "found" | "not_found" | "format_ok" | "format_invalid" | "error";

async function checkYouTube(handle: string): Promise<VerifyStatus> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return matchesFormat("youtube", handle) ? "format_ok" : "format_invalid";

  const atHandle = handle.startsWith("@") ? handle : `@${handle}`;
  const byHandle = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${encodeURIComponent(atHandle)}&key=${apiKey}`
  );
  if (byHandle.ok) {
    const data = (await byHandle.json()) as { items?: unknown[] };
    if (data.items && data.items.length > 0) return "found";
  }

  // Legacy custom-URL channels aren't "handles" — try the old username lookup too.
  const byUsername = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=${encodeURIComponent(handle)}&key=${apiKey}`
  );
  if (byUsername.ok) {
    const data = (await byUsername.json()) as { items?: unknown[] };
    if (data.items && data.items.length > 0) return "found";
  }

  return "not_found";
}

async function checkTwitch(handle: string): Promise<VerifyStatus> {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const token = await getTwitchAppToken();
  if (!clientId || !token) return matchesFormat("twitch", handle) ? "format_ok" : "format_invalid";

  const res = await fetch(`https://api.twitch.tv/helix/users?login=${encodeURIComponent(handle.toLowerCase())}`, {
    headers: { Authorization: `Bearer ${token}`, "Client-Id": clientId },
  });
  if (!res.ok) return "error";

  const data = (await res.json()) as { data?: unknown[] };
  return data.data && data.data.length > 0 ? "found" : "not_found";
}

async function checkSpotify(handle: string): Promise<VerifyStatus> {
  const token = await getSpotifyAppToken();
  if (!token) return matchesFormat("spotify", handle) ? "format_ok" : "format_invalid";

  const res = await fetch(`https://api.spotify.com/v1/users/${encodeURIComponent(handle)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 404) return "not_found";
  if (!res.ok) return "error";
  return "found";
}

/**
 * Verifies a username/URL against a platform. Real existence checks only
 * exist for platforms with a free, ToS-compliant public API (YouTube,
 * Twitch, Spotify). Every other platform gets a format-only check —
 * confirms the handle is shaped right, not that the profile exists.
 */
export async function verifyProfile(platformSlug: string, rawInput: string): Promise<VerifyStatus> {
  const handle = extractHandle(rawInput);
  if (!handle) return "format_invalid";

  try {
    switch (platformSlug) {
      case "youtube":
        return await checkYouTube(handle);
      case "twitch":
        return await checkTwitch(handle);
      case "spotify":
        return await checkSpotify(handle);
      default:
        return matchesFormat(platformSlug, handle) ? "format_ok" : "format_invalid";
    }
  } catch {
    return matchesFormat(platformSlug, handle) ? "format_ok" : "format_invalid";
  }
}
