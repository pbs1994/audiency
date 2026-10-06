"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getOrigin } from "@/lib/site-url";
import { routeHref, type Locale } from "@/lib/i18n";

export type AuthFormState = { error: string | null; message?: string | null };

export async function signIn(
  locale: Locale,
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  redirect(routeHref(locale, "account"));
}

export async function signUp(
  locale: Locale,
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("name") ?? "").trim();

  const origin = await getOrigin();
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName || null },
      emailRedirectTo: `${origin}/auth/confirm?next=${encodeURIComponent(routeHref(locale, "account"))}`,
    },
  });
  if (error) return { error: error.message };

  // "Confirm email" may be on or off for this project — handle both.
  if (!data.session) {
    return {
      error: null,
      message:
        locale === "fr"
          ? "Compte créé ! Vérifiez votre boîte mail et cliquez sur le lien de confirmation pour activer votre compte."
          : "Account created! Check your inbox and click the confirmation link to activate your account.",
    };
  }

  redirect(routeHref(locale, "account"));
}

export async function signOut(locale: Locale) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(routeHref(locale, "home"));
}
