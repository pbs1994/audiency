import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Conditions d’utilisation | Audiency",
};

const SECTIONS = [
  {
    title: "1. Acceptation des conditions",
    body: "En accédant au site Audiency et en utilisant ses services, vous acceptez d’être lié par les présentes conditions d’utilisation. Si vous n’acceptez pas ces conditions, veuillez ne pas utiliser nos services.",
  },
  {
    title: "2. Description du service",
    body: "Audiency propose des services de croissance pour les réseaux sociaux (abonnés, likes, vues et autres formes d’engagement) provenant de comptes réels et actifs. Les délais de livraison sont donnés à titre indicatif et peuvent varier selon la demande.",
  },
  {
    title: "3. Compte et commandes",
    body: "Vous êtes responsable de l’exactitude des informations fournies lors d’une commande (nom d’utilisateur, URL de publication). Audiency ne demande jamais votre mot de passe et ne requiert aucun accès à votre compte pour livrer ses services.",
  },
  {
    title: "4. Utilisation autorisée",
    body: "Vous vous engagez à utiliser nos services conformément aux lois applicables et à ne pas les détourner à des fins frauduleuses. Audiency se réserve le droit de refuser ou d’annuler toute commande suspecte.",
  },
  {
    title: "5. Limitation de responsabilité",
    body: "Audiency ne peut être tenu responsable des changements apportés par les plateformes tierces (Instagram, TikTok, YouTube, etc.) à leurs algorithmes ou conditions d’utilisation, susceptibles d’affecter les résultats de nos services.",
  },
  {
    title: "6. Modifications",
    body: "Ces conditions peuvent être mises à jour à tout moment. La version en vigueur est celle publiée sur cette page.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Conditions d’utilisation" subtitle="Dernière mise à jour : 1er janvier 2026" />
      <section className="bg-surface">
        <div className="mx-auto max-w-3xl space-y-8 px-5 py-16 sm:px-8">
          {SECTIONS.map((s) => (
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
