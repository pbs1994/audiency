import "server-only";

type CachedToken = { token: string; expiresAt: number };
const cache = new Map<string, CachedToken>();

/** App-only OAuth token via client-credentials grant, cached in memory until near expiry. */
async function getAppToken(
  cacheKey: string,
  tokenUrl: string,
  params: Record<string, string>,
  headers?: Record<string, string>
): Promise<string | null> {
  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now() + 30_000) return cached.token;

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", ...headers },
    body: new URLSearchParams(params).toString(),
  });
  if (!res.ok) return null;

  const data = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!data.access_token) return null;

  cache.set(cacheKey, {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  });
  return data.access_token;
}

export async function getTwitchAppToken(): Promise<string | null> {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  return getAppToken("twitch", "https://id.twitch.tv/oauth2/token", {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
  });
}

export async function getSpotifyAppToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  return getAppToken(
    "spotify",
    "https://accounts.spotify.com/api/token",
    { grant_type: "client_credentials" },
    { Authorization: `Basic ${basic}` }
  );
}
