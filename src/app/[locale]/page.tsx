import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyChoose from "@/components/WhyChoose";
import Guarantee from "@/components/Guarantee";
import DeliveryTracker from "@/components/DeliveryTracker";
import Pricing from "@/components/Pricing";
import PlatformsGrid from "@/components/PlatformsGrid";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/i18n";

export default async function Home(props: PageProps<"/[locale]">) {
  const { locale: raw } = await props.params;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw) ? (raw as Locale) : DEFAULT_LOCALE;

  return (
    <>
      <Hero locale={locale} />
      <HowItWorks locale={locale} />
      <WhyChoose locale={locale} />
      <Guarantee locale={locale} />
      <DeliveryTracker locale={locale} />
      <Pricing locale={locale} />
      <PlatformsGrid locale={locale} />
      <Testimonials locale={locale} />
      <FAQ locale={locale} />
      <FinalCTA locale={locale} />
    </>
  );
}
