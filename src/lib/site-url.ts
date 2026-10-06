import "server-only";
import { headers } from "next/headers";

/**
 * The current request's origin, derived from the Host header. Used to build
 * auth email redirect links that work from both localhost and production
 * without hardcoding a domain. Every origin this can resolve to must be
 * added to Supabase Auth → URL Configuration → Redirect URLs.
 */
export async function getOrigin(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "boostinflu.com";
  const protocol = host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  return `${protocol}://${host}`;
}
