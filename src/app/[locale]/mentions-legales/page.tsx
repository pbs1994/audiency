import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { COMPANY, PADDLE_TERMS_URL } from "@/lib/legal";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export async function generateMetadata(props: PageProps<"/[locale]/mentions-legales">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: locale === "fr" ? "Mentions légales | BoostInflu" : "Legal Notice | BoostInflu" };
}

const SECTIONS = {
  fr: [
    { title: "Éditeur du site", body: `${COMPANY.legalForm}. Adresse : ${COMPANY.address}. Immatriculation : ${COMPANY.registration}.` },
    { title: "Contact", body: `Email : ${COMPANY.email}.` },
    { title: "Hébergeur", body: COMPANY.host },
    { title: "Paiement", body: `Les paiements sont traités par Paddle.com Market Limited, revendeur officiel (Merchant of Record) de nos services. Conditions d’achat : ${PADDLE_TERMS_URL}.` },
  ],
  en: [
    { title: "Site publisher", body: `${COMPANY.legalForm}. Address: ${COMPANY.address}. Registration: ${COMPANY.registration}.` },
    { title: "Contact", body: `Email: ${COMPANY.email}.` },
    { title: "Hosting provider", body: COMPANY.host },
    { title: "Payment", body: `Payments are processed by Paddle.com Market Limited, the Merchant of Record for our services. Buyer terms: ${PADDLE_TERMS_URL}.` },
  ],
};

const T = {
  fr: { title: "Mentions légales", subtitle: `Dernière mise à jour : ${COMPANY.lastUpdated.fr}` },
  en: { title: "Legal Notice", subtitle: `Last updated: ${COMPANY.lastUpdated.en}` },
};

export default async function LegalNoticePage(props: PageProps<"/[locale]/mentions-legales">) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  return <LegalDocument title={T[locale].title} subtitle={T[locale].subtitle} sections={SECTIONS[locale]} />;
}
