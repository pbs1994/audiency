import type { Locale } from "@/lib/i18n";

const T = {
  fr: {
    heading: "Prêt à devenir viral ?",
    subtitle: "Rejoignez des milliers de créateurs qui ont transformé leur présence sociale avec BoostInflu. Démarrez votre croissance aujourd’hui.",
    cta: "Démarrer maintenant",
    points: ["Démarrage immédiat", "Satisfait ou remboursé", "Aucun mot de passe requis"],
  },
  en: {
    heading: "Ready to go viral?",
    subtitle: "Join thousands of creators who transformed their social presence with BoostInflu. Start your growth today.",
    cta: "Start now",
    points: ["Instant start", "Money-back guarantee", "No password required"],
  },
};

export default function FinalCTA({ locale }: { locale: Locale }) {
  const t = T[locale];

  return (
    <section className="gradient-brand">
      <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{t.heading}</h2>
        <p className="mx-auto mt-4 max-w-md text-white/85">{t.subtitle}</p>
        <a
          href="#tarifs"
          className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-bold text-violet shadow-sm"
        >
          {t.cta}
        </a>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/85">
          {t.points.map((p) => (
            <span key={p} className="flex items-center gap-1.5">
              ✓ {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
