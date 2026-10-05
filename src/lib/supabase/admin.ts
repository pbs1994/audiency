import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. Bypasses RLS entirely — never import this
 * from a "use client" file or expose SUPABASE_SERVICE_ROLE_KEY to the
 * browser. Reserved for the few server actions that must perform a
 * privileged write (e.g. placing an order) after independently verifying
 * the caller's session with the regular server client.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
