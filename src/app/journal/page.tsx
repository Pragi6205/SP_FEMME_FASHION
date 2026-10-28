import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/data/journal";
import { PageIntro } from "@/components/ui/PageIntro";
import { ImageReveal, Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Stories on Aari embroidery, blouse design, styling and preparing for a custom outfit — from the SP Femme Fashion journal.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  const [feature, ...rest] = articles;
  return (
    <>
      <PageIntro
        eyebrow="The Journal"
        title={["Stories in thread."]}
        intro="Notes on embroidery, blouse design and styling — written to help you arrive at a design that feels like yours."
        crumbs={[{ label: "Journal" }]}
      />

      <section className="bg-paper pb-24 lg:pb-36">
        <div className="container-site">
          <Link href={`/journal/${feature.slug}`} className="group grid items-end gap-10 border-t border-line pt-10 lg:grid-cols-12">
            <ImageReveal className="relative aspect-[4/3] card lg:col-span-8 lg:aspect-[16/10]">
              <Image
                src={feature.image.src}
                alt={feature.image.alt}
                fill
                preload
                sizes="(min-width:1024px) 65vw, 100vw"
                className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
                style={{ objectPosition: feature.image.position }}
              />
            </ImageReveal>
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-rose-deep">
                Featured · {feature.category} · {feature.readingTime}
              </p>
              <h2 className="mt-5 font-serif text-headline font-medium group-hover:text-rose-deep">{feature.title}</h2>
              <p className="mt-5 text-[0.9375rem] leading-7 text-stone">{feature.intro}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-[0.8125rem] font-semibold">
                <span className="link-underline pb-0.5 group-hover:bg-[length:100%_1px]">Read Story</span>
                <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden />
              </span>
            </Reveal>
          </Link>

          <ul className="mt-24 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:mt-32 lg:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal as="li" key={a.slug} delay={(i % 3) * 0.08} className={i % 3 === 1 ? "lg:mt-20" : ""}>
                <Link href={`/journal/${a.slug}`} className="group block">
                  <span className="relative block aspect-[4/5] card">
                    <Image
                      src={a.image.src}
                      alt={a.image.alt}
                      fill
                      sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-editorial)] group-hover:scale-[1.04]"
                      style={{ objectPosition: a.image.position }}
                    />
                  </span>
                  <span className="eyebrow mt-6 block text-stone">
                    {a.category} · {a.readingTime}
                  </span>
                  <span className="mt-3 block font-serif text-[1.85rem] font-medium leading-tight group-hover:text-rose-deep">
                    {a.title}
                  </span>
                  <span className="mt-3 block text-sm leading-6 text-stone">{a.intro}</span>
                  <span className="mt-5 inline-block text-[0.8125rem] font-semibold">
                    <span className="link-underline pb-0.5 group-hover:bg-[length:100%_1px]">Read Story</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
