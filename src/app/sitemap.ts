import type { MetadataRoute } from "next";
import { PLATFORMS } from "@/lib/platforms";

const BASE_URL = "https://boostinflu.fr";

const STATIC_PATHS = [
  { path: "/", priority: 1, changeFrequency: "daily" as const },
  { path: "/plateformes", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/outils-gratuits", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/outils-gratuits/calculateur-engagement", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/outils-gratuits/generateur-hashtags", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/a-propos", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/contact", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/connexion", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/panier", priority: 0.2, changeFrequency: "monthly" as const },
  { path: "/suivi-commande", priority: 0.3, changeFrequency: "monthly" as const },
  { path: "/solde", priority: 0.2, changeFrequency: "monthly" as const },
  { path: "/conditions-utilisation", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/confidentialite", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/remboursement", priority: 0.2, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((p) => ({
    url: `${BASE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const platformEntries: MetadataRoute.Sitemap = PLATFORMS.map((p) => ({
    url: `${BASE_URL}/plateformes/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const serviceEntries: MetadataRoute.Sitemap = PLATFORMS.flatMap((p) =>
    p.services.map((s) => ({
      url: `${BASE_URL}/plateformes/${p.slug}/${s.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: s.highlight ? 0.8 : 0.7,
    }))
  );

  return [...staticEntries, ...platformEntries, ...serviceEntries];
}
