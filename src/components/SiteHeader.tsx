"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, User, ChevronDown, ChevronRight } from "lucide-react";
import PlatformLogo from "./PlatformLogo";
import LocaleSwitcher from "./LocaleSwitcher";
import { getPlatform, PLATFORMS } from "@/lib/platforms";
import { useCart } from "@/lib/cart-context";
import { useLocale } from "@/lib/locale-context";
import { routeHref, platformHref, serviceHref } from "@/lib/i18n";

const MAIN_SLUGS = ["tiktok", "instagram", "youtube", "facebook"];
const MORE_SLUGS = ["x", "snapchat", "telegram", "whatsapp", "spotify", "twitch", "linkedin", "threads"];

const T = {
  fr: {
    allServices: (name: string) => `Tous les services ${name}`,
    bestPack: "Meilleur pack",
    individualServices: "Services individuels",
    store: "Boutique",
    more: "Plus",
    freeServices: "Services Gratuits",
    login: "Connexion",
    cart: "Panier",
    trackOrder: "Suivre ma commande",
    closeMenu: "Fermer le menu",
    openMenu: "Ouvrir le menu",
  },
  en: {
    allServices: (name: string) => `All ${name} services`,
    bestPack: "Best pack",
    individualServices: "Individual services",
    store: "Store",
    more: "More",
    freeServices: "Free Services",
    login: "Login",
    cart: "Cart",
    trackOrder: "Track my order",
    closeMenu: "Close menu",
    openMenu: "Open menu",
  },
};

