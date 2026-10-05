import { Zap, Users, ShieldCheck, Clock, Headphones, BadgePercent } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    bg: "bg-teal",
    title: "Livraison instantanée",
    body: "Les commandes démarrent en quelques minutes. Regardez votre croissance en temps réel.",
  },
  {
    icon: Users,
    bg: "bg-green",
    title: "100% comptes réels",
    body: "Chaque abonné, like et vue provient d’un compte actif et réel — jamais de robots.",
  },
  {
    icon: ShieldCheck,
    bg: "bg-violet",
    title: "Sans risque pour votre compte",
    body: "Totalement conforme aux conditions d’utilisation de chaque plateforme prise en charge.",
  },
  {
    icon: Clock,
    bg: "bg-orange",
    title: "Résultats rapides",
    body: "Une croissance mesurable en quelques heures, pas en quelques jours.",
  },
  {
    icon: Headphones,
    bg: "bg-rose",
    title: "Support 24/7",
    body: "Notre équipe est disponible à toute heure pour vous accompagner.",
  },
  {
    icon: BadgePercent,
    bg: "bg-teal",
    title: "Prix les plus bas",
    body: "Garantie du prix le plus bas — trouvé moins cher ailleurs ? 25% de remise immédiate.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-surface-soft">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <h2 className="max-w-md text-3xl font-extrabold text-text sm:text-4xl">
          Pourquoi choisir <span className="gradient-brand-text">Audiency</span>
        </h2>
        <p className="mt-4 max-w-md text-text-muted">
          Une équipe de confiance pour des créateurs du monde entier, pour une
          croissance fiable, sûre et instantanée.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-surface p-6 text-left shadow-sm">
              <span className={`grid h-12 w-12 place-items-center rounded-xl ${f.bg} text-white`}>
                <f.icon size={22} />
              </span>
              <h3 className="mt-5 font-bold text-text">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
