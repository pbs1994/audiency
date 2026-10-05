import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
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

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response: ReturnType<typeof NextResponse.next>;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const after = pathname.slice(3).replace(/^\//, "");
    const translated = translateEnPath(after);
    if (translated !== after) {
      const url = request.nextUrl.clone();
      url.pathname = translated ? `/en/${translated}` : "/en";
      response = NextResponse.rewrite(url);
    } else {
      response = NextResponse.next();
    }
  } else if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    // Already-internal /fr path (not a canonical public link, but avoid double-prefixing it).
    response = NextResponse.next();
  } else {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/fr" : `/fr${pathname}`;
    response = NextResponse.rewrite(url);
  }

  // Keep the Supabase auth session fresh on every navigation. This only
  // touches cookies — it never blocks or redirects a route itself; each
  // page decides for itself whether it needs a signed-in user. Skipped
  // entirely (rather than failing every request) until Supabase env vars
  // are configured, so the rest of the site keeps working either way.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    });
    await supabase.auth.getUser();
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
