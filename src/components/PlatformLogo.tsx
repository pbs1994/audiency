const LOGOS: Record<string, string> = {
  Instagram: "/logos/instagram.png",
  TikTok: "/logos/tiktok.png",
  YouTube: "/logos/youtube.png",
  Facebook: "/logos/facebook.webp",
  "X / Twitter": "/logos/x.webp",
  Telegram: "/logos/telegram.webp",
  Spotify: "/logos/spotify.webp",
  Snapchat: "/logos/snapchat.svg",
  WhatsApp: "/logos/whatsapp.webp",
};

const FALLBACK_COLORS = ["bg-teal", "bg-violet", "bg-rose", "bg-orange", "bg-green"];

function fallbackColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return FALLBACK_COLORS[hash % FALLBACK_COLORS.length];
}

export function hasPlatformLogo(name: string) {
  return name in LOGOS;
}

export default function PlatformLogo({
  name,
  size = 20,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const src = LOGOS[name];

  if (!src) {
    // Placeholder until a real logo file is added for this platform.
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-md font-bold text-white ${fallbackColor(name)} ${className}`}
        style={{ width: size, height: size, fontSize: Math.max(9, size * 0.45) }}
        title={name}
      >
        {name.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      className={`inline-block shrink-0 rounded-md object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
