import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import TopBar from "@/components/TopBar";
import TickerTape from "@/components/TickerTape";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CartProvider } from "@/lib/cart-context";
import { CurrencyProvider } from "@/lib/currency-context";
import { LocaleProvider } from "@/lib/locale-context";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: LayoutProps<"/[locale]">
): Promise<Metadata> {
  const { locale } = await props.params;
  const isFr = locale === "fr";
  return {
    title: isFr
      ? "BoostInflu — Abonnés, likes et vues Instagram & TikTok"
      : "BoostInflu — Instagram & TikTok Followers, Likes and Views",
    description: isFr
      ? "Abonnés, likes et vues réels pour Instagram, TikTok, YouTube et plus. Prix les plus bas, livraison instantanée."
      : "Real followers, likes and views for Instagram, TikTok, YouTube and more. Lowest prices, instant delivery.",
  };
}

export default async function LocaleLayout(props: LayoutProps<"/[locale]">) {
  const { locale: rawLocale } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(rawLocale)
    ? (rawLocale as Locale)
    : DEFAULT_LOCALE;

  return (
    <html lang={locale} className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-surface text-text font-body">
        <LocaleProvider locale={locale}>
          <CurrencyProvider defaultCurrency={locale === "fr" ? "EUR" : "USD"}>
            <CartProvider>
              <TopBar locale={locale} />
              <TickerTape locale={locale} />
              <SiteHeader />
              <main className="flex-1">{props.children}</main>
              <SiteFooter locale={locale} />
            </CartProvider>
          </CurrencyProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
