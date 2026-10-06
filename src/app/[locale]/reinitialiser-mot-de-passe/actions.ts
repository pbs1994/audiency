"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { routeHref, type Locale } from "@/lib/i18n";

export type UpdatePasswordState = { error: string | null };

export async function updatePassword(
  locale: Locale,
  _prevState: UpdatePasswordState,
  formData: FormData
): Promise<UpdatePasswordState> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (password.length < 6) {
    return {
      error:
        locale === "fr"
          ? "Le mot de passe doit contenir au moins 6 caractères."
          : "Password must be at least 6 characters.",
    };
  }
  if (password !== confirm) {
    return { error: locale === "fr" ? "Les mots de passe ne correspondent pas." : "Passwords don't match." };
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return {
      error:
        locale === "fr"
          ? "Lien expiré ou invalide. Demandez un nouveau lien de réinitialisation."
          : "Expired or invalid link. Request a new reset link.",
    };
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: error.message };

  redirect(routeHref(locale, "account"));
}
