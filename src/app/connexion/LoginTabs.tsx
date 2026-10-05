"use client";

import { useState } from "react";

export default function LoginTabs() {
  const [tab, setTab] = useState<"connexion" | "inscription">("connexion");

  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-border bg-surface-soft p-6 shadow-sm">
      <div className="flex rounded-full border border-border bg-surface p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setTab("connexion")}
          className={`flex-1 rounded-full py-2 transition-colors ${
            tab === "connexion" ? "gradient-brand text-white" : "text-text-muted"
          }`}
        >
          Connexion
        </button>
        <button
          type="button"
          onClick={() => setTab("inscription")}
          className={`flex-1 rounded-full py-2 transition-colors ${
            tab === "inscription" ? "gradient-brand text-white" : "text-text-muted"
          }`}
        >
          Inscription
        </button>
      </div>

      <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
        {tab === "inscription" && (
          <div>
            <label className="text-sm font-medium text-text">Nom</label>
            <input
              type="text"
              required
              className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text focus:border-violet focus:outline-none"
              placeholder="Votre nom"
            />
          </div>
        )}
        <div>
          <label className="text-sm font-medium text-text">Email</label>
          <input
            type="email"
            required
            className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text focus:border-violet focus:outline-none"
            placeholder="vous@exemple.fr"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-text">Mot de passe</label>
          <input
            type="password"
            required
            className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text focus:border-violet focus:outline-none"
            placeholder="••••••••"
          />
        </div>
        <button type="submit" className="w-full rounded-full gradient-brand py-3 text-sm font-bold text-white">
          {tab === "connexion" ? "Se connecter" : "Créer mon compte"}
        </button>
      </form>
    </div>
  );
}
