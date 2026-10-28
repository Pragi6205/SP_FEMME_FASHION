import type { Metadata } from "next";
import { Suspense } from "react";
import { PageIntro } from "@/components/ui/PageIntro";
import { GalleryBrowser } from "@/components/gallery/GalleryBrowser";
import { DesignGallery } from "@/components/gallery/DesignGallery";
import { ConsultationCta } from "@/components/home/ConsultationCta";

export const metadata: Metadata = {
  title: "Design Gallery",
  description:
    "Browse SP Femme Fashion's design gallery — Aari work, blouse designs, bridal, festive, contemporary and custom embroidery. Every design can be customised through consultation.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageIntro
        eyebrow="Design Gallery"
        title={["A gallery of ideas,", "made to be adapted."]}
        intro={
          <>
            Browse by technique or occasion and open any design for a closer look. Colours, motifs,
            necklines and sleeves can all be changed — customisation and pricing are confirmed through
            consultation.
          </>
        }
        crumbs={[{ label: "Design Gallery" }]}
      />
      <section className="bg-paper pb-24 lg:pb-36">
        <div className="container-site">
          <Suspense fallback={<DesignGallery />}>
            <GalleryBrowser />
          </Suspense>
        </div>
      </section>
      <ConsultationCta title={["Seen Something", "You Love?"]} text="Share the design with us along with your own ideas — we will help adapt it into something that is entirely yours." />
    </>
  );
}
