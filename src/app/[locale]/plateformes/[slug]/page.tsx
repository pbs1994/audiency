import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Zap, RefreshCcw } from "lucide-react";
import { PLATFORMS, getPlatform } from "@/lib/platforms";
import PlatformLogo from "@/components/PlatformLogo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Price from "@/components/Price";
import { soldLabel } from "@/lib/price";
import { LOCALES, DEFAULT_LOCALE, routeHref, platformHref, serviceHref, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return PLATFORMS.map((p) => ({ slug: p.slug }));
}

const BASE_URL = "https://boostinflu.com";

export async function generateMetadata(
  props: PageProps<"/[locale]/plateformes/[slug]">
): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const platform = getPlatform(slug);
  if (!platform) return {};
  const fr = locale === "fr";
  return {
    title: fr
      ? `${platform.name} — Abonnés, vues et likes réels | BoostInflu`
      : `${platform.nameEn} — Real Followers, Views and Likes | BoostInflu`,
    description: fr ? platform.description : platform.descriptionEn,
    alternates: {
      languages: {
        fr: `${BASE_URL}${platformHref("fr", slug)}`,
        en: `${BASE_URL}${platformHref("en", slug)}`,
      },
    },
  };
}

const T = {
  fr: {
    home: "Accueil",
    platforms: "Plateformes",
    availableServices: "Services disponibles",
    bestPack: "MEILLEUR PACK",
    viewService: "Voir le service",
    instant: "Livraison instantanée.",
    instantBody: "Démarrage en quelques minutes.",
    noPassword: "Sans mot de passe.",
    noPasswordBody: "Seul votre nom d’utilisateur est nécessaire.",
    guarantee: "Garantie 30 jours.",
    guaranteeBody: "Réabonnement ou remboursement.",
    ctaHeading: (name: string) => `Prêt à développer votre ${name} ?`,
    ctaButton: "Commencer maintenant",
    otherPlatforms: "Autres plateformes",
  },
  en: {
    home: "Home",
    platforms: "Platforms",
    availableServices: "Available services",
    bestPack: "BEST PACK",
    viewService: "View service",
    instant: "Instant delivery.",
    instantBody: "Starts within minutes.",
    noPassword: "No password.",
    noPasswordBody: "Only your username is needed.",
    guarantee: "30-day guarantee.",
    guaranteeBody: "Refill or refund.",
    ctaHeading: (name: string) => `Ready to grow your ${name}?`,
    ctaButton: "Start now",
    otherPlatforms: "Other platforms",
  },
};

export default async function PlatformPage(props: PageProps<"/[locale]/plateformes/[slug]">) {
  const { locale: rawLocale, slug } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(rawLocale) ? (rawLocale as Locale) : DEFAULT_LOCALE;
  const platform = getPlatform(slug);
  if (!platform) notFound();

  const t = T[locale];
  const fr = locale === "fr";
  const platformName = fr ? platform.name : platform.nameEn;

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: t.home, href: routeHref(locale, "home") },
          { label: t.platforms, href: routeHref(locale, "platforms") },
          { label: platformName },
        ]}
      />

      <div className="border-b border-border bg-surface-soft">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-surface shadow-sm">
              <PlatformLogo name={platform.logoName} size={48} />
            </span>
            <div>
              <p className="text-sm font-semibold text-violet">{fr ? platform.tagline : platform.taglineEn}</p>
              <h1 className="text-3xl font-extrabold text-text sm:text-4xl">{platformName}</h1>
            </div>
          </div>
          <p className="mt-5 max-w-xl text-text-muted">{fr ? platform.description : platform.descriptionEn}</p>
        </div>
      </div>

      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
          <h2 className="text-xl font-bold text-text">{t.availableServices}</h2>

          <div className="mt-6 divide-y divide-border border-y border-border">
            {platform.services.map((service) => {
              const href = serviceHref(locale, platform.slug, service.slug, service.slugEn);
              return (
                <div
                  key={service.slug}
                  className={`flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between ${
                    service.highlight ? "border-l-2 border-l-violet pl-4" : ""
                  }`}
                >
                  <div>
                    <Link href={href} className="font-semibold text-text hover:text-violet">
                      {fr ? service.name : service.nameEn}
                      {service.highlight && (
                        <span className="ml-3 rounded-full bg-violet/10 px-2.5 py-0.5 align-middle text-[11px] font-bold text-violet">
                          {t.bestPack}
                        </span>
                      )}
                    </Link>
                    <p className="text-sm text-text-muted">{fr ? service.detail : service.detailEn}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg font-extrabold gradient-brand-text">
                        <Price amountEUR={service.priceEUR} />
                      </p>
                      <p className="text-xs text-text-muted">{soldLabel(service.sold, locale)}</p>
                    </div>
                    <Link href={href} className="shrink-0 rounded-full gradient-brand px-5 py-2.5 text-sm font-bold text-white">
                      {t.viewService}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <Zap size={18} className="mt-0.5 shrink-0 text-teal" />
              <p className="text-sm text-text-muted">
                <span className="font-semibold text-text">{t.instant}</span> {t.instantBody}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-violet" />
              <p className="text-sm text-text-muted">
                <span className="font-semibold text-text">{t.noPassword}</span> {t.noPasswordBody}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCcw size={18} className="mt-0.5 shrink-0 text-green" />
              <p className="text-sm text-text-muted">
                <span className="font-semibold text-text">{t.guarantee}</span> {t.guaranteeBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="gradient-brand">
        <div className="mx-auto max-w-4xl px-5 py-14 text-center sm:px-8">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">{t.ctaHeading(platformName)}</h2>
          <Link
            href={routeHref(locale, "cart")}
            className="mt-6 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-bold text-violet shadow-sm"
          >
            {t.ctaButton}
          </Link>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <h2 className="text-lg font-bold text-text">{t.otherPlatforms}</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {PLATFORMS.filter((p) => p.slug !== platform.slug).map((p) => (
              <Link
                key={p.slug}
                href={platformHref(locale, p.slug)}
                className="flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm text-text-muted hover:border-violet/40 hover:text-text"
              >
                <PlatformLogo name={p.logoName} size={16} />
                {fr ? p.name : p.nameEn}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
