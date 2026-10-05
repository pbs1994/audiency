import type { MetadataRoute } from "next";
import { PLATFORMS } from "@/lib/platforms";
import { STATIC_ROUTES, routeHref, platformHref, serviceHref, type RouteKey } from "@/lib/i18n";

const BASE_URL = "https://boostinflu.fr";

const PRIORITIES: Partial<Record<RouteKey, number>> = {
  home: 1,
  platforms: 0.9,
  freeTools: 0.6,
  engagementCalculator: 0.5,
  hashtagGenerator: 0.5,
  trackOrder: 0.3,
  login: 0.3,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const key of Object.keys(STATIC_ROUTES) as RouteKey[]) {
    const frUrl = `${BASE_URL}${routeHref("fr", key)}`;
    const enUrl = `${BASE_URL}${routeHref("en", key)}`;
    entries.push({
      url: frUrl,
      lastModified: now,
      priority: PRIORITIES[key] ?? 0.3,
      alternates: { languages: { fr: frUrl, en: enUrl } },
    });
    entries.push({
      url: enUrl,
      lastModified: now,
      priority: PRIORITIES[key] ?? 0.3,
      alternates: { languages: { fr: frUrl, en: enUrl } },
    });
  }

  for (const platform of PLATFORMS) {
    const frUrl = `${BASE_URL}${platformHref("fr", platform.slug)}`;
    const enUrl = `${BASE_URL}${platformHref("en", platform.slug)}`;
    entries.push({
      url: frUrl,
      lastModified: now,
      priority: 0.8,
      alternates: { languages: { fr: frUrl, en: enUrl } },
    });
    entries.push({
      url: enUrl,
      lastModified: now,
      priority: 0.8,
      alternates: { languages: { fr: frUrl, en: enUrl } },
    });

    for (const service of platform.services) {
      const frServiceUrl = `${BASE_URL}${serviceHref("fr", platform.slug, service.slug, service.slugEn)}`;
      const enServiceUrl = `${BASE_URL}${serviceHref("en", platform.slug, service.slug, service.slugEn)}`;
      entries.push({
        url: frServiceUrl,
        lastModified: now,
        priority: service.highlight ? 0.8 : 0.7,
        alternates: { languages: { fr: frServiceUrl, en: enServiceUrl } },
      });
      entries.push({
        url: enServiceUrl,
        lastModified: now,
        priority: service.highlight ? 0.8 : 0.7,
        alternates: { languages: { fr: frServiceUrl, en: enServiceUrl } },
      });
    }
  }

  return entries;
}
