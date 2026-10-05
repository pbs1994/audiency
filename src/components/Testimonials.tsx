import { Heart, Star, BadgeCheck } from "lucide-react";
import SectionBadge from "./SectionBadge";
import type { Locale } from "@/lib/i18n";

const QUOTES = {
  fr: [
    { initial: "C", name: "Camille R.", role: "Créatrice mode", quote: "2 480 nouveaux abonnés Instagram en deux semaines ! Qualité incroyable et livraison rapide.", followers: "94K abonnés" },
    { initial: "Y", name: "Yanis B.", role: "Créateur de contenu", quote: "Mes vidéos TikTok ont explosé après BoostInflu. Toutes les vues venaient de vraies personnes !", followers: "61K abonnés" },
    { initial: "L", name: "Lauriane M.", role: "Blogueuse lifestyle", quote: "Le meilleur investissement pour développer sa présence sociale. Prix plus bas que partout ailleurs.", followers: "38K abonnés" },
    { initial: "K", name: "Karim D.", role: "Fondateur e-commerce", quote: "BoostInflu a fait décoller ma marque du jour au lendemain. Engagement réel, je recommande vivement.", followers: "210K abonnés" },
  ],
  en: [
    { initial: "C", name: "Camille R.", role: "Fashion creator", quote: "2,480 new Instagram followers in two weeks! Incredible quality and fast delivery.", followers: "94K followers" },
    { initial: "Y", name: "Yanis B.", role: "Content creator", quote: "My TikTok videos exploded after BoostInflu. Every view came from real people!", followers: "61K followers" },
    { initial: "L", name: "Lauriane M.", role: "Lifestyle blogger", quote: "The best investment for growing your social presence. Lower prices than anywhere else.", followers: "38K followers" },
    { initial: "K", name: "Karim D.", role: "E-commerce founder", quote: "BoostInflu took my brand off overnight. Real engagement, highly recommend.", followers: "210K followers" },
  ],
};

const TRUST = [
  { name: "Trustpilot", score: "4.8/5" },
  { name: "Google", score: "4.9/5" },
  { name: "Sitejabber", score: "4.7/5" },
  { name: "Reviews.io", score: "4.8/5" },
];

const T = {
  fr: {
    badge: "L’amour de nos clients",
    heading: "Ce que disent nos ",
    headingAccent: "clients",
    subtitle: "Rejoignez des milliers de créateurs satisfaits qui ont développé leur présence sociale avec BoostInflu.",
    trustedBy: "Approuvé par des créateurs du monde entier",
    googleLabel: "Avis Google",
  },
  en: {
    badge: "Our customers love us",
    heading: "What our ",
    headingAccent: "customers say",
    subtitle: "Join thousands of happy creators who grew their social presence with BoostInflu.",
    trustedBy: "Trusted by creators worldwide",
    googleLabel: "Google Reviews",
  },
};

export default function Testimonials({ locale }: { locale: Locale }) {
  const t = T[locale];
  const quotes = QUOTES[locale];

  return (
    <section id="avis" className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8">
        <SectionBadge icon={Heart} tone="rose">
          {t.badge}
        </SectionBadge>
        <h2 className="mt-5 text-3xl font-extrabold text-text sm:text-4xl">
          {t.heading}
          <span className="gradient-brand-text">{t.headingAccent}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-text-muted">{t.subtitle}</p>

        <div className="mt-14 grid gap-6 text-left sm:grid-cols-2">
          {quotes.map((q, i) => (
            <div
              key={q.name}
              className={`rounded-2xl border border-border bg-surface-soft p-6 shadow-sm ${
                i % 2 === 1 ? "sm:mt-8" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full gradient-brand text-sm font-bold text-white">
                  {q.initial}
                </span>
                <div>
                  <p className="flex items-center gap-1 font-bold text-text">
                    {q.name} <BadgeCheck size={15} className="text-teal" />
                  </p>
                  <p className="text-xs text-text-muted">{q.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-text">{q.quote}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-0.5 text-orange">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-xs text-text-muted">{q.followers}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-16 text-xs font-semibold uppercase tracking-wide text-text-muted">{t.trustedBy}</p>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {TRUST.map((trust) => (
            <div key={trust.name} className="rounded-xl border border-border bg-surface-soft px-4 py-4">
              <p className="text-sm font-bold text-text">
                {trust.name === "Google" ? t.googleLabel : trust.name}
              </p>
              <div className="mt-1 flex justify-center gap-0.5 text-orange">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-1 text-xs text-text-muted">{trust.score}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
