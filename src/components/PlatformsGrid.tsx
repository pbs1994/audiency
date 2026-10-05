import { Globe } from "lucide-react";
import SectionBadge from "./SectionBadge";
import PlatformLogo from "./PlatformLogo";
import { PLATFORMS } from "@/lib/platforms";
import { platformHref, type Locale } from "@/lib/i18n";

const TOP_SLUGS = new Set(["instagram", "tiktok"]);

const T = {
  fr: {
    badge: "Toutes les plateformes",
    heading: "Développez-vous sur ",
    headingAccent: "chaque plateforme",
    subtitle: "BoostInflu prend en charge 9 réseaux sociaux avec un engagement réel provenant de comptes authentiques.",
    top: "Top vente",
    viewServices: "Voir les services",
  },
  en: {
    badge: "All platforms",
    heading: "Grow on ",
    headingAccent: "every platform",
    subtitle: "BoostInflu supports 9 social networks with real engagement from authentic accounts.",
    top: "Top seller",
    viewServices: "View services",
  },
};

export default function PlatformsGrid({ locale }: { locale: Locale }) {
  const t = T[locale];

  return (
    <section id="plateformes" className="bg-surface-soft">
      <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8">
        <SectionBadge icon={Globe}>{t.badge}</SectionBadge>
        <h2 className="mt-5 text-3xl font-extrabold text-text sm:text-4xl">
          {t.heading}
          <span className="gradient-brand-text">{t.headingAccent}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-text-muted">{t.subtitle}</p>

        <div className="mt-14 grid gap-5 text-left sm:grid-cols-3">
          {PLATFORMS.map((platform) => (
            <div key={platform.slug} className="relative rounded-2xl border border-border bg-surface p-6 shadow-sm">
              {TOP_SLUGS.has(platform.slug) && (
                <span className="absolute right-4 top-4 rounded-full bg-orange/10 px-2.5 py-1 text-[11px] font-bold text-orange">
                  {t.top}
                </span>
              )}
              <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-surface-soft">
                <PlatformLogo name={platform.logoName} size={44} />
              </span>
              <p className="mt-4 font-bold text-text">{locale === "fr" ? platform.name : platform.nameEn}</p>
              <a href={platformHref(locale, platform.slug)} className="mt-1 inline-block text-sm font-medium text-violet">
                {t.viewServices}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
