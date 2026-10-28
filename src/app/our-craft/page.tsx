import type { Metadata } from "next";
import Image from "next/image";
import { craftStory } from "@/data/content";
import { images } from "@/data/images";
import { ImageHero } from "@/components/ui/ImageHero";
import { ImageReveal, Reveal, StaggerLines } from "@/components/motion/Reveal";
import { CraftStory } from "@/components/home/CraftStory";
import { DesignJourney } from "@/components/home/DesignJourney";
import { ConsultationCta } from "@/components/home/ConsultationCta";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our Craft",
  description:
    "The people, process and attention behind SP Femme Fashion — design preparation, fabric and thread selection, embroidery and finishing.",
  alternates: { canonical: "/our-craft" },
};

const principles = [
  { title: "Listening first", text: "Every design starts with your occasion, your references and the way you like to feel in your clothes." },
  { title: "Detail by detail", text: "Motifs, colours, closures and linings are considered individually so the whole garment feels resolved." },
  { title: "Fit that is yours", text: "Pieces are made to your measurements, with fittings arranged where the design needs them." },
  { title: "Clear agreements", text: "Design, pricing and timelines are discussed and confirmed with you before work begins." },
];

export default function OurCraftPage() {
  const { founder } = craftStory;
  return (
    <>
      <ImageHero
        image={images.embroideredPanels}
        eyebrow="Our Craft"
        title={["Made with attention,", "made for you."]}
        lede="A look at the people, the process and the care behind every SP Femme Fashion piece."
        crumbs={[{ label: "Our Craft" }]}
      />

      <section className="bg-paper py-24 lg:py-36">
        <div className="container-site grid items-center gap-14 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <ImageReveal className="relative aspect-[4/5] card">
              <Image
                src={founder.image.src}
                alt={founder.image.alt}
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow text-rose-deep">The Studio</p>
            <blockquote className="mt-6 font-serif text-[clamp(1.9rem,3.2vw,3rem)] font-medium leading-[1.12]">
              <StaggerLines lines={[`“${founder.quote}”`]} />
            </blockquote>
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-lg text-[0.9375rem] leading-7 text-stone">{founder.note}</p>
              <p className="eyebrow mt-8 text-ink">
                {founder.name ? `${founder.name} — ` : ""}
                {founder.role}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CraftStory showCta={false} />

      <section className="bg-ivory py-24 lg:py-32">
        <div className="container-site">
          <p className="eyebrow text-rose-deep">What Guides the Work</p>
          <ul className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.06} className="rounded-2xl bg-paper p-8 lg:p-10">
                <h2 className="font-serif text-[1.75rem] font-medium leading-tight">{p.title}</h2>
                <p className="mt-4 text-sm leading-6 text-stone">{p.text}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-12">
            <ButtonLink href="/gallery" variant="outline" arrow>
              See the Design Gallery
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <DesignJourney />
      <ConsultationCta />
    </>
  );
}
