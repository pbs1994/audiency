import type { Metadata } from "next";
import Link from "next/link";
import { Hash, Percent, MessageSquareText, DollarSign } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Outils gratuits | BoostInflu",
};

const TOOLS = [
  {
    icon: Percent,
    title: "Calculateur d’engagement",
    body: "Calculez votre taux d’engagement Instagram ou TikTok à partir de vos statistiques.",
    href: "/outils-gratuits/calculateur-engagement",
  },
  {
    icon: Hash,
    title: "Générateur de hashtags",
    body: "Générez des suggestions de hashtags pertinents à partir d’un mot-clé.",
    href: "/outils-gratuits/generateur-hashtags",
  },
  {
    icon: MessageSquareText,
    title: "Générateur de légendes",
    body: "Bientôt disponible.",
    href: null,
  },
  {
    icon: DollarSign,
    title: "Calculateur de revenus TikTok",
    body: "Bientôt disponible.",
    href: null,
  },
];

export default function ToolsPage() {
  return (
    <>
      <PageHeader title="Outils gratuits" subtitle="Des outils simples pour vous aider à développer votre audience." />
      <section className="bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {TOOLS.map((tool) => {
              const card = (
                <div
                  className={`h-full rounded-2xl border border-border bg-surface-soft p-6 shadow-sm ${
                    tool.href ? "transition-colors hover:border-violet/40" : "opacity-60"
                  }`}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet text-white">
                    <tool.icon size={20} />
                  </span>
                  <p className="mt-4 font-bold text-text">{tool.title}</p>
                  <p className="mt-2 text-sm text-text-muted">{tool.body}</p>
                  {!tool.href && (
                    <span className="mt-3 inline-block rounded-full bg-orange/10 px-2.5 py-1 text-xs font-semibold text-orange">
                      Bientôt
                    </span>
                  )}
                </div>
              );
              return tool.href ? (
                <Link key={tool.title} href={tool.href}>
                  {card}
                </Link>
              ) : (
                <div key={tool.title}>{card}</div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
