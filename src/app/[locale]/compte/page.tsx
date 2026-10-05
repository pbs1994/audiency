import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Wallet, ListOrdered } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SignOutButton from "@/components/SignOutButton";
import Price from "@/components/Price";
import { createClient } from "@/lib/supabase/server";
import { LOCALES, DEFAULT_LOCALE, routeHref, type Locale } from "@/lib/i18n";

export async function generateMetadata(props: PageProps<"/[locale]/compte">): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: locale === "fr" ? "Mon compte | BoostInflu" : "My account | BoostInflu" };
}

const T = {
  fr: {
    title: "Mon compte",
    subtitle: "Votre tableau de bord BoostInflu.",
    signedInAs: "Connecté en tant que",
    balance: "Solde disponible",
    viewBalance: "Voir l’historique",
    recentOrders: "Commandes récentes",
    viewAll: "Voir toutes mes commandes",
    noOrders: "Vous n’avez pas encore passé de commande.",
    browse: "Voir les plateformes",
  },
  en: {
    title: "My account",
    subtitle: "Your BoostInflu dashboard.",
    signedInAs: "Signed in as",
    balance: "Available balance",
    viewBalance: "View history",
    recentOrders: "Recent orders",
    viewAll: "View all my orders",
    noOrders: "You haven’t placed an order yet.",
    browse: "View platforms",
  },
};

export default async function AccountPage(props: PageProps<"/[locale]/compte">) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  const t = T[locale];

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect(routeHref(locale, "login"));

  const [{ data: balanceRow }, { data: orders }] = await Promise.all([
    supabase.from("wallet_balances").select("balance_eur").maybeSingle(),
    supabase
      .from("orders")
      .select("id, status, total_eur, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const balanceEUR = balanceRow?.balance_eur ?? 0;

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />
      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-muted">
              {t.signedInAs} <span className="font-medium text-text">{userData.user.email}</span>
            </p>
            <SignOutButton locale={locale} />
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Link
              href={routeHref(locale, "balance")}
              className="rounded-2xl gradient-brand p-6 text-white transition-opacity hover:opacity-95"
            >
              <Wallet size={22} />
              <p className="mt-3 text-sm text-white/80">{t.balance}</p>
              <p className="mt-1 text-2xl font-extrabold">
                <Price amountEUR={balanceEUR} />
              </p>
              <p className="mt-2 text-xs text-white/80">{t.viewBalance} →</p>
            </Link>

            <Link
              href={routeHref(locale, "accountOrders")}
              className="rounded-2xl border border-border bg-surface-soft p-6 transition-colors hover:border-violet/40"
            >
              <ListOrdered size={22} className="text-violet" />
              <p className="mt-3 text-sm text-text-muted">{t.recentOrders}</p>
              <p className="mt-1 text-2xl font-extrabold text-text">{orders?.length ?? 0}</p>
              <p className="mt-2 text-xs font-medium text-violet">{t.viewAll} →</p>
            </Link>
          </div>

          <h2 className="mt-12 font-bold text-text">{t.recentOrders}</h2>
          {orders && orders.length > 0 ? (
            <div className="mt-4 divide-y divide-border border-y border-border">
              {orders.map((o) => (
                <div key={o.id} className="flex items-center justify-between py-4 text-sm">
                  <div>
                    <p className="font-mono text-xs text-text-muted">{o.id.slice(0, 8)}</p>
                    <p className="text-text-muted">{new Date(o.created_at).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US")}</p>
                  </div>
                  <span className="font-bold text-text">
                    <Price amountEUR={o.total_eur} />
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-border bg-surface-soft p-6 text-center">
              <p className="text-sm text-text-muted">{t.noOrders}</p>
              <Link href={routeHref(locale, "platforms")} className="mt-3 inline-block text-sm font-medium text-violet">
                {t.browse}
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
