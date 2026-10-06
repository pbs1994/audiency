import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";
import PlatformLogo, { hasPlatformLogo } from "./PlatformLogo";
import type { Locale } from "@/lib/i18n";
import { routeHref, platformHref } from "@/lib/i18n";

function columns(locale: Locale) {
  const fr = locale === "fr";
  return [
    {
      title: fr ? "Services Gratuits" : "Free Services",
      links: [
        { label: fr ? "Abonnés Instagram gratuits" : "Free Instagram Followers", href: platformHref(locale, "instagram") },
        { label: fr ? "Vues TikTok gratuites" : "Free TikTok Views", href: platformHref(locale, "tiktok") },
        { label: fr ? "Abonnés YouTube gratuits" : "Free YouTube Subscribers", href: platformHref(locale, "youtube") },
        { label: fr ? "Likes Facebook gratuits" : "Free Facebook Likes", href: platformHref(locale, "facebook") },
      ],
    },
    {
      title: fr ? "Outils Gratuits" : "Free Tools",
      links: [
        { label: fr ? "Calculateur d’engagement" : "Engagement Calculator", href: routeHref(locale, "engagementCalculator") },
        { label: fr ? "Générateur de hashtags" : "Hashtag Generator", href: routeHref(locale, "hashtagGenerator") },
        { label: fr ? "Tous les outils" : "All tools", href: routeHref(locale, "freeTools") },
      ],
    },
    {
      title: fr ? "Entreprise" : "Company",
      links: [
        { label: fr ? "À propos" : "About", href: routeHref(locale, "about") },
        { label: fr ? "Nous contacter" : "Contact us", href: routeHref(locale, "contact") },
        { label: fr ? "Suivre ma commande" : "Track my order", href: routeHref(locale, "trackOrder") },
        { label: fr ? "Mon solde" : "My balance", href: routeHref(locale, "balance") },
      ],
    },
    {
      title: fr ? "Plateformes" : "Platforms",
      links: [
        { label: "Instagram", href: platformHref(locale, "instagram") },
        { label: "TikTok", href: platformHref(locale, "tiktok") },
        { label: "YouTube", href: platformHref(locale, "youtube") },
        { label: "Facebook", href: platformHref(locale, "facebook") },
        { label: "Telegram", href: platformHref(locale, "telegram") },
        { label: "Spotify", href: platformHref(locale, "spotify") },
      ],
    },
  ];
}

export default function SiteFooter({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const platformsLabel = fr ? "Plateformes" : "Platforms";

  return (
    <footer className="bg-navy text-on-navy-muted">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full gradient-brand text-sm font-bold text-white">
                B
              </span>
              <span className="text-lg font-bold text-on-navy">BoostInflu</span>
            </div>
            <p className="mt-4 max-w-[26ch] text-sm leading-relaxed">
              {fr
                ? "Votre source de confiance pour la croissance sur les réseaux sociaux. Développez Instagram, TikTok et plus."
                : "Your trusted source for social media growth. Grow Instagram, TikTok and more."}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={routeHref(locale, "contact")}
                aria-label={fr ? "Nous contacter" : "Contact us"}
                className="grid h-9 w-9 place-items-center rounded-full border border-navy-line hover:border-on-navy-muted"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="mailto:contact@boostinflu.com"
                aria-label="Email"
                className="grid h-9 w-9 place-items-center rounded-full border border-navy-line hover:border-on-navy-muted"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {columns(locale).map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-wide text-on-navy">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm transition-colors hover:text-on-navy"
                    >
                      {col.title === platformsLabel && hasPlatformLogo(link.label) && (
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
          <p>{fr ? "© 2026 BoostInflu. Tous droits réservés." : "© 2026 BoostInflu. All rights reserved."}</p>
          <div className="flex gap-5">
            <Link href={routeHref(locale, "terms")} className="hover:text-on-navy">
              {fr ? "Conditions d’utilisation" : "Terms of Service"}
            </Link>
            <Link href={routeHref(locale, "privacy")} className="hover:text-on-navy">
              {fr ? "Confidentialité" : "Privacy Policy"}
            </Link>
            <Link href={routeHref(locale, "refunds")} className="hover:text-on-navy">
              {fr ? "Remboursement" : "Refund Policy"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
