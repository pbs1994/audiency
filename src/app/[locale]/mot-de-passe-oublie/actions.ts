"use server";

import { createClient } from "@/lib/supabase/server";
import { getOrigin } from "@/lib/site-url";
import { routeHref, type Locale } from "@/lib/i18n";

export type ForgotPasswordState = { sent: boolean };

export async function requestPasswordReset(
  locale: Locale,
  _prevState: ForgotPasswordState,
  formData: FormData
): Promise<ForgotPasswordState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { sent: false };

  const origin = await getOrigin();
  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/confirm?next=${encodeURIComponent(routeHref(locale, "resetPassword"))}`,
  });

  // Always report success, regardless of outcome: don't reveal whether an
  // email is registered (standard practice — Supabase's own signUp does
  // the same for an already-registered address).
  return { sent: true };
}
