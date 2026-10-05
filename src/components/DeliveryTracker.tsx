import { Zap, Activity, Bell, Gauge } from "lucide-react";
import SectionBadge from "./SectionBadge";
import type { Locale } from "@/lib/i18n";

const ORDERS = {
  fr: [
    { label: "Abonnés Instagram", value: "2 500", pct: 78 },
    { label: "Vues TikTok", value: "10 000", pct: 45 },
  ],
  en: [
    { label: "Instagram Followers", value: "2,500", pct: 78 },
    { label: "TikTok Views", value: "10,000", pct: 45 },
  ],
};

const FEATURES = {
  fr: [
    { icon: Zap, bg: "bg-teal", title: "Démarrage instantané", body: "Les commandes démarrent immédiatement après la confirmation du paiement." },
    { icon: Activity, bg: "bg-green", title: "Progression en direct", body: "Regardez vos statistiques grimper en temps réel grâce au suivi en direct." },
    { icon: Bell, bg: "bg-violet", title: "Notifications intelligentes", body: "Soyez averti au démarrage, pendant la progression et à la livraison." },
  ],
  en: [
    { icon: Zap, bg: "bg-teal", title: "Instant start", body: "Orders start immediately after payment confirmation." },
    { icon: Activity, bg: "bg-green", title: "Live progress", body: "Watch your stats climb in real time with live tracking." },
    { icon: Bell, bg: "bg-violet", title: "Smart notifications", body: "Get notified when your order starts, progresses and completes." },
  ],
};

const T = {
  fr: {
    badge: "Livraison ultra-rapide",
    heading: "Livraison instantanée &",
    headingAccent: "suivi en direct",
    subtitle: "Regardez votre croissance se dérouler en temps réel grâce à notre système de livraison instantanée et au suivi en direct.",
    dashboard: "Tableau de bord",
    liveTracking: "Suivi en direct",
    activeOrders: "Commandes actives",
    active3: "3 actives",
    live: "EN DIRECT",
  },
  en: {
    badge: "Lightning-fast delivery",
    heading: "Instant delivery &",
    headingAccent: "live tracking",
    subtitle: "Watch your growth unfold in real time with our instant delivery system and live tracking.",
    dashboard: "Dashboard",
    liveTracking: "Live tracking",
    activeOrders: "Active orders",
    active3: "3 active",
    live: "LIVE",
  },
};

export default function DeliveryTracker({ locale }: { locale: Locale }) {
  const t = T[locale];
  const orders = ORDERS[locale];
  const features = FEATURES[locale];

  return (
    <section id="suivi" className="bg-surface-soft">
      <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8">
        <SectionBadge icon={Gauge}>{t.badge}</SectionBadge>
        <h2 className="mt-5 text-3xl font-extrabold text-text sm:text-4xl">
          {t.heading} <span className="gradient-brand-text">{t.headingAccent}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-text-muted">{t.subtitle}</p>

        <div className="mt-14 grid items-center gap-10 text-left lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <div className="bg-gradient-to-r from-violet to-rose px-5 py-5 text-white">
              <p className="text-lg font-bold">{t.dashboard}</p>
              <p className="text-xs text-white/80">{t.liveTracking}</p>
            </div>
            <div className="space-y-5 p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">{t.activeOrders}</span>
                <span className="rounded-full bg-violet/10 px-2.5 py-1 text-xs font-semibold text-violet">
                  {t.active3}
                </span>
              </div>
              {orders.map((o) => (
                <div key={o.label}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-medium text-text">
                      <span className="h-2 w-2 rounded-full bg-green" /> {o.label}
                    </span>
                    <span className="text-xs font-semibold text-green">{t.live}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>{o.value}</span>
                    <span>{o.pct}%</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-surface-soft">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-violet to-teal"
                      style={{ width: `${o.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-7">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4">
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${f.bg} text-white`}>
                  <f.icon size={20} />
                </span>
                <div>
                  <p className="font-bold text-text">{f.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-text-muted">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
