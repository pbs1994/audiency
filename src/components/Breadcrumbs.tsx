import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items, locale = "fr" }: { items: Crumb[]; locale?: Locale }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  };

  return (
    <nav aria-label={locale === "fr" ? "Fil d’Ariane" : "Breadcrumb"} className="mx-auto max-w-4xl px-5 pt-6 sm:px-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-text-muted">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={12} className="text-text-muted/60" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-text">
                {item.label}
              </Link>
            ) : (
              <span className="text-text">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
