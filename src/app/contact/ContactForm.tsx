"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-green/30 bg-green/5 p-6">
        <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-green" />
        <div>
          <p className="font-semibold text-text">Message envoyé</p>
          <p className="mt-1 text-sm text-text-muted">
            Notre équipe vous répondra sous 24 heures ouvrées.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-text" htmlFor="name">
            Nom
          </label>
          <input
            id="name"
            type="text"
            required
            className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-violet focus:outline-none"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-text" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-violet focus:outline-none"
            placeholder="vous@exemple.fr"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-text" htmlFor="subject">
          Sujet
        </label>
        <select
          id="subject"
          className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text focus:border-violet focus:outline-none"
        >
          <option>Question sur une commande</option>
          <option>Question avant achat</option>
          <option>Remboursement</option>
          <option>Autre</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-text" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-violet focus:outline-none"
          placeholder="Décrivez votre demande..."
        />
      </div>
      <button
        type="submit"
        className="rounded-full gradient-brand px-7 py-3 text-sm font-bold text-white"
      >
        Envoyer le message
      </button>
    </form>
  );
}
