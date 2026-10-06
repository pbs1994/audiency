import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import PlatformLogo from "@/components/PlatformLogo";
import Price from "@/components/Price";
import { createClient } from "@/lib/supabase/server";
import { getPlatform } from "@/lib/platforms";
import { LOCALES, DEFAULT_LOCALE, routeHref, type Locale } from "@/lib/i18n";

export async function generateMetadata(
  props: PageProps<"/[locale]/compte/commandes">
): Promise<Metadata> {
  const { locale } = await props.params;
  return { title: locale === "fr" ? "Mes commandes | BoostInflu" : "My orders | BoostInflu" };
}

const T = {
  fr: {
    title: "Mes commandes",
    subtitle: "L’historique complet de vos commandes BoostInflu.",
    empty: "Vous n’avez pas encore passé de commande.",
    browse: "Voir les plateformes",
    status: {
      pending_payment: "Paiement en attente",
      paid: "Payée",
      cancelled: "Annulée",
      refunded: "Remboursée",
    },
    fulfillment: {
      pending: "En file d’attente",
      in_progress: "En cours",
      completed: "Livrée",
      failed: "Échec",
    },
    item: "article",
    items: "articles",
  },
  en: {
    title: "My orders",
    subtitle: "Your full BoostInflu order history.",
    empty: "You haven’t placed an order yet.",
    browse: "View platforms",
    status: {
      pending_payment: "Payment pending",
      paid: "Paid",
      cancelled: "Cancelled",
      refunded: "Refunded",
    },
    fulfillment: {
      pending: "Queued",
      in_progress: "In progress",
      completed: "Delivered",
      failed: "Failed",
    },
    item: "item",
    items: "items",
  },
};

type FulfillmentStatus = "pending" | "in_progress" | "completed" | "failed";
type OrderStatus = "pending_payment" | "paid" | "cancelled" | "refunded";

export default async function AccountOrdersPage(
  props: PageProps<"/[locale]/compte/commandes">
) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;
  const t = T[locale];

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect(routeHref(locale, "login"));

  const { data: orders } = await supabase
    .from("orders")
    .select(
      "id, status, total_eur, created_at, order_items(id, service_id, platform_slug, service_name, quantity, unit, line_total_eur, fulfillment_requests(status))"
    )
    .order("created_at", { ascending: false });

  return (
    <>
      <PageHeader title={t.title} subtitle={t.subtitle} />
      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
          {!orders || orders.length === 0 ? (
            <div className="rounded-2xl border border-border bg-surface-soft p-8 text-center">
              <p className="text-sm text-text-muted">{t.empty}</p>
              <Link href={routeHref(locale, "platforms")} className="mt-3 inline-block text-sm font-medium text-violet">
                {t.browse}
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((o) => {
                const status = o.status as OrderStatus;
                const items = o.order_items ?? [];
                return (
                  <div key={o.id} className="rounded-2xl border border-border bg-surface-soft p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                      <div>
                        <p className="font-mono text-xs text-text-muted">#{o.id.slice(0, 8)}</p>
                        <p className="text-xs text-text-muted">
                          {new Date(o.created_at).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US")}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-violet/10 px-3 py-1 text-xs font-semibold text-violet">
                          {t.status[status]}
                        </span>
                        <span className="font-bold text-text">
                          <Price amountEUR={o.total_eur} />
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 divide-y divide-border">
                      {items.map((item) => {
                        const platform = getPlatform(item.platform_slug);
                        const fulfillmentStatus = (item.fulfillment_requests?.[0]?.status ??
                          "pending") as FulfillmentStatus;
                        return (
                          <div key={item.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                            <div className="flex items-center gap-3">
                              {platform && (
                                <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-lg bg-surface">
                                  <PlatformLogo name={platform.logoName} size={36} />
                                </span>
                              )}
                              <div>
                                <p className="font-medium text-text">{item.service_name}</p>
                                <p className="text-xs text-text-muted">
                                  {item.quantity} {item.unit}
                                  {item.service_id && (
                                    <span className="ml-1.5 font-mono text-[10px] text-text-muted/70">
                                      · {item.service_id}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-medium text-text-muted">
                                {t.fulfillment[fulfillmentStatus]}
                              </span>
                              <span className="font-semibold text-text">
                                <Price amountEUR={item.line_total_eur} />
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
