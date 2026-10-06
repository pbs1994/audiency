"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const T = {
  fr: {
    sentTitle: "Message envoyé",
    sentBody: "Notre équipe vous répondra sous 24 heures ouvrées.",
    name: "Nom",
    namePlaceholder: "Votre nom",
    email: "Email",
    emailPlaceholder: "vous@exemple.fr",
    subject: "Sujet",
    subjects: ["Question sur une commande", "Question avant achat", "Réclamation", "Autre"],
    message: "Message",
    messagePlaceholder: "Décrivez votre demande...",
    send: "Envoyer le message",
  },
  en: {
    sentTitle: "Message sent",
    sentBody: "Our team will get back to you within 24 business hours.",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@example.com",
    subject: "Subject",
    subjects: ["Question about an order", "Question before buying", "Claim", "Other"],
    message: "Message",
    messagePlaceholder: "Describe your request...",
    send: "Send message",
  },
};

export default function ContactForm({ locale }: { locale: Locale }) {
  const t = T[locale];
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-green/30 bg-green/5 p-6">
        <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-green" />
        <div>
          <p className="font-semibold text-text">{t.sentTitle}</p>
          <p className="mt-1 text-sm text-text-muted">{t.sentBody}</p>
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
            {t.name}
          </label>
          <input
            id="name"
            type="text"
            required
            className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-violet focus:outline-none"
            placeholder={t.namePlaceholder}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-text" htmlFor="email">
            {t.email}
          </label>
          <input
            id="email"
            type="email"
            required
            className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-violet focus:outline-none"
            placeholder={t.emailPlaceholder}
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-text" htmlFor="subject">
          {t.subject}
        </label>
        <select
          id="subject"
          className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text focus:border-violet focus:outline-none"
        >
          {t.subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-text" htmlFor="message">
          {t.message}
        </label>
        <textarea
          id="message"
          required
          rows={5}
          className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-violet focus:outline-none"
          placeholder={t.messagePlaceholder}
        />
      </div>
      <button
        type="submit"
        className="rounded-full gradient-brand px-7 py-3 text-sm font-bold text-white"
      >
        {t.send}
      </button>
    </form>
  );
}
