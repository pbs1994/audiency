import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";
import PlatformLogo, { hasPlatformLogo } from "./PlatformLogo";

const COLUMNS = [
  {
    title: "Services Gratuits",
    links: [
      { label: "Abonnés Instagram gratuits", href: "/plateformes/instagram" },
      { label: "Vues TikTok gratuites", href: "/plateformes/tiktok" },
      { label: "Abonnés YouTube gratuits", href: "/plateformes/youtube" },
      { label: "Likes Facebook gratuits", href: "/plateformes/facebook" },
    ],
  },
  {
    title: "Outils Gratuits",
    links: [
      { label: "Calculateur d’engagement", href: "/outils-gratuits/calculateur-engagement" },
      { label: "Générateur de hashtags", href: "/outils-gratuits/generateur-hashtags" },
      { label: "Tous les outils", href: "/outils-gratuits" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Nous contacter", href: "/contact" },
      { label: "Suivre ma commande", href: "/suivi-commande" },
      { label: "Mon solde", href: "/solde" },
    ],
  },
  {
    title: "Plateformes",
    links: [
      { label: "Instagram", href: "/plateformes/instagram" },
      { label: "TikTok", href: "/plateformes/tiktok" },
      { label: "YouTube", href: "/plateformes/youtube" },
      { label: "Facebook", href: "/plateformes/facebook" },
      { label: "Telegram", href: "/plateformes/telegram" },
      { label: "Spotify", href: "/plateformes/spotify" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-navy text-on-navy-muted">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full gradient-brand text-sm font-bold text-white">
                A
              </span>
              <span className="text-lg font-bold text-on-navy">Audiency</span>
            </div>
            <p className="mt-4 max-w-[26ch] text-sm leading-relaxed">
              Votre source de confiance pour la croissance sur les réseaux
              sociaux. Développez Instagram, TikTok et plus.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="/contact"
                aria-label="Nous contacter"
                className="grid h-9 w-9 place-items-center rounded-full border border-navy-line hover:border-on-navy-muted"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="mailto:contact@audiency.fr"
                aria-label="Email"
                className="grid h-9 w-9 place-items-center rounded-full border border-navy-line hover:border-on-navy-muted"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-wide text-on-navy">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm transition-colors hover:text-on-navy"
                    >
                      {col.title === "Plateformes" && hasPlatformLogo(link.label) && (
                        <PlatformLogo name={link.label} size={16} />
                      )}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-navy-line pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Audiency. Tous droits réservés.</p>
          <div className="flex gap-5">
            <Link href="/conditions-utilisation" className="hover:text-on-navy">Conditions d’utilisation</Link>
            <Link href="/confidentialite" className="hover:text-on-navy">Confidentialité</Link>
            <Link href="/remboursement" className="hover:text-on-navy">Remboursement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
