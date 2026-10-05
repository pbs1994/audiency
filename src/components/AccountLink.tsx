"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useLocale } from "@/lib/locale-context";
import { routeHref } from "@/lib/i18n";

const T = {
  fr: { login: "Connexion", account: "Mon compte" },
  en: { login: "Login", account: "My account" },
};

export default function AccountLink({ onNavigate }: { onNavigate?: () => void }) {
  const locale = useLocale();
  const t = T[locale];
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setLoggedIn(!!data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session?.user);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <Link
      href={routeHref(locale, loggedIn ? "account" : "login")}
      onClick={onNavigate}
      className="flex items-center gap-1.5 text-sm font-medium text-text hover:text-violet"
    >
      <User size={16} /> {loggedIn ? t.account : t.login}
    </Link>
  );
}
