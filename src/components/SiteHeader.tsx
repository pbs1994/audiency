"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, User, ChevronDown, ChevronRight } from "lucide-react";
import PlatformLogo from "./PlatformLogo";
import LocaleSwitcher from "./LocaleSwitcher";
import { getPlatform, PLATFORMS } from "@/lib/platforms";
import { useCart } from "@/lib/cart-context";

const MAIN_SLUGS = ["tiktok", "instagram", "youtube", "facebook"];
const MORE_SLUGS = ["x", "snapchat", "telegram", "whatsapp", "spotify"];

function ServiceList({ slug }: { slug: string }) {
  const platform = getPlatform(slug);
  if (!platform) return null;
  const best = platform.services.filter((s) => s.highlight);
  const individual = platform.services.filter((s) => !s.highlight);

  return (
    <div className="w-64 p-4">
      <Link
        href={`/plateformes/${slug}`}
        className="flex items-center gap-2 border-b border-border pb-3 text-sm font-semibold text-violet"
      >
        <PlatformLogo name={platform.logoName} size={18} />
        Tous les services {platform.name}
      </Link>

      {best.length > 0 && (
        <div className="mt-3">
          <p className="text-[11px] font-bold uppercase tracking-wide text-orange">
            Meilleur pack
          </p>
          <ul className="mt-2 space-y-2">
            {best.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/plateformes/${slug}/${s.slug}`}
                  className="text-sm text-text transition-colors hover:text-violet"
                >
                  {s.name} {platform.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-3">
        <p className="text-[11px] font-bold uppercase tracking-wide text-text-muted">
          Services individuels
        </p>
        <ul className="mt-2 space-y-2">
          {individual.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/plateformes/${slug}/${s.slug}`}
                className="text-sm text-text transition-colors hover:text-violet"
              >
                {s.name} {platform.name}
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
  const [active, setActive] = useState(MORE_SLUGS[0]);

  return (
    <div className="absolute left-0 top-full z-50 flex rounded-xl border border-border bg-surface shadow-lg">
      <div className="w-52 border-r border-border p-2">
        <p className="px-2 pb-2 pt-1 text-[11px] font-bold uppercase tracking-wide text-text-muted">
          Boutique
        </p>
        {MORE_SLUGS.map((slug) => {
          const platform = getPlatform(slug);
          if (!platform) return null;
          return (
            <Link
              key={slug}
              href={`/plateformes/${slug}`}
              onMouseEnter={() => setActive(slug)}
              className={`flex items-center justify-between gap-2 rounded-lg px-2.5 py-2.5 text-sm transition-colors ${
                active === slug ? "bg-surface-soft text-violet" : "text-text hover:bg-surface-soft"
              }`}
            >
              <span className="flex items-center gap-2">
                <PlatformLogo name={platform.logoName} size={16} />
                {platform.name}
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
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="flex w-full items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
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
                  href={`/plateformes/${slug}`}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-text-muted transition-colors hover:bg-surface-soft hover:text-text"
                >
                  <PlatformLogo name={platform.logoName} size={16} />
                  {platform.name}
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
              Plus
              <ChevronDown
                size={14}
                className={openMenu === "more" ? "rotate-180 transition-transform" : "transition-transform"}
              />
            </button>
            {openMenu === "more" && <MoreDropdown />}
          </div>

          <Link
            href="/outils-gratuits"
            className="ml-2 rounded-full border border-border px-3 py-1.5 text-sm text-text-muted hover:text-text"
          >
            Services Gratuits
          </Link>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LocaleSwitcher />
          <Link href="/panier" className="relative text-text-muted hover:text-text" aria-label="Panier">
            <ShoppingCart size={18} />
            {items.length > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-rose text-[10px] font-semibold text-white">
                {items.length}
              </span>
            )}
          </Link>
          <Link href="/connexion" className="flex items-center gap-1.5 text-sm font-medium text-text hover:text-violet">
            <User size={16} /> Connexion
          </Link>
        </div>

        <button
          type="button"
          className="text-text lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
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
                href={`/plateformes/${p.slug}`}
                className="flex items-center gap-2 text-sm text-text-muted"
                onClick={() => setOpen(false)}
              >
                <PlatformLogo name={p.logoName} size={16} />
                {p.name}
              </Link>
            ))}
            <Link href="/outils-gratuits" className="text-sm text-text-muted" onClick={() => setOpen(false)}>
              Services Gratuits
            </Link>
            <Link href="/suivi-commande" className="text-sm text-text-muted" onClick={() => setOpen(false)}>
              Suivre ma commande
            </Link>
            <Link href="/connexion" className="mt-2 text-sm font-medium text-text" onClick={() => setOpen(false)}>
              Connexion
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
