import { Hero } from "@/components/home/Hero";
import { Highlights } from "@/components/home/Highlights";
import { Categories } from "@/components/home/Categories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { WholesaleCTA } from "@/components/home/WholesaleCTA";
import { PricingPreview } from "@/components/home/PricingPreview";
import { TextileCollection } from "@/components/home/TextileCollection";
import { HowToOrder } from "@/components/home/HowToOrder";
import { About } from "@/components/home/About";
import { Social } from "@/components/home/Social";
import { Articles } from "@/components/home/Articles";
import { ContactCTA } from "@/components/home/ContactCTA";
import { api, type HeroSlide } from "@/lib/api";

export const dynamic = "force-dynamic";

async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    return await api.heroSlides();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const heroSlides = await getHeroSlides();

  return (
    <>
      <Hero slides={heroSlides} />
      <Highlights />
      <Categories />
      <FeaturedProducts />
      <IndustriesSection />
      <WholesaleCTA />
      <PricingPreview />
      <TextileCollection />
      <HowToOrder />
      <About />
      <Social />
      <Articles />
      <ContactCTA />
    </>
  );
}
