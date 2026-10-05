import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { STATIC_ROUTES } from "@/lib/i18n";

// Map every English public path to its internal (French-named) route folder path.
// e.g. "free-tools/engagement-calculator" -> "outils-gratuits/calculateur-engagement"
const EXACT_EN_TO_INTERNAL = new Map<string, string>();
for (const route of Object.values(STATIC_ROUTES)) {
  if (route.en !== route.fr) {
    EXACT_EN_TO_INTERNAL.set(route.en, route.fr);
  }
}

const PLATFORMS_EN_PREFIX = `${STATIC_ROUTES.platforms.en}/`;
const PLATFORMS_FR_PREFIX = `${STATIC_ROUTES.platforms.fr}/`;

function translateEnPath(pathAfterLocale: string): string {
  // pathAfterLocale has no leading slash, e.g. "" | "about" | "platforms/instagram/buy-x"
  const exact = EXACT_EN_TO_INTERNAL.get(pathAfterLocale);
  if (exact !== undefined) return exact;

  if (pathAfterLocale === STATIC_ROUTES.platforms.en) return STATIC_ROUTES.platforms.fr;
  if (pathAfterLocale.startsWith(PLATFORMS_EN_PREFIX)) {
    return PLATFORMS_FR_PREFIX + pathAfterLocale.slice(PLATFORMS_EN_PREFIX.length);
  }

  return pathAfterLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const after = pathname.slice(3).replace(/^\//, "");
    const translated = translateEnPath(after);
    if (translated !== after) {
      const url = request.nextUrl.clone();
      url.pathname = translated ? `/en/${translated}` : "/en";
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // Already-internal /fr path (not a canonical public link, but avoid double-prefixing it).
  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/fr" : `/fr${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
