import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Politique de remboursement | Audiency",
};

const SECTIONS = [
  {
    title: "1. Garantie de 30 jours",
    body: "Si vous n’êtes pas satisfait d’une commande, vous disposez de 30 jours à compter de la date d’achat pour demander un remboursement intégral.",
  },
  {
    title: "2. Garantie de réabonnement",
    body: "Pour les services d’abonnés, si vous constatez une baisse après la livraison, nous relivrons gratuitement la différence pendant la période de garantie indiquée sur chaque service.",
  },
  {
    title: "3. Commandes non livrées",
    body: "Si une commande n’a pas démarré dans les 24 heures suivant le paiement, contactez notre support : elle sera relancée en priorité ou intégralement remboursée.",
  },
  {
    title: "4. Comment demander un remboursement",
    body: "Rendez-vous sur la page Suivi de commande ou contactez-nous via le formulaire de contact avec votre numéro de commande. Le remboursement est traité sous 5 jours ouvrés sur le moyen de paiement utilisé.",
  },
  {
    title: "5. Exceptions",
    body: "Les commandes dont le compte ou la publication a été supprimé, rendu privé, ou qui enfreignent les conditions d’utilisation des plateformes concernées ne sont pas éligibles au remboursement.",
  },
];

export default function RefundPage() {
  return (
    <>
      <PageHeader title="Politique de remboursement" subtitle="Dernière mise à jour : 1er janvier 2026" />
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
