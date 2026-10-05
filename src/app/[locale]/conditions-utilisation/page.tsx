import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export async function generateMetadata(props: PageProps<"/[locale]/conditions-utilisation">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: locale === "fr" ? "Conditions d’utilisation | BoostInflu" : "Terms of Service | BoostInflu" };
}

const SECTIONS = {
  fr: [
    { title: "1. Acceptation des conditions", body: "En accédant au site BoostInflu et en utilisant ses services, vous acceptez d’être lié par les présentes conditions d’utilisation. Si vous n’acceptez pas ces conditions, veuillez ne pas utiliser nos services." },
    { title: "2. Description du service", body: "BoostInflu propose des services de croissance pour les réseaux sociaux (abonnés, likes, vues et autres formes d’engagement) provenant de comptes réels et actifs. Les délais de livraison sont donnés à titre indicatif et peuvent varier selon la demande." },
    { title: "3. Compte et commandes", body: "Vous êtes responsable de l’exactitude des informations fournies lors d’une commande (nom d’utilisateur, URL de publication). BoostInflu ne demande jamais votre mot de passe et ne requiert aucun accès à votre compte pour livrer ses services." },
    { title: "4. Utilisation autorisée", body: "Vous vous engagez à utiliser nos services conformément aux lois applicables et à ne pas les détourner à des fins frauduleuses. BoostInflu se réserve le droit de refuser ou d’annuler toute commande suspecte." },
    { title: "5. Limitation de responsabilité", body: "BoostInflu ne peut être tenu responsable des changements apportés par les plateformes tierces (Instagram, TikTok, YouTube, etc.) à leurs algorithmes ou conditions d’utilisation, susceptibles d’affecter les résultats de nos services." },
    { title: "6. Modifications", body: "Ces conditions peuvent être mises à jour à tout moment. La version en vigueur est celle publiée sur cette page." },
  ],
  en: [
    { title: "1. Acceptance of terms", body: "By accessing the BoostInflu website and using its services, you agree to be bound by these terms of service. If you do not accept these terms, please do not use our services." },
    { title: "2. Service description", body: "BoostInflu offers social media growth services (followers, likes, views and other forms of engagement) from real, active accounts. Delivery times are indicative and may vary depending on demand." },
    { title: "3. Account and orders", body: "You are responsible for the accuracy of the information provided when placing an order (username, post URL). BoostInflu never asks for your password and never requires access to your account to deliver its services." },
    { title: "4. Authorized use", body: "You agree to use our services in accordance with applicable laws and not to misuse them for fraudulent purposes. BoostInflu reserves the right to refuse or cancel any suspicious order." },
    { title: "5. Limitation of liability", body: "BoostInflu cannot be held responsible for changes made by third-party platforms (Instagram, TikTok, YouTube, etc.) to their algorithms or terms of service, which may affect the results of our services." },
    { title: "6. Changes", body: "These terms may be updated at any time. The version in effect is the one published on this page." },
  ],
};

const T = {
  fr: { title: "Conditions d’utilisation", subtitle: "Dernière mise à jour : 1er janvier 2026" },
  en: { title: "Terms of Service", subtitle: "Last updated: January 1, 2026" },
};

export default async function TermsPage(props: PageProps<"/[locale]/conditions-utilisation">) {
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
