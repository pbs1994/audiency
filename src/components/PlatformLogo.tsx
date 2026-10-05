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
  if (!src) return null;

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
