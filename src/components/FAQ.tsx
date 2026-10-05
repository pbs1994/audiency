"use client";

import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import SectionBadge from "./SectionBadge";
import type { Locale } from "@/lib/i18n";

const ITEMS = {
  fr: [
    { q: "Les abonnés et les likes sont-ils réels ?", a: "Oui. Chaque interaction provient d’un compte actif et authentique. Nous ne travaillons pas avec des robots." },
    { q: "En combien de temps vais-je voir des résultats ?", a: "La livraison démarre généralement en moins de 5 minutes après la confirmation du paiement." },
    { q: "Est-ce sans risque d’utiliser BoostInflu ?", a: "Nos méthodes respectent les conditions d’utilisation des plateformes prises en charge." },
    { q: "Proposez-vous un réabonnement si je perds des abonnés ?", a: "Oui, une garantie de réabonnement s’applique sur la plupart des services pendant 30 jours." },
    { q: "Quels moyens de paiement acceptez-vous ?", a: "Carte bancaire, Google Pay et Apple Pay, via un paiement chiffré et sécurisé." },
    { q: "Dois-je communiquer mon mot de passe ?", a: "Non, jamais. Seul votre nom d’utilisateur ou l’URL de votre publication est nécessaire." },
    { q: "Quelles plateformes prenez-vous en charge ?", a: "Instagram, TikTok, YouTube, Facebook, X, Snapchat, Spotify, Telegram, WhatsApp, Twitch, Discord, LinkedIn et Threads." },
    { q: "Puis-je suivre ma commande ?", a: "Oui, un tableau de bord en direct affiche la progression jusqu’à la livraison complète." },
  ],
  en: [
    { q: "Are the followers and likes real?", a: "Yes. Every interaction comes from an active, authentic account. We never work with bots." },
    { q: "How long until I see results?", a: "Delivery usually starts in under 5 minutes after payment confirmation." },
    { q: "Is it safe to use BoostInflu?", a: "Our methods comply with the terms of service of every platform we support." },
    { q: "Do you offer a refill if I lose followers?", a: "Yes, a refill guarantee applies to most services for 30 days." },
    { q: "What payment methods do you accept?", a: "Credit card, Google Pay and Apple Pay, via encrypted, secure payment." },
    { q: "Do I need to share my password?", a: "No, never. Only your username or the URL of your post is needed." },
    { q: "Which platforms do you support?", a: "Instagram, TikTok, YouTube, Facebook, X, Snapchat, Spotify, Telegram, WhatsApp, Twitch, Discord, LinkedIn and Threads." },
    { q: "Can I track my order?", a: "Yes, a live dashboard shows progress all the way through to full delivery." },
  ],
};

const T = {
  fr: {
    badge: "FAQ",
    heading: "Questions ",
    headingAccent: "fréquentes",
    subtitle: "Tout ce qu’il faut savoir sur nos services de croissance sociale.",
  },
  en: {
    badge: "FAQ",
    heading: "Frequently asked ",
    headingAccent: "questions",
    subtitle: "Everything you need to know about our social growth services.",
  },
};

export default function FAQ({ locale }: { locale: Locale }) {
  const t = T[locale];
  const items = ITEMS[locale];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-surface-soft">
      <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
        <SectionBadge icon={MessageCircleQuestion}>{t.badge}</SectionBadge>
        <h2 className="mt-5 text-3xl font-extrabold text-text sm:text-4xl">
          {t.heading}
          <span className="gradient-brand-text">{t.headingAccent}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-text-muted">{t.subtitle}</p>

        <div className="mt-10 space-y-3 text-left">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="rounded-2xl border border-border bg-surface shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-text">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-violet transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <p className="px-5 pb-4 text-sm leading-relaxed text-text-muted">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
