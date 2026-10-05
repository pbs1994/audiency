import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export async function generateMetadata(props: PageProps<"/[locale]/confidentialite">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: locale === "fr" ? "Politique de confidentialité | BoostInflu" : "Privacy Policy | BoostInflu" };
}

const SECTIONS = {
  fr: [
    { title: "1. Données collectées", body: "Nous collectons uniquement les informations nécessaires au traitement de votre commande : adresse email, nom d’utilisateur ou URL de publication, et données de paiement traitées par nos prestataires sécurisés." },
    { title: "2. Utilisation des données", body: "Vos données sont utilisées pour traiter vos commandes, vous contacter en cas de besoin, et améliorer nos services. Nous ne vendons jamais vos données à des tiers." },
    { title: "3. Aucun accès à vos comptes", body: "BoostInflu ne demande jamais votre mot de passe et n’accède à aucun moment à vos comptes sur les réseaux sociaux." },
    { title: "4. Conservation des données", body: "Vos données sont conservées pour la durée nécessaire au traitement de votre commande et au respect de nos obligations légales, puis supprimées ou anonymisées." },
    { title: "5. Vos droits", body: "Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression de vos données personnelles. Contactez-nous à contact@boostinflu.fr pour exercer ces droits." },
    { title: "6. Cookies", body: "Nous utilisons des cookies strictement nécessaires au fonctionnement du site (panier, préférences de langue). Aucun cookie publicitaire tiers n’est utilisé sans votre consentement." },
  ],
  en: [
    { title: "1. Data we collect", body: "We only collect the information needed to process your order: email address, username or post URL, and payment data processed by our secure providers." },
    { title: "2. How we use your data", body: "Your data is used to process your orders, contact you if needed, and improve our services. We never sell your data to third parties." },
    { title: "3. No access to your accounts", body: "BoostInflu never asks for your password and never accesses your social media accounts." },
    { title: "4. Data retention", body: "Your data is kept for as long as needed to process your order and meet our legal obligations, then deleted or anonymized." },
    { title: "5. Your rights", body: "Under GDPR, you have the right to access, correct and delete your personal data. Contact us at contact@boostinflu.fr to exercise these rights." },
    { title: "6. Cookies", body: "We use cookies strictly necessary for the site to function (cart, language preference). No third-party advertising cookie is used without your consent." },
  ],
};

const T = {
  fr: { title: "Politique de confidentialité", subtitle: "Dernière mise à jour : 1er janvier 2026" },
  en: { title: "Privacy Policy", subtitle: "Last updated: January 1, 2026" },
};

export default async function PrivacyPage(props: PageProps<"/[locale]/confidentialite">) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  const t = T[locale];
  const sections = SECTIONS[locale];

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />
      <section className="bg-surface">
        <div className="mx-auto max-w-3xl space-y-8 px-5 py-16 sm:px-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-bold text-text">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
