/** Strips a pasted profile URL/@-prefix down to a bare handle. */
export function extractHandle(raw: string): string {
  let value = raw.trim();
  if (!value) return value;

  // Pasted a full URL? Keep only the last non-empty path segment.
  try {
    if (/^https?:\/\//i.test(value)) {
      const url = new URL(value);
      const segments = url.pathname.split("/").filter(Boolean);
      if (segments.length > 0) value = segments[segments.length - 1];
    }
  } catch {
    // Not a valid URL — fall through and treat it as a plain handle.
  }

  return value.replace(/^@/, "").trim();
}

/**
 * Per-platform username format rules (length/characters only — this does
 * NOT confirm the profile exists). Approximate each platform's publicly
 * documented rules closely enough to catch obvious typos.
 */
const FORMAT_RULES: Record<string, RegExp> = {
  instagram: /^(?!.*\.\.)[a-zA-Z0-9](?:[a-zA-Z0-9._]{0,28}[a-zA-Z0-9])?$/,
  threads: /^(?!.*\.\.)[a-zA-Z0-9](?:[a-zA-Z0-9._]{0,28}[a-zA-Z0-9])?$/,
  tiktok: /^[a-zA-Z0-9_.]{2,24}$/,
  facebook: /^[a-zA-Z][a-zA-Z0-9.]{4,49}$/,
  x: /^[a-zA-Z0-9_]{1,15}$/,
  snapchat: /^[a-zA-Z][a-zA-Z0-9_.-]{2,14}$/,
  telegram: /^[a-zA-Z][a-zA-Z0-9_]{4,31}$/,
  whatsapp: /^\+?[1-9]\d{7,14}$/,
  linkedin: /^[a-zA-Z0-9-]{3,100}$/,
};

export function matchesFormat(platformSlug: string, handle: string): boolean {
  const rule = FORMAT_RULES[platformSlug];
  if (!rule) return handle.length > 1;
  return rule.test(handle);
}
