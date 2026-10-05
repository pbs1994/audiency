import { Zap, Activity, Bell, Gauge } from "lucide-react";
import SectionBadge from "./SectionBadge";

const ORDERS = [
  { label: "Abonnés Instagram", value: "2 500", pct: 78 },
  { label: "Vues TikTok", value: "10 000", pct: 45 },
];

const FEATURES = [
  {
    icon: Zap,
    bg: "bg-teal",
    title: "Démarrage instantané",
    body: "Les commandes démarrent immédiatement après la confirmation du paiement.",
  },
  {
    icon: Activity,
    bg: "bg-green",
    title: "Progression en direct",
    body: "Regardez vos statistiques grimper en temps réel grâce au suivi en direct.",
  },
  {
    icon: Bell,
    bg: "bg-violet",
    title: "Notifications intelligentes",
    body: "Soyez averti au démarrage, pendant la progression et à la livraison.",
  },
];

export default function DeliveryTracker() {
  return (
    <section id="suivi" className="bg-surface-soft">
      <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8">
        <SectionBadge icon={Gauge}>Livraison ultra-rapide</SectionBadge>
        <h2 className="mt-5 text-3xl font-extrabold text-text sm:text-4xl">
          Livraison instantanée &amp; <span className="gradient-brand-text">suivi en direct</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-text-muted">
          Regardez votre croissance se dérouler en temps réel grâce à notre
          système de livraison instantanée et au suivi en direct.
        </p>

        <div className="mt-14 grid items-center gap-10 text-left lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <div className="bg-gradient-to-r from-violet to-rose px-5 py-5 text-white">
              <p className="text-lg font-bold">Tableau de bord</p>
              <p className="text-xs text-white/80">Suivi en direct</p>
            </div>
            <div className="space-y-5 p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">Commandes actives</span>
                <span className="rounded-full bg-violet/10 px-2.5 py-1 text-xs font-semibold text-violet">
                  3 actives
                </span>
              </div>
              {ORDERS.map((o) => (
                <div key={o.label}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-medium text-text">
                      <span className="h-2 w-2 rounded-full bg-green" /> {o.label}
                    </span>
                    <span className="text-xs font-semibold text-green">LIVE</span>
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
            {FEATURES.map((f) => (
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
