import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import HashtagGenerator from "./HashtagGenerator";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export async function generateMetadata(
  props: PageProps<"/[locale]/outils-gratuits/generateur-hashtags">
): Promise<Metadata> {
  const { locale } = await props.params;
  const fr = locale === "fr";
  return {
    title: fr ? "Générateur de hashtags | BoostInflu" : "Hashtag Generator | BoostInflu",
    description: fr
      ? "Générez des suggestions de hashtags à partir d’un mot-clé."
      : "Generate hashtag suggestions from a keyword.",
  };
}

const T = {
  fr: { title: "Générateur de hashtags", subtitle: "Entrez un mot-clé pour obtenir des suggestions de hashtags à utiliser." },
  en: { title: "Hashtag generator", subtitle: "Enter a keyword to get hashtag suggestions to use." },
};

export default async function HashtagGeneratorPage(
  props: PageProps<"/[locale]/outils-gratuits/generateur-hashtags">
) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  const t = T[locale];

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />
      <section className="bg-surface">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
          <HashtagGenerator locale={locale} />
        </div>
      </section>
    </>
  );
}
