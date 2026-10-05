import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import OrderLookup from "./OrderLookup";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export async function generateMetadata(props: PageProps<"/[locale]/suivi-commande">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: locale === "fr" ? "Suivre ma commande | BoostInflu" : "Track My Order | BoostInflu" };
}

const T = {
  fr: { title: "Suivre ma commande", subtitle: "Entrez votre numéro de commande pour voir sa progression en direct." },
  en: { title: "Track my order", subtitle: "Enter your order number to see its progress live." },
};

export default async function TrackOrderPage(props: PageProps<"/[locale]/suivi-commande">) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  const t = T[locale];

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />
      <section className="bg-surface">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
          <OrderLookup locale={locale} />
        </div>
      </section>
    </>
  );
}
