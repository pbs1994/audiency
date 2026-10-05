import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PlatformLogo from "@/components/PlatformLogo";
import { PLATFORMS } from "@/lib/platforms";
import { LOCALES, DEFAULT_LOCALE, platformHref, type Locale } from "@/lib/i18n";

const BASE_URL = "https://boostinflu.fr";

export async function generateMetadata(props: PageProps<"/[locale]/plateformes">): Promise<Metadata> {
  const { locale } = await props.params;
  const fr = locale === "fr";
  return {
    title: fr ? "Toutes les plateformes | BoostInflu" : "All Platforms | BoostInflu",
    description: fr
      ? "Développez votre audience sur 9 réseaux sociaux avec BoostInflu."
      : "Grow your audience on 9 social networks with BoostInflu.",
    alternates: {
      languages: { fr: `${BASE_URL}/plateformes`, en: `${BASE_URL}/en/platforms` },
    },
  };
}

const T = {
  fr: { title: "Toutes les plateformes", subtitle: "Choisissez votre réseau social pour voir la liste complète des services disponibles." },
  en: { title: "All Platforms", subtitle: "Choose your social network to see the full list of available services." },
};

export default async function PlatformsIndexPage(props: PageProps<"/[locale]/plateformes">) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  const t = T[locale];

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />
      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-3">
            {PLATFORMS.map((p) => (
              <Link
                key={p.slug}
                href={platformHref(locale, p.slug)}
                className="rounded-2xl border border-border bg-surface-soft p-6 shadow-sm transition-colors hover:border-violet/40"
              >
                <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-surface">
                  <PlatformLogo name={p.logoName} size={44} />
                </span>
                <p className="mt-4 font-bold text-text">{locale === "fr" ? p.name : p.nameEn}</p>
                <p className="mt-1 text-sm text-text-muted">{locale === "fr" ? p.tagline : p.taglineEn}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
