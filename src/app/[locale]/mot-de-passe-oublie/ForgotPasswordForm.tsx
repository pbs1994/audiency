"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { requestPasswordReset, type ForgotPasswordState } from "./actions";
import type { Locale } from "@/lib/i18n";

const T = {
  fr: {
    email: "Email",
    emailPlaceholder: "vous@exemple.fr",
    submit: "Envoyer le lien de réinitialisation",
    pending: "Envoi…",
    sent: "Si un compte existe avec cette adresse, un lien de réinitialisation vient de lui être envoyé.",
  },
  en: {
    email: "Email",
    emailPlaceholder: "you@example.com",
    submit: "Send reset link",
    pending: "Sending…",
    sent: "If an account exists for that address, a reset link was just sent to it.",
  },
};

const INITIAL_STATE: ForgotPasswordState = { sent: false };

export default function ForgotPasswordForm({ locale }: { locale: Locale }) {
  const t = T[locale];
  const [state, formAction, pending] = useActionState(
    requestPasswordReset.bind(null, locale),
    INITIAL_STATE
  );

  if (state.sent) {
    return (
      <div className="mx-auto flex max-w-sm items-start gap-3 rounded-xl border border-green/30 bg-green/10 p-4">
        <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-green" />
        <p className="text-sm text-text">{t.sent}</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="mx-auto max-w-sm space-y-4 rounded-2xl border border-border bg-surface-soft p-6 shadow-sm"
    >
      <div>
        <label className="text-sm font-medium text-text" htmlFor="email">
          {t.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text focus:border-violet focus:outline-none"
          placeholder={t.emailPlaceholder}
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full gradient-brand py-3 text-sm font-bold text-white disabled:opacity-60"
      >
        {pending ? t.pending : t.submit}
      </button>
    </form>
  );
}
