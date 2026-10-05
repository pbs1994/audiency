import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Politique de confidentialité | BoostInflu",
};

const SECTIONS = [
  {
    title: "1. Données collectées",
    body: "Nous collectons uniquement les informations nécessaires au traitement de votre commande : adresse email, nom d’utilisateur ou URL de publication, et données de paiement traitées par nos prestataires sécurisés.",
  },
  {
    title: "2. Utilisation des données",
    body: "Vos données sont utilisées pour traiter vos commandes, vous contacter en cas de besoin, et améliorer nos services. Nous ne vendons jamais vos données à des tiers.",
  },
  {
    title: "3. Aucun accès à vos comptes",
    body: "BoostInflu ne demande jamais votre mot de passe et n’accède à aucun moment à vos comptes sur les réseaux sociaux.",
  },
  {
    title: "4. Conservation des données",
    body: "Vos données sont conservées pour la durée nécessaire au traitement de votre commande et au respect de nos obligations légales, puis supprimées ou anonymisées.",
  },
  {
    title: "5. Vos droits",
    body: "Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression de vos données personnelles. Contactez-nous à contact@boostinflu.fr pour exercer ces droits.",
  },
  {
    title: "6. Cookies",
    body: "Nous utilisons des cookies strictement nécessaires au fonctionnement du site (panier, préférences de langue). Aucun cookie publicitaire tiers n’est utilisé sans votre consentement.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Politique de confidentialité" subtitle="Dernière mise à jour : 1er janvier 2026" />
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
