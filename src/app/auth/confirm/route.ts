import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

/**
 * Lands here from the links in the "Confirm signup" and "Reset password"
 * emails (see supabase/email-templates/). Verifies the one-time token
 * server-side, which also establishes the session cookie, then redirects
 * to `next` (already locale-aware — it's set by the server action that
 * triggered the email).
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/compte";

  if (tokenHash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/connexion?error=confirmation_failed`);
}
