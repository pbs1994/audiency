import type { Metadata } from "next";
import { Target, Users, ShieldCheck } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "À propos | Audiency",
  description: "L’histoire et la mission d’Audiency, votre partenaire de croissance sociale.",
};

const VALUES = [
  {
    icon: Target,
    title: "Notre mission",
    body: "Donner à chaque créateur et chaque marque les moyens de construire une audience réelle, rapidement et sans friction.",
  },
  {
    icon: Users,
    title: "Des comptes réels",
    body: "Nous ne travaillons qu’avec des comptes actifs et authentiques — jamais de robots ni de fermes à clics.",
  },
  {
    icon: ShieldCheck,
    title: "Votre sécurité d’abord",
    body: "Aucune méthode que nous utilisons ne demande votre mot de passe ni ne met votre compte en danger.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="À propos d’Audiency"
        subtitle="Nous aidons les créateurs et les marques à développer une audience réelle depuis 2023."
      />

      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <p className="text-text-muted leading-relaxed">
            Audiency est né d’un constat simple : développer une audience sur
            les réseaux sociaux prend du temps, et les outils existants sont
            souvent chers, lents ou peu fiables. Nous avons construit une
            plateforme qui connecte les créateurs à un réseau de comptes réels
            et actifs, avec une livraison instantanée et un suivi transparent.
          </p>
          <p className="mt-4 text-text-muted leading-relaxed">
            Aujourd’hui, des milliers de créateurs, d’entreprises et
            d’agences utilisent Audiency pour accélérer leur croissance sur
            Instagram, TikTok, YouTube et sept autres plateformes.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-surface-soft p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet text-white">
                  <v.icon size={20} />
                </span>
                <h2 className="mt-4 font-bold text-text">{v.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
