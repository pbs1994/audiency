import { Globe } from "lucide-react";
import SectionBadge from "./SectionBadge";
import PlatformLogo from "./PlatformLogo";

const PLATFORMS = [
  { name: "Instagram", slug: "instagram", top: true },
  { name: "TikTok", slug: "tiktok", top: true },
  { name: "YouTube", slug: "youtube" },
  { name: "Facebook", slug: "facebook" },
  { name: "X / Twitter", slug: "x" },
  { name: "Snapchat", slug: "snapchat" },
  { name: "Spotify", slug: "spotify" },
  { name: "Telegram", slug: "telegram" },
  { name: "WhatsApp", slug: "whatsapp" },
];

export default function PlatformsGrid() {
  return (
    <section id="plateformes" className="bg-surface-soft">
      <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8">
        <SectionBadge icon={Globe}>Toutes les plateformes</SectionBadge>
        <h2 className="mt-5 text-3xl font-extrabold text-text sm:text-4xl">
          Développez-vous sur <span className="gradient-brand-text">chaque plateforme</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-text-muted">
          BoostInflu prend en charge 9 réseaux sociaux avec un engagement réel
          provenant de comptes authentiques.
        </p>

        <div className="mt-14 grid gap-5 text-left sm:grid-cols-3">
          {PLATFORMS.map(({ name, slug, top }) => (
            <div key={name} className="relative rounded-2xl border border-border bg-surface p-6 shadow-sm">
              {top && (
                <span className="absolute right-4 top-4 rounded-full bg-orange/10 px-2.5 py-1 text-[11px] font-bold text-orange">
                  Top vente
                </span>
              )}
              <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-surface-soft">
                <PlatformLogo name={name} size={44} />
              </span>
              <p className="mt-4 font-bold text-text">{name}</p>
              <a href={`/plateformes/${slug}`} className="mt-1 inline-block text-sm font-medium text-violet">
                Voir les services
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
