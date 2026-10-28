import Image from "next/image";
import type { Service } from "@/data/services";
import { designs } from "@/data/designs";
import { images } from "@/data/images";
import { ImageHero } from "@/components/ui/ImageHero";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageReveal, Reveal, StaggerLines } from "@/components/motion/Reveal";
import { DesignGallery } from "@/components/gallery/DesignGallery";
import { DesignJourney } from "@/components/home/DesignJourney";
import { ConsultationCta } from "@/components/home/ConsultationCta";

export function ServicePage({ service }: { service: Service }) {
  const related = designs.filter((d) => d.categories.some((c) => service.galleryCategories.includes(c)));
  const titleLines = service.title.split(/(?<=,|\.)\s/);

  return (
    <>
      <ImageHero
        image={service.heroImage}
        eyebrow={service.eyebrow}
        title={titleLines}
        lede={service.lede}
        crumbs={[{ label: service.eyebrow }]}
      >
        <Reveal delay={0.5} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/book-consultation?service=${service.formService}`} variant="light" arrow>
            Begin Your Custom Design
          </ButtonLink>
          <WhatsAppButton variant="outline-light" message={`Hello SP Femme Fashion, I'd like to enquire about ${service.eyebrow.toLowerCase()}.`} />
        </Reveal>
      </ImageHero>

      <section className="overflow-hidden bg-paper py-24 lg:py-36">
        <div className="container-site grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow text-rose-deep">Our Approach</p>
            <p className="mt-6 font-serif text-[clamp(2rem,3.6vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.035em]">
              <StaggerLines lines={[service.statement]} />
            </p>
            <Reveal delay={0.1}>
              <h2 className="eyebrow mt-14 text-stone">What We Consider Together</h2>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {service.considerations.map((c, i) => (
                  <li key={c} className="flex gap-6 py-4 text-[0.9375rem] text-ink-soft">
                    <span className="eyebrow mt-1 text-rose">{String(i + 1).padStart(2, "0")}</span>
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="relative lg:col-span-5 lg:col-start-8">
            <ImageReveal className="relative aspect-[4/5] card">
              <Image
                src={service.sideImage.src}
                alt={service.sideImage.alt}
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: service.sideImage.position }}
              />
            </ImageReveal>
            <ImageReveal
              className="absolute -bottom-10 -left-8 hidden aspect-square w-44 overflow-hidden rounded-2xl border-[6px] border-paper sm:block lg:-left-20 lg:w-56"
              delay={0.25}
            >
              <Image src={images.handsSewing.src} alt={images.handsSewing.alt} fill sizes="224px" className="object-cover" />
            </ImageReveal>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-24 lg:py-32">
        <div className="container-site">
          <SectionHeading eyebrow="Services" title={["What we create."]} />
          <ul className="mt-14 grid gap-2 sm:grid-cols-2">
            {service.offerings.map((o, i) => (
              <Reveal as="li" key={o.title} delay={(i % 2) * 0.08} className="rounded-2xl bg-paper p-8 sm:p-10 lg:p-12">
                <span className="eyebrow text-rose-deep">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-serif text-[2rem] font-medium leading-tight">{o.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-stone">{o.text}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 text-sm text-ink-soft">
            Every commission is quoted individually — pricing and timelines are confirmed during your consultation.
          </p>
        </div>
      </section>

      <DesignJourney />

      {related.length > 0 && (
        <section className="bg-ivory py-24 lg:py-32">
          <div className="container-site">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading eyebrow="Design Inspiration" title={["Selected designs."]} />
              <ButtonLink href={`/gallery?category=${service.galleryCategories[0]}`} variant="text" arrow>
                Browse the full gallery
              </ButtonLink>
            </div>
            <div className="mt-12">
              <DesignGallery designs={related} showFilters={false} limit={6} />
            </div>
          </div>
        </section>
      )}

      <ConsultationCta />
    </>
  );
}
