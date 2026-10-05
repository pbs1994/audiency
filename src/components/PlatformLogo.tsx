import { Ghost, MessageCircle } from "lucide-react";

const LOGOS: Record<string, string> = {
  Instagram: "/logos/instagram.png",
  TikTok: "/logos/tiktok.png",
  YouTube: "/logos/youtube.png",
  Facebook: "/logos/facebook.webp",
  "X / Twitter": "/logos/x.webp",
  Telegram: "/logos/telegram.webp",
  Spotify: "/logos/spotify.webp",
};

const FALLBACK_ICONS: Record<string, { Icon: typeof Ghost; className: string }> = {
  Snapchat: { Icon: Ghost, className: "text-orange" },
  WhatsApp: { Icon: MessageCircle, className: "text-green" },
};

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
    const fallback = FALLBACK_ICONS[name];
    if (!fallback) return null;
    const { Icon, className: iconClass } = fallback;
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-md bg-surface-soft ${iconClass}`}
        style={{ width: size, height: size }}
      >
        <Icon size={Math.round(size * 0.65)} />
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
