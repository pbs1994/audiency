import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { COMPANY } from "@/lib/legal";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export async function generateMetadata(props: PageProps<"/[locale]/remboursement">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: locale === "fr" ? "Politique de remboursement | BoostInflu" : "Refund Policy | BoostInflu" };
}

const SECTIONS = {
  fr: [
    { title: "1. Garantie de 30 jours", body: "Si vous n’êtes pas satisfait d’une commande, vous disposez de 30 jours à compter de la date d’achat pour demander un remboursement intégral. Cette garantie commerciale s’ajoute à vos droits légaux de consommateur, qu’elle ne remplace pas." },
    { title: "2. Garantie de réabonnement", body: "Pour les services d’abonnés, si vous constatez une baisse après la livraison, nous relivrons gratuitement la différence pendant la période de garantie indiquée sur chaque service." },
    { title: "3. Commandes non livrées", body: "Si une commande n’a pas démarré dans les 24 heures suivant le paiement, contactez notre support : elle sera relancée en priorité ou intégralement remboursée." },
    { title: "4. Comment demander un remboursement", body: `Rendez-vous sur la page Suivi de commande ou contactez-nous à ${COMPANY.email} (ou via le formulaire de contact) avec votre numéro de commande. Une fois la demande acceptée, le remboursement est effectué sur le moyen de paiement utilisé ; il est traité par Paddle, notre revendeur officiel, généralement sous 5 à 10 jours ouvrés selon votre banque.` },
    { title: "5. Droit de rétractation", body: "Nos services étant des services numériques exécutés dès la validation de la commande, le droit légal de rétractation de 14 jours s’éteint une fois le service pleinement exécuté, avec votre accord exprès donné lors de la commande (voir les conditions d’utilisation). La garantie de 30 jours ci-dessus reste applicable selon ses propres conditions." },
    { title: "6. Exceptions", body: "Les commandes dont le compte ou la publication a été supprimé, rendu privé pendant la livraison, ou dont l’identifiant fourni était erroné, ainsi que celles qui enfreignent les conditions d’utilisation des plateformes concernées, ne sont pas éligibles au remboursement." },
    { title: "7. Litiges de paiement", body: "Avant de contester un paiement auprès de votre banque, contactez-nous : nous traitons les demandes rapidement. Les journaux d’exécution des commandes sont conservés et peuvent servir de preuve dans le cadre d’un litige." },
  ],
  en: [
    { title: "1. 30-day guarantee", body: "If you're not satisfied with an order, you have 30 days from the purchase date to request a full refund. This commercial guarantee is in addition to your statutory consumer rights and does not replace them." },
    { title: "2. Refill guarantee", body: "For follower services, if you notice a drop after delivery, we will refill the difference for free during the guarantee period shown on each service." },
    { title: "3. Undelivered orders", body: "If an order hasn't started within 24 hours of payment, contact our support: it will be prioritized for delivery or fully refunded." },
    { title: "4. How to request a refund", body: `Go to the Track Order page or contact us at ${COMPANY.email} (or via the contact form) with your order number. Once a request is accepted, the refund goes to the original payment method; it is processed by Paddle, our Merchant of Record, usually within 5 to 10 business days depending on your bank.` },
    { title: "5. Right of withdrawal", body: "As our services are digital services performed as soon as the order is confirmed, the statutory 14-day right of withdrawal ends once the service has been fully performed, with your express consent given when ordering (see the terms of service). The 30-day guarantee above remains available under its own conditions." },
    { title: "6. Exceptions", body: "Orders where the account or post was deleted, made private during delivery, or where the identifier provided was incorrect, as well as orders that violate the relevant platform's terms of service, are not eligible for a refund." },
    { title: "7. Payment disputes", body: "Before disputing a payment with your bank, please contact us: we handle requests quickly. Order delivery logs are kept and may be used as evidence in a dispute." },
  ],
};

const T = {
  fr: { title: "Politique de remboursement", subtitle: `Dernière mise à jour : ${COMPANY.lastUpdated.fr}` },
  en: { title: "Refund Policy", subtitle: `Last updated: ${COMPANY.lastUpdated.en}` },
};

export default async function RefundPage(props: PageProps<"/[locale]/remboursement">) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  return <LegalDocument title={T[locale].title} subtitle={T[locale].subtitle} sections={SECTIONS[locale]} />;
}
