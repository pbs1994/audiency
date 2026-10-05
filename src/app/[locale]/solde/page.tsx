import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import BalanceView from "./BalanceView";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export async function generateMetadata(props: PageProps<"/[locale]/solde">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: locale === "fr" ? "Mon solde | BoostInflu" : "My Balance | BoostInflu" };
}

const T = {
  fr: { title: "Mon solde", subtitle: "Votre cashback BoostInflu, utilisable sur n’importe quelle commande." },
  en: { title: "My balance", subtitle: "Your BoostInflu cashback, usable on any order." },
};

export default async function BalancePage(props: PageProps<"/[locale]/solde">) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  const t = T[locale];

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />
      <section className="bg-surface">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
          <BalanceView locale={locale} />
        </div>
      </section>
    </>
  );
}
