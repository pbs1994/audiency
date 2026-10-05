"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

const T = {
  fr: {
    login: "Connexion",
    signup: "Inscription",
    name: "Nom",
    namePlaceholder: "Votre nom",
    email: "Email",
    emailPlaceholder: "vous@exemple.fr",
    password: "Mot de passe",
    loginSubmit: "Se connecter",
    signupSubmit: "Créer mon compte",
  },
  en: {
    login: "Log in",
    signup: "Sign up",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@example.com",
    password: "Password",
    loginSubmit: "Log in",
    signupSubmit: "Create my account",
  },
};

export default function LoginTabs({ locale }: { locale: Locale }) {
  const t = T[locale];
  const [tab, setTab] = useState<"login" | "signup">("login");

  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-border bg-surface-soft p-6 shadow-sm">
      <div className="flex rounded-full border border-border bg-surface p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setTab("login")}
          className={`flex-1 rounded-full py-2 transition-colors ${
            tab === "login" ? "gradient-brand text-white" : "text-text-muted"
          }`}
        >
          {t.login}
        </button>
        <button
          type="button"
          onClick={() => setTab("signup")}
          className={`flex-1 rounded-full py-2 transition-colors ${
            tab === "signup" ? "gradient-brand text-white" : "text-text-muted"
          }`}
        >
          {t.signup}
        </button>
      </div>

      <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
        {tab === "signup" && (
          <div>
            <label className="text-sm font-medium text-text">{t.name}</label>
            <input
              type="text"
              required
              className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text focus:border-violet focus:outline-none"
              placeholder={t.namePlaceholder}
            />
          </div>
        )}
        <div>
          <label className="text-sm font-medium text-text">{t.email}</label>
          <input
            type="email"
            required
            className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text focus:border-violet focus:outline-none"
            placeholder={t.emailPlaceholder}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-text">{t.password}</label>
          <input
            type="password"
            required
            className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text focus:border-violet focus:outline-none"
            placeholder="••••••••"
          />
        </div>
        <button type="submit" className="w-full rounded-full gradient-brand py-3 text-sm font-bold text-white">
          {tab === "login" ? t.loginSubmit : t.signupSubmit}
        </button>
      </form>
    </div>
  );
}
