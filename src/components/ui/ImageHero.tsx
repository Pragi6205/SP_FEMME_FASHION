import Image from "next/image";
import type { SiteImage } from "@/data/images";
import { Breadcrumbs } from "./PageIntro";
import { StaggerLines, Reveal } from "@/components/motion/Reveal";

type Crumb = { label: string; href?: string };

/** Full-bleed image opening for service and collection pages. */
export function ImageHero({
  image,
  eyebrow,
  title,
  lede,
  crumbs,
  children,
}: {
  image: SiteImage;
  eyebrow: string;
  title: string[];
  lede?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-paper p-3 sm:p-5 lg:p-6">
      <div className="card relative isolate flex min-h-[calc(88svh-1.5rem)] items-end bg-night text-paper lg:rounded-[1.75rem]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        preload
        sizes="100vw"
        className="-z-10 object-cover"
        style={{ objectPosition: image.position }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(24,20,18,0.82)_0%,rgba(24,20,18,0.35)_45%,rgba(24,20,18,0.25)_100%),linear-gradient(90deg,rgba(24,20,18,0.55)_0%,rgba(24,20,18,0)_60%)]"
      />
      <div className="w-full px-6 pb-12 pt-32 sm:px-10 lg:px-14 lg:pb-16">
        {crumbs && <Breadcrumbs items={crumbs} tone="light" />}
        <p className="eyebrow mt-8 text-paper/75">{eyebrow}</p>
        <h1 className="mt-5 max-w-5xl font-serif text-display font-medium tracking-[-0.035em]">
          <StaggerLines lines={title} animateOnMount delay={0.15} />
        </h1>
        {lede && (
          <Reveal delay={0.4}>
            <p className="mt-7 max-w-xl text-[1rem] leading-8 text-paper/85">{lede}</p>
          </Reveal>
        )}
        {children}
      </div>
      </div>
    </section>
  );
}
