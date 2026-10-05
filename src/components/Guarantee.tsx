import { BadgeDollarSign, Users, ShieldCheck, Zap, ShieldHalf } from "lucide-react";
import SectionBadge from "./SectionBadge";
import type { Locale } from "@/lib/i18n";

const ITEMS = {
  fr: [
    { icon: Users, bg: "bg-teal", title: "100% comptes réels", body: "Chaque interaction provient de comptes réels et actifs." },
    { icon: ShieldCheck, bg: "bg-violet", title: "Sécurisé pour la plateforme", body: "Entièrement conforme aux règles de chaque réseau social." },
    { icon: Zap, bg: "bg-green", title: "Résultats instantanés", body: "Voyez votre croissance démarrer en quelques minutes." },
  ],
  en: [
    { icon: Users, bg: "bg-teal", title: "100% real accounts", body: "Every interaction comes from real, active accounts." },
    { icon: ShieldCheck, bg: "bg-violet", title: "Platform safe", body: "Fully compliant with the rules of every social network." },
    { icon: Zap, bg: "bg-green", title: "Instant results", body: "Watch your growth start within minutes." },
  ],
};

const T = {
  fr: {
    badge: "Meilleure garantie",
    heading: "Prix les plus bas garantis, ",
    headingAccent: "100% réels",
    subtitle: "Des abonnés et un engagement authentiques, à des prix imbattables grâce à notre garantie du meilleur prix.",
    bannerTitle: "Satisfait ou remboursé",
    bannerBody: "Pas satisfait ? Remboursement intégral sous 30 jours.",
  },
  en: {
    badge: "Best guarantee",
    heading: "Lowest prices guaranteed, ",
    headingAccent: "100% real",
    subtitle: "Authentic followers and engagement, at unbeatable prices thanks to our best-price guarantee.",
    bannerTitle: "Satisfaction guaranteed",
    bannerBody: "Not satisfied? Full refund within 30 days.",
  },
};

export default function Guarantee({ locale }: { locale: Locale }) {
  const t = T[locale];
  const items = ITEMS[locale];

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8">
        <SectionBadge icon={BadgeDollarSign} tone="green">
          {t.badge}
        </SectionBadge>
        <h2 className="mt-5 text-3xl font-extrabold text-text sm:text-4xl">
          {t.heading}
          <span className="text-green">{t.headingAccent}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-text-muted">{t.subtitle}</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-surface-soft p-6 text-left">
              <span className={`grid h-12 w-12 place-items-center rounded-xl ${item.bg} text-white`}>
                <item.icon size={22} />
              </span>
              <h3 className="mt-5 font-bold text-text">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-gradient-to-r from-violet to-teal p-10 text-white">
          <ShieldHalf className="mx-auto" size={28} />
          <p className="mt-4 text-xl font-bold">{t.bannerTitle}</p>
          <p className="mt-2 text-sm text-white/80">{t.bannerBody}</p>
        </div>
      </div>
    </section>
  );
}
