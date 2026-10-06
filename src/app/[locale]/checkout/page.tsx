import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PaddleLauncher from "./PaddleLauncher";
import { LOCALES, DEFAULT_LOCALE, routeHref, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Paiement | BoostInflu",
  robots: { index: false, follow: false },
};

const T = {
  fr: {
    title: "Paiement sécurisé",
    subtitle: "Votre fenêtre de paiement va s’ouvrir…",
    body: "Si rien ne s’affiche, retournez à votre panier et relancez le paiement.",
    cart: "Retour au panier",
  },
  en: {
    title: "Secure payment",
    subtitle: "Your payment window is about to open…",
    body: "If nothing appears, go back to your cart and start the payment again.",
    cart: "Back to cart",
  },
};

export default async function CheckoutPage(props: PageProps<"/[locale]/checkout">) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  const t = T[locale];

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />
      <section className="bg-surface">
        <div className="mx-auto max-w-xl px-5 py-16 text-center sm:px-8">
          <p className="text-sm text-text-muted">{t.body}</p>
          <Link href={routeHref(locale, "cart")} className="mt-6 inline-block text-sm font-medium text-violet">
            {t.cart}
          </Link>
          <PaddleLauncher locale={locale} />
        </div>
      </section>
    </>
  );
}
