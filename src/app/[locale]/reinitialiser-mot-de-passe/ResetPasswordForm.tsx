"use client";

import { useActionState } from "react";
import { updatePassword, type UpdatePasswordState } from "./actions";
import type { Locale } from "@/lib/i18n";

const T = {
  fr: {
    password: "Nouveau mot de passe",
    confirm: "Confirmer le mot de passe",
    submit: "Mettre à jour le mot de passe",
    pending: "Un instant…",
  },
  en: {
    password: "New password",
    confirm: "Confirm password",
    submit: "Update password",
    pending: "One moment…",
  },
};

const INITIAL_STATE: UpdatePasswordState = { error: null };

export default function ResetPasswordForm({ locale }: { locale: Locale }) {
  const t = T[locale];
  const [state, formAction, pending] = useActionState(updatePassword.bind(null, locale), INITIAL_STATE);

  return (
    <form
      action={formAction}
      className="mx-auto max-w-sm space-y-4 rounded-2xl border border-border bg-surface-soft p-6 shadow-sm"
    >
      <div>
        <label className="text-sm font-medium text-text" htmlFor="password">
          {t.password}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text focus:border-violet focus:outline-none"
          placeholder="••••••••"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-text" htmlFor="confirm">
          {t.confirm}
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          required
          minLength={6}
          className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text focus:border-violet focus:outline-none"
          placeholder="••••••••"
        />
      </div>

      {state.error && <p className="text-sm font-medium text-rose">{state.error}</p>}

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
