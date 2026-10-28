import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/data/collections";
import { PageIntro } from "@/components/ui/PageIntro";
import { ImageReveal, Reveal } from "@/components/motion/Reveal";
import { ConsultationCta } from "@/components/home/ConsultationCta";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore SP Femme Fashion collections — Aari & maggam embroidery, custom blouse designs, bridal and occasion wear, festive pieces, personalised embroidery and custom-designed outfits.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Collections"
        title={["Starting points for", "something made for you."]}
        intro="Each collection gathers ideas, techniques and inspiration around one way of working. None of them is a fixed catalogue — every piece is designed and made to order."
        crumbs={[{ label: "Collections" }]}
      />

      <section className="bg-paper pb-24 lg:pb-36">
        <ol className="container-site space-y-24 lg:space-y-36">
          {collections.map((c, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={c.slug}>
                <Link
                  href={`/collections/${c.slug}`}
                  className="group grid items-center gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-12"
                >
                  <ImageReveal
                    className={`relative aspect-[4/5] card lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}
                  >
                    <Image
                      src={c.image.src}
                      alt={c.image.alt}
                      fill
                      sizes="(min-width:1024px) 45vw, 100vw"
                      className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-editorial)] group-hover:scale-[1.04]"
                      style={{ objectPosition: c.image.position }}
                    />
                  </ImageReveal>
                  <Reveal className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                    <span className="font-serif text-[4.5rem] leading-none text-rose">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-6 font-serif text-headline font-medium">{c.title}</h2>
                    <p className="mt-6 max-w-md text-[0.9375rem] leading-7 text-stone">{c.intro[0]}</p>
                    <div className="mt-6 grid max-w-md grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6">
                      {c.detailImages.slice(0, 2).map((img) => (
                        <span key={img.src} className="relative block aspect-[4/3] overflow-hidden rounded-xl">
                          <Image src={img.src} alt={img.alt} fill sizes="200px" className="object-cover" />
                        </span>
                      ))}
                    </div>
                    <span className="mt-8 inline-flex items-center gap-2 text-[0.8125rem] font-semibold">
                      <span className="link-underline pb-0.5 group-hover:bg-[length:100%_1px]">Explore the Collection</span>
                      <ArrowUpRight
                        className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </span>
                  </Reveal>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <ConsultationCta />
    </>
  );
}
