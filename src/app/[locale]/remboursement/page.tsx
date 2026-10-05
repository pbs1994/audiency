import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export async function generateMetadata(props: PageProps<"/[locale]/remboursement">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: locale === "fr" ? "Politique de remboursement | BoostInflu" : "Refund Policy | BoostInflu" };
}

const SECTIONS = {
  fr: [
    { title: "1. Garantie de 30 jours", body: "Si vous n’êtes pas satisfait d’une commande, vous disposez de 30 jours à compter de la date d’achat pour demander un remboursement intégral." },
    { title: "2. Garantie de réabonnement", body: "Pour les services d’abonnés, si vous constatez une baisse après la livraison, nous relivrons gratuitement la différence pendant la période de garantie indiquée sur chaque service." },
    { title: "3. Commandes non livrées", body: "Si une commande n’a pas démarré dans les 24 heures suivant le paiement, contactez notre support : elle sera relancée en priorité ou intégralement remboursée." },
    { title: "4. Comment demander un remboursement", body: "Rendez-vous sur la page Suivi de commande ou contactez-nous via le formulaire de contact avec votre numéro de commande. Le remboursement est traité sous 5 jours ouvrés sur le moyen de paiement utilisé." },
    { title: "5. Exceptions", body: "Les commandes dont le compte ou la publication a été supprimé, rendu privé, ou qui enfreignent les conditions d’utilisation des plateformes concernées ne sont pas éligibles au remboursement." },
  ],
  en: [
    { title: "1. 30-day guarantee", body: "If you're not satisfied with an order, you have 30 days from the purchase date to request a full refund." },
    { title: "2. Refill guarantee", body: "For follower services, if you notice a drop after delivery, we will refill the difference for free during the guarantee period shown on each service." },
    { title: "3. Undelivered orders", body: "If an order hasn't started within 24 hours of payment, contact our support: it will be prioritized for delivery or fully refunded." },
    { title: "4. How to request a refund", body: "Go to the Track Order page or contact us via the contact form with your order number. Refunds are processed within 5 business days to the original payment method." },
    { title: "5. Exceptions", body: "Orders where the account or post has been deleted, made private, or that violate the relevant platform's terms of service are not eligible for a refund." },
  ],
};

const T = {
  fr: { title: "Politique de remboursement", subtitle: "Dernière mise à jour : 1er janvier 2026" },
  en: { title: "Refund Policy", subtitle: "Last updated: January 1, 2026" },
};

export default async function RefundPage(props: PageProps<"/[locale]/remboursement">) {
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
