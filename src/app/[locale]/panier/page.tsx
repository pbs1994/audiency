import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CartView from "./CartView";
import { createClient } from "@/lib/supabase/server";
import { LOCALES, DEFAULT_LOCALE, routeHref, type Locale } from "@/lib/i18n";

export async function generateMetadata(props: PageProps<"/[locale]/panier">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: locale === "fr" ? "Panier | BoostInflu" : "Cart | BoostInflu" };
}

const T = {
  fr: {
    title: "Votre panier",
    subtitle: "Vérifiez votre commande avant de passer au paiement.",
    continueShopping: "← Continuer mes achats",
  },
  en: {
    title: "Your cart",
    subtitle: "Review your order before checking out.",
    continueShopping: "← Continue shopping",
  },
};

export default async function CartPage(props: PageProps<"/[locale]/panier">) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  const t = T[locale];

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />
      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
          <CartView locale={locale} loggedIn={!!userData.user} />
        </div>

        <div className="mx-auto max-w-4xl px-5 pb-16 sm:px-8">
          <Link href={routeHref(locale, "platforms")} className="text-sm font-medium text-violet">
            {t.continueShopping}
          </Link>
        </div>
      </section>
    </>
  );
}
