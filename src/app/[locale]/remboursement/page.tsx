import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { COMPANY } from "@/lib/legal";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export async function generateMetadata(props: PageProps<"/[locale]/remboursement">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: locale === "fr" ? "Garanties et réclamations | BoostInflu" : "Guarantees & Claims | BoostInflu" };
}

const SECTIONS = {
  fr: [
    { title: "1. Notre engagement", body: "Si vous n’êtes pas satisfait d’une commande, contactez-nous dans les 30 jours suivant l’achat : nous complétons ou relançons la livraison ou, à notre choix, nous vous offrons gratuitement un autre service d’une valeur équivalente." },
    { title: "2. Garantie de réabonnement", body: "Pour les services d’abonnés, si vous constatez une baisse après la livraison, nous relivrons gratuitement la différence pendant la période de garantie indiquée sur chaque service." },
    { title: "3. Commandes non livrées", body: "Si une commande n’a pas démarré dans les 24 heures suivant le paiement, contactez notre support : elle sera relancée en priorité. Si nous ne sommes pas en mesure de la livrer, le montant correspondant vous est remboursé." },
    { title: "4. Comment faire une demande", body: `Rendez-vous sur la page Suivi de commande ou contactez-nous à ${COMPANY.email} (ou via le formulaire de contact) avec votre numéro de commande.` },
    { title: "5. Vos droits légaux", body: "Cette politique s’ajoute à vos droits légaux de consommateur, qui ne sont pas affectés, notamment la garantie légale de conformité et, lorsqu’il s’applique, le droit de rétractation (voir les conditions d’utilisation). Tout remboursement dû à ce titre est effectué par notre prestataire de paiement sur le moyen de paiement utilisé." },
    { title: "6. Exceptions", body: "Les commandes dont le compte ou la publication a été supprimé, rendu privé pendant la livraison, ou dont l’identifiant fourni était erroné, ainsi que celles qui enfreignent les conditions d’utilisation des plateformes concernées, ne donnent pas lieu à une nouvelle livraison ni à un service offert." },
    { title: "7. Litiges de paiement", body: "Avant de contester un paiement auprès de votre banque, contactez-nous : nous traitons les demandes rapidement. Les journaux d’exécution des commandes sont conservés et peuvent servir de preuve dans le cadre d’un litige." },
  ],
  en: [
    { title: "1. Our commitment", body: "If you're not satisfied with an order, contact us within 30 days of purchase: we will complete or restart the delivery or, at our choice, give you another service of equivalent value for free." },
    { title: "2. Refill guarantee", body: "For follower services, if you notice a drop after delivery, we will refill the difference for free during the guarantee period shown on each service." },
    { title: "3. Undelivered orders", body: "If an order hasn't started within 24 hours of payment, contact our support: it will be prioritized. If we are unable to deliver it, the corresponding amount is refunded to you." },
    { title: "4. How to make a request", body: `Go to the Track Order page or contact us at ${COMPANY.email} (or via the contact form) with your order number.` },
    { title: "5. Your statutory rights", body: "This policy is in addition to your statutory consumer rights, which are not affected, including the legal guarantee of conformity and, where it applies, the right of withdrawal (see the terms of service). Any refund due under those rights is made by our payment provider to the original payment method." },
    { title: "6. Exceptions", body: "Orders where the account or post was deleted, made private during delivery, or where the identifier provided was incorrect, as well as orders that violate the relevant platform's terms of service, do not qualify for re-delivery or a free service." },
    { title: "7. Payment disputes", body: "Before disputing a payment with your bank, please contact us: we handle requests quickly. Order delivery logs are kept and may be used as evidence in a dispute." },
  ],
};

const T = {
  fr: { title: "Garanties et réclamations", subtitle: `Dernière mise à jour : ${COMPANY.lastUpdated.fr}` },
  en: { title: "Guarantees & Claims", subtitle: `Last updated: ${COMPANY.lastUpdated.en}` },
};

export default async function RefundPage(props: PageProps<"/[locale]/remboursement">) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  return <LegalDocument title={T[locale].title} subtitle={T[locale].subtitle} sections={SECTIONS[locale]} />;
}
