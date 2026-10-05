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

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhyChoose />
      <Guarantee />
      <DeliveryTracker />
      <Pricing />
      <PlatformsGrid />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
