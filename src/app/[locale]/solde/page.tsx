import type { Metadata } from "next";
import { redirect } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import BalanceView from "./BalanceView";
import { createClient } from "@/lib/supabase/server";
import { LOCALES, DEFAULT_LOCALE, routeHref, type Locale } from "@/lib/i18n";

export async function generateMetadata(props: PageProps<"/[locale]/solde">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: locale === "fr" ? "Mon solde | BoostInflu" : "My Balance | BoostInflu" };
}

const T = {
  fr: { title: "Mon solde", subtitle: "Votre cashback BoostInflu, utilisable sur n’importe quelle commande." },
  en: { title: "My balance", subtitle: "Your BoostInflu cashback, usable on any order." },
};

export default async function BalancePage(props: PageProps<"/[locale]/solde">) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  const t = T[locale];

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect(routeHref(locale, "login"));

  const [{ data: balanceRow }, { data: history }] = await Promise.all([
    supabase.from("wallet_balances").select("balance_eur").maybeSingle(),
    supabase
      .from("wallet_transactions")
      .select("id, type, amount_eur, description, created_at")
      .order("created_at", { ascending: false }),
  ]);

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />
      <section className="bg-surface">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
          <BalanceView locale={locale} balanceEUR={balanceRow?.balance_eur ?? 0} history={history ?? []} />
        </div>
      </section>
    </>
  );
}
