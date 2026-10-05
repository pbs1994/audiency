import { Search, Users, Rocket } from "lucide-react";

const STEPS = [
  {
    n: 1,
    icon: Search,
    bg: "bg-teal",
    title: "Parcourez et choisissez",
    body: "Parcourez nos services et choisissez ce dont vous avez besoin pour Instagram, TikTok ou une autre plateforme.",
  },
  {
    n: 2,
    icon: Users,
    bg: "bg-violet",
    title: "Indiquez vos informations",
    body: "Indiquez simplement votre nom d’utilisateur ou l’URL de la publication. Aucun mot de passe requis.",
  },
  {
    n: 3,
    icon: Rocket,
    bg: "bg-green",
    title: "Profitez du résultat",
    body: "Installez-vous et regardez vos abonnés, likes et vues grandir, en provenance de comptes réels et actifs.",
  },
];

export default function HowItWorks() {
  return (
    <section id="services" className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <h2 className="max-w-md text-3xl font-extrabold text-text sm:text-4xl">
          Comment utiliser <span className="gradient-brand-text">BoostInflu</span>
        </h2>
        <p className="mt-4 max-w-md text-text-muted">
          Développer votre présence sociale n’a jamais été aussi simple. Suivez
          ces trois étapes et regardez votre engagement décoller.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="relative rounded-2xl border border-border bg-surface-soft p-6 text-left shadow-sm"
            >
              <div className="flex items-start justify-between">
                <span className={`grid h-12 w-12 place-items-center rounded-xl ${step.bg} text-white`}>
                  <step.icon size={22} />
                </span>
                <span className="grid h-7 w-7 place-items-center rounded-full border border-border bg-surface text-xs font-bold text-text-muted">
                  {step.n}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-text">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
