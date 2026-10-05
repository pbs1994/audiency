import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import EngagementCalculator from "./EngagementCalculator";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export async function generateMetadata(
  props: PageProps<"/[locale]/outils-gratuits/calculateur-engagement">
): Promise<Metadata> {
  const { locale } = await props.params;
  const fr = locale === "fr";
  return {
    title: fr ? "Calculateur d’engagement | BoostInflu" : "Engagement Calculator | BoostInflu",
    description: fr
      ? "Calculez votre taux d’engagement Instagram ou TikTok gratuitement."
      : "Calculate your Instagram or TikTok engagement rate for free.",
  };
}

const T = {
  fr: { title: "Calculateur d’engagement", subtitle: "Entrez vos statistiques pour estimer votre taux d’engagement moyen." },
  en: { title: "Engagement calculator", subtitle: "Enter your stats to estimate your average engagement rate." },
};

export default async function EngagementCalculatorPage(
  props: PageProps<"/[locale]/outils-gratuits/calculateur-engagement">
) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  const t = T[locale];

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />
      <section className="bg-surface">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
          <EngagementCalculator locale={locale} />
        </div>
      </section>
    </>
  );
}
