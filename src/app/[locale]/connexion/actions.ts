"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { routeHref, type Locale } from "@/lib/i18n";

export type AuthFormState = { error: string | null };

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

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName || null } },
  });
  if (error) return { error: error.message };

  redirect(routeHref(locale, "account"));
}

export async function signOut(locale: Locale) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(routeHref(locale, "home"));
}
