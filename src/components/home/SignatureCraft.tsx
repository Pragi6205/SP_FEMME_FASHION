import Image from "next/image";
import { craftVideo } from "@/data/content";
import { images } from "@/data/images";
import { ButtonLink } from "@/components/ui/Button";
import { ImageReveal, Reveal, StaggerLines } from "@/components/motion/Reveal";

export function SignatureCraft() {
  return (
    <section className="bg-paper px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
      <div className="grid gap-2 lg:grid-cols-[1.1fr_1fr]">
        <ImageReveal className="card relative min-h-[28rem] bg-ivory lg:min-h-[40rem]">
          {craftVideo.src ? (
            <video
              className="absolute inset-0 size-full object-cover"
              src={craftVideo.src}
              poster={craftVideo.poster.src}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-label="Embroidery in progress"
            />
          ) : (
            <Image
              src={craftVideo.poster.src}
              alt={craftVideo.poster.alt}
              fill
              sizes="(min-width:1024px) 55vw, 100vw"
              className="object-cover"
              style={{ objectPosition: craftVideo.poster.position }}
            />
          )}
          <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-[0.6875rem] font-semibold text-ink backdrop-blur">
            Signature Craft
          </span>
        </ImageReveal>

        <div className="card flex flex-col justify-between gap-12 bg-ivory p-7 sm:p-10 lg:p-12">
          <div>
            <h2 className="font-serif text-[clamp(2.1rem,3.6vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.045em]">
              <StaggerLines lines={["The Beauty Is", "in the Details."]} />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-md text-sm leading-6 text-stone">
                Every stitch, motif, and finishing detail contributes to a design that feels personal.
                Discover the craft behind our custom creations.
              </p>
              <ButtonLink href="/our-craft" variant="dark" className="mt-7 h-10 px-5">
                Discover Our Craft
              </ButtonLink>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <ImageReveal className="card relative aspect-[4/5]" delay={0.1}>
              <Image src={images.beadedFabric.src} alt={images.beadedFabric.alt} fill sizes="(min-width:1024px) 20vw, 50vw" className="object-cover" />
            </ImageReveal>
            <ImageReveal className="card relative aspect-[4/5]" delay={0.2}>
              <Image src={images.bridalZari.src} alt={images.bridalZari.alt} fill sizes="(min-width:1024px) 20vw, 50vw" className="object-cover" />
            </ImageReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
