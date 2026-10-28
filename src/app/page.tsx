import { Hero } from "@/components/home/Hero";
import { QualitiesStrip } from "@/components/home/QualitiesStrip";
import { CreationsSection } from "@/components/home/CreationsSection";
import { FeaturedDesigns } from "@/components/home/FeaturedDesigns";
import { SignatureCraft } from "@/components/home/SignatureCraft";
import { CraftStory } from "@/components/home/CraftStory";
import { DesignJourney } from "@/components/home/DesignJourney";
import { JournalFeature } from "@/components/home/JournalFeature";
import { SeeTheDifference } from "@/components/home/SeeTheDifference";
import { ConsultationCta } from "@/components/home/ConsultationCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QualitiesStrip />
      <CreationsSection />
      <FeaturedDesigns />
      <SignatureCraft />
      <CraftStory />
      <DesignJourney />
      <JournalFeature />
      <SeeTheDifference />
      <ConsultationCta />
    </>
  );
}
