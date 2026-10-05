import type { Metadata } from "next";
import Link from "next/link";
import { Hash, Percent, MessageSquareText, DollarSign } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { LOCALES, DEFAULT_LOCALE, routeHref, type Locale } from "@/lib/i18n";

export async function generateMetadata(props: PageProps<"/[locale]/outils-gratuits">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: locale === "fr" ? "Outils gratuits | BoostInflu" : "Free Tools | BoostInflu" };
}

const T = {
  fr: {
    title: "Outils gratuits",
    subtitle: "Des outils simples pour vous aider à développer votre audience.",
    soon: "Bientôt",
    tools: [
      { icon: Percent, title: "Calculateur d’engagement", body: "Calculez votre taux d’engagement Instagram ou TikTok à partir de vos statistiques.", key: "engagementCalculator" as const },
      { icon: Hash, title: "Générateur de hashtags", body: "Générez des suggestions de hashtags pertinents à partir d’un mot-clé.", key: "hashtagGenerator" as const },
      { icon: MessageSquareText, title: "Générateur de légendes", body: "Bientôt disponible.", key: null },
      { icon: DollarSign, title: "Calculateur de revenus TikTok", body: "Bientôt disponible.", key: null },
    ],
  },
  en: {
    title: "Free tools",
    subtitle: "Simple tools to help you grow your audience.",
    soon: "Coming soon",
    tools: [
      { icon: Percent, title: "Engagement calculator", body: "Calculate your Instagram or TikTok engagement rate from your stats.", key: "engagementCalculator" as const },
      { icon: Hash, title: "Hashtag generator", body: "Generate relevant hashtag suggestions from a keyword.", key: "hashtagGenerator" as const },
      { icon: MessageSquareText, title: "Caption generator", body: "Coming soon.", key: null },
      { icon: DollarSign, title: "TikTok earnings calculator", body: "Coming soon.", key: null },
    ],
  },
};

export default async function ToolsPage(props: PageProps<"/[locale]/outils-gratuits">) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  const t = T[locale];

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />
      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {t.tools.map((tool) => {
              const href = tool.key ? routeHref(locale, tool.key) : null;
              const card = (
                <div
                  className={`h-full rounded-2xl border border-border bg-surface-soft p-6 shadow-sm ${
                    href ? "transition-colors hover:border-violet/40" : "opacity-60"
                  }`}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet text-white">
                    <tool.icon size={20} />
                  </span>
                  <p className="mt-4 font-bold text-text">{tool.title}</p>
                  <p className="mt-2 text-sm text-text-muted">{tool.body}</p>
                  {!href && (
                    <span className="mt-3 inline-block rounded-full bg-orange/10 px-2.5 py-1 text-xs font-semibold text-orange">
                      {t.soon}
                    </span>
                  )}
                </div>
              );
              return href ? (
                <Link key={tool.title} href={href}>
                  {card}
                </Link>
              ) : (
                <div key={tool.title}>{card}</div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
