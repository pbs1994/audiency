import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { COMPANY } from "@/lib/legal";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export async function generateMetadata(props: PageProps<"/[locale]/confidentialite">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: locale === "fr" ? "Politique de confidentialité | BoostInflu" : "Privacy Policy | BoostInflu" };
}

const SECTIONS = {
  fr: [
    { title: "1. Responsable du traitement", body: `Le responsable du traitement est l’exploitant du site boostinflu.com (${COMPANY.legalForm}), ${COMPANY.address}. Contact : ${COMPANY.email}.` },
    { title: "2. Données collectées", body: "Nous collectons uniquement les informations nécessaires : adresse email et mot de passe (chiffré) de votre compte, nom d’utilisateur ou URL de publication fournis pour chaque commande, historique de commandes et de solde, et les messages que vous nous envoyez. Vos données de paiement (carte, adresse de facturation) sont collectées directement par Paddle et ne transitent pas par nos serveurs." },
    { title: "3. Finalités et bases légales", body: "Vos données servent à exécuter vos commandes et gérer votre compte (exécution du contrat), à répondre à vos demandes et prévenir la fraude (intérêt légitime), à respecter nos obligations comptables et fiscales (obligation légale) et, si vous y avez consenti, à vous envoyer des offres. Nous ne vendons jamais vos données." },
    { title: "4. Destinataires et sous-traitants", body: "Paddle.com Market Limited traite les paiements en tant que revendeur officiel et responsable de traitement indépendant pour les données de transaction (voir sa politique de confidentialité). Notre base de données et l’authentification sont hébergées par Supabase, et le site par notre hébergeur, en tant que sous-traitants. Certains de ces prestataires peuvent traiter des données hors de l’Union européenne, avec des garanties appropriées (clauses contractuelles types ou équivalent)." },
    { title: "5. Aucun accès à vos comptes", body: "BoostInflu ne demande jamais votre mot de passe de réseau social et n’accède à aucun moment à vos comptes sur les réseaux sociaux." },
    { title: "6. Conservation des données", body: "Les données de compte sont conservées tant que votre compte est actif, puis supprimées ou anonymisées. Les données de commande et de facturation sont conservées pendant la durée légale applicable aux pièces comptables (jusqu’à 10 ans). Les messages de support sont conservés jusqu’à 3 ans après le dernier échange." },
    { title: "7. Vos droits", body: `Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité, ainsi que du droit de retirer votre consentement à tout moment. Écrivez-nous à ${COMPANY.email} pour les exercer. Vous pouvez aussi introduire une réclamation auprès de la CNIL (www.cnil.fr).` },
    { title: "8. Cookies et stockage local", body: "Nous utilisons uniquement des cookies et un stockage local strictement nécessaires au fonctionnement du site (session de connexion, panier, préférence de langue). Le paiement Paddle peut déposer ses propres cookies techniques et de prévention de la fraude. Aucun cookie publicitaire tiers n’est utilisé sans votre consentement." },
    { title: "9. Modifications", body: "Nous pouvons mettre à jour cette politique ; la version en vigueur est celle publiée sur cette page." },
  ],
  en: [
    { title: "1. Data controller", body: `The data controller is the operator of boostinflu.com (${COMPANY.legalForm}), ${COMPANY.address}. Contact: ${COMPANY.email}.` },
    { title: "2. Data we collect", body: "We only collect what we need: your account email and (encrypted) password, the username or post URL you provide for each order, your order and balance history, and the messages you send us. Your payment data (card, billing address) is collected directly by Paddle and never passes through our servers." },
    { title: "3. Purposes and legal bases", body: "Your data is used to fulfil your orders and manage your account (performance of a contract), to answer your requests and prevent fraud (legitimate interest), to meet our accounting and tax obligations (legal obligation) and, if you have consented, to send you offers. We never sell your data." },
    { title: "4. Recipients and processors", body: "Paddle.com Market Limited processes payments as our Merchant of Record and as an independent controller for transaction data (see its privacy policy). Our database and authentication are hosted by Supabase, and the site by our hosting provider, as processors. Some of these providers may process data outside the European Union, with appropriate safeguards (standard contractual clauses or equivalent)." },
    { title: "5. No access to your accounts", body: "BoostInflu never asks for your social media password and never accesses your social media accounts." },
    { title: "6. Data retention", body: "Account data is kept while your account is active, then deleted or anonymized. Order and billing data is kept for the statutory period that applies to accounting records (up to 10 years). Support messages are kept for up to 3 years after the last exchange." },
    { title: "7. Your rights", body: `Under the GDPR you have the right to access, rectification, erasure, restriction, objection and portability, and to withdraw consent at any time. Write to ${COMPANY.email} to exercise them. You may also lodge a complaint with the CNIL (www.cnil.fr) or your local supervisory authority.` },
    { title: "8. Cookies and local storage", body: "We only use cookies and local storage strictly necessary for the site to work (login session, cart, language preference). Paddle’s checkout may set its own technical and fraud-prevention cookies. No third-party advertising cookie is used without your consent." },
    { title: "9. Changes", body: "We may update this policy; the version in effect is the one published on this page." },
  ],
};

const T = {
  fr: { title: "Politique de confidentialité", subtitle: `Dernière mise à jour : ${COMPANY.lastUpdated.fr}` },
  en: { title: "Privacy Policy", subtitle: `Last updated: ${COMPANY.lastUpdated.en}` },
};

export default async function PrivacyPage(props: PageProps<"/[locale]/confidentialite">) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  return <LegalDocument title={T[locale].title} subtitle={T[locale].subtitle} sections={SECTIONS[locale]} />;
}