function ServiceList({ slug }: { slug: string }) {
  const locale = useLocale();
  const t = T[locale];
  const platform = getPlatform(slug);
  if (!platform) return null;
  const platformName = locale === "fr" ? platform.name : platform.nameEn;
  const best = platform.services.filter((s) => s.highlight);
  const individual = platform.services.filter((s) => !s.highlight);

  return (
    <div className="w-64 p-4">
      <Link
        href={platformHref(locale, slug)}
        className="flex items-center gap-2 border-b border-border pb-3 text-sm font-semibold text-violet"
      >
        <PlatformLogo name={platform.logoName} size={18} />
        {t.allServices(platformName)}
      </Link>

      {best.length > 0 && (
        <div className="mt-3">
          <p className="text-[11px] font-bold uppercase tracking-wide text-orange">{t.bestPack}</p>
          <ul className="mt-2 space-y-2">
            {best.map((s) => (
              <li key={s.slug}>
                <Link
                  href={serviceHref(locale, slug, s.slug, s.slugEn)}
                  className="text-sm text-text transition-colors hover:text-violet"
                >
                  {locale === "fr" ? s.name : s.nameEn} {platformName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-3">
        <p className="text-[11px] font-bold uppercase tracking-wide text-text-muted">
          {t.individualServices}
        </p>
        <ul className="mt-2 space-y-2">
          {individual.map((s) => (
            <li key={s.slug}>
              <Link
                href={serviceHref(locale, slug, s.slug, s.slugEn)}
                className="text-sm text-text transition-colors hover:text-violet"
              >
                {locale === "fr" ? s.name : s.nameEn} {platformName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PlatformDropdown({ slug }: { slug: string }) {
  return (
    <div className="absolute left-0 top-full z-50 rounded-xl border border-border bg-surface shadow-lg">
      <ServiceList slug={slug} />
    </div>
  );
}

function MoreDropdown() {
  const locale = useLocale();
  const t = T[locale];
  const [active, setActive] = useState(MORE_SLUGS[0]);

  return (
    <div className="absolute left-0 top-full z-50 flex rounded-xl border border-border bg-surface shadow-lg">
      <div className="w-52 border-r border-border p-2">
        <p className="px-2 pb-2 pt-1 text-[11px] font-bold uppercase tracking-wide text-text-muted">
          {t.store}
        </p>
        {MORE_SLUGS.map((slug) => {
          const platform = getPlatform(slug);
          if (!platform) return null;
          return (
            <Link
              key={slug}
              href={platformHref(locale, slug)}
              onMouseEnter={() => setActive(slug)}
              className={`flex items-center justify-between gap-2 rounded-lg px-2.5 py-2.5 text-sm transition-colors ${
                active === slug ? "bg-surface-soft text-violet" : "text-text hover:bg-surface-soft"
              }`}
            >
              <span className="flex items-center gap-2">
                <PlatformLogo name={platform.logoName} size={16} />
                {locale === "fr" ? platform.name : platform.nameEn}
              </span>
              <ChevronRight size={14} />
            </Link>
          );
        })}
      </div>
      <ServiceList slug={active} />
    </div>
  );
}

export default function SiteHeader() {
  const locale = useLocale();
  const t = T[locale];
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="flex w-full items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href={routeHref(locale, "home")} className="flex shrink-0 items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full gradient-brand text-sm font-bold text-white">
            B
          </span>
          <span className="text-lg font-bold text-text">BoostInflu</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {MAIN_SLUGS.map((slug) => {
            const platform = getPlatform(slug);
            if (!platform) return null;
            return (
              <div
                key={slug}
                className="relative"
                onMouseEnter={() => setOpenMenu(slug)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  href={platformHref(locale, slug)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-text-muted transition-colors hover:bg-surface-soft hover:text-text"
                >
                  <PlatformLogo name={platform.logoName} size={16} />
                  {locale === "fr" ? platform.name : platform.nameEn}
                  <ChevronDown
                    size={14}
                    className={openMenu === slug ? "rotate-180 transition-transform" : "transition-transform"}
                  />
                </Link>
                {openMenu === slug && <PlatformDropdown slug={slug} />}
              </div>
            );
          })}

          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("more")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-text-muted transition-colors hover:bg-surface-soft hover:text-text"
            >
              {t.more}
              <ChevronDown
                size={14}
                className={openMenu === "more" ? "rotate-180 transition-transform" : "transition-transform"}
              />
            </button>
            {openMenu === "more" && <MoreDropdown />}
          </div>

          <Link
            href={routeHref(locale, "freeTools")}
            className="ml-2 rounded-full border border-border px-3 py-1.5 text-sm text-text-muted hover:text-text"
          >
            {t.freeServices}
          </Link>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LocaleSwitcher />
          <Link href={routeHref(locale, "cart")} className="relative text-text-muted hover:text-text" aria-label={t.cart}>
            <ShoppingCart size={18} />
            {items.length > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-rose text-[10px] font-semibold text-white">
                {items.length}
              </span>
            )}
          </Link>
          <Link
            href={routeHref(locale, "login")}
            className="flex items-center gap-1.5 text-sm font-medium text-text hover:text-violet"
          >
            <User size={16} /> {t.login}
          </Link>
        </div>

        <button
          type="button"
          className="text-text lg:hidden"
          aria-label={open ? t.closeMenu : t.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border px-5 pb-5 lg:hidden">
          <nav className="flex flex-col gap-3 pt-4">
            {PLATFORMS.map((p) => (
              <Link
                key={p.slug}
                href={platformHref(locale, p.slug)}
                className="flex items-center gap-2 text-sm text-text-muted"
                onClick={() => setOpen(false)}
              >
                <PlatformLogo name={p.logoName} size={16} />
                {locale === "fr" ? p.name : p.nameEn}
              </Link>
            ))}
            <Link href={routeHref(locale, "freeTools")} className="text-sm text-text-muted" onClick={() => setOpen(false)}>
              {t.freeServices}
            </Link>
            <Link href={routeHref(locale, "trackOrder")} className="text-sm text-text-muted" onClick={() => setOpen(false)}>
              {t.trackOrder}
            </Link>
            <Link
              href={routeHref(locale, "login")}
              className="mt-2 text-sm font-medium text-text"
              onClick={() => setOpen(false)}
            >
              {t.login}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
