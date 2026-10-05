"use client";

import { signOut } from "@/app/[locale]/connexion/actions";
import type { Locale } from "@/lib/i18n";

const LABEL = { fr: "Se déconnecter", en: "Log out" };

export default function SignOutButton({ locale }: { locale: Locale }) {
  return (
    <button
      type="button"
      onClick={() => signOut(locale)}
      className="text-sm font-medium text-text-muted hover:text-rose"
    >
      {LABEL[locale]}
    </button>
  );
}
