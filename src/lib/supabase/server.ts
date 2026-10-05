import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client for Server Components / Server Actions,
 * bound to the anon key and the request's cookies. Subject to RLS — use
 * this to read/write as the signed-in user, never for privileged writes.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Called from a Server Component render, where cookies can't be
            // written. Harmless as long as proxy.ts refreshes the session
            // on navigation (it does — see src/proxy.ts).
          }
        },
      },
    }
  );
}
