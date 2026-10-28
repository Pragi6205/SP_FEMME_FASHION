import Image from "next/image";
import { images, type SiteImage } from "@/data/images";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal, StaggerLines } from "@/components/motion/Reveal";

type Props = {
  image?: SiteImage;
  title?: string[];
  text?: string;
};

export function ConsultationCta({
  image = images.consultation,
  title = ["Have a Design in Mind?"],
  text = "Bring your ideas, inspirations, and references. Let’s explore how they can become a creation made especially for you.",
}: Props) {
  return (
    <section className="bg-paper px-3 py-3 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
      <div className="card relative isolate flex min-h-[34rem] items-end justify-center text-center text-paper lg:min-h-[40rem] lg:items-center lg:justify-start lg:rounded-[1.75rem] lg:text-left">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          className="-z-10 object-cover"
          style={{ objectPosition: image.position }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(24,20,18,0.7)_0%,rgba(24,20,18,0)_60%)] lg:bg-[linear-gradient(90deg,rgba(24,20,18,0.72)_0%,rgba(24,20,18,0.35)_45%,rgba(24,20,18,0)_70%)]" />
        <div className="max-w-xl px-6 py-14 lg:ml-[6%] lg:py-20">
          <h2 className="font-serif text-[clamp(2.3rem,4.6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.045em]">
            <StaggerLines lines={title} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-md lg:mx-0 text-[0.9375rem] leading-7 text-paper/85">{text}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <ButtonLink href="/book-consultation" variant="light">
                Begin Your Custom Design
              </ButtonLink>
              <WhatsAppButton variant="outline-light" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
