"use client";

import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import SectionBadge from "./SectionBadge";

const ITEMS = [
  {
    q: "Les abonnés et les likes sont-ils réels ?",
    a: "Oui. Chaque interaction provient d’un compte actif et authentique. Nous ne travaillons pas avec des robots.",
  },
  {
    q: "En combien de temps vais-je voir des résultats ?",
    a: "La livraison démarre généralement en moins de 5 minutes après la confirmation du paiement.",
  },
  {
    q: "Est-ce sans risque d’utiliser BoostInflu ?",
    a: "Nos méthodes respectent les conditions d’utilisation des plateformes prises en charge.",
  },
  {
    q: "Proposez-vous un réabonnement si je perds des abonnés ?",
    a: "Oui, une garantie de réabonnement s’applique sur la plupart des services pendant 30 jours.",
  },
  {
    q: "Quels moyens de paiement acceptez-vous ?",
    a: "Carte bancaire, Google Pay et Apple Pay, via un paiement chiffré et sécurisé.",
  },
  {
    q: "Dois-je communiquer mon mot de passe ?",
    a: "Non, jamais. Seul votre nom d’utilisateur ou l’URL de votre publication est nécessaire.",
  },
  {
    q: "Quelles plateformes prenez-vous en charge ?",
    a: "Instagram, TikTok, YouTube, Facebook, X, Snapchat, Spotify, Telegram et WhatsApp.",
  },
  {
    q: "Puis-je suivre ma commande ?",
    a: "Oui, un tableau de bord en direct affiche la progression jusqu’à la livraison complète.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-surface-soft">
      <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
        <SectionBadge icon={MessageCircleQuestion}>FAQ</SectionBadge>
        <h2 className="mt-5 text-3xl font-extrabold text-text sm:text-4xl">
          Questions <span className="gradient-brand-text">fréquentes</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-text-muted">
          Tout ce qu’il faut savoir sur nos services de croissance sociale.
        </p>

        <div className="mt-10 space-y-3 text-left">
          {ITEMS.map((item, i) => {
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
