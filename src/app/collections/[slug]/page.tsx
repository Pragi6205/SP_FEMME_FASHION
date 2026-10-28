import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { collections, getCollection } from "@/data/collections";
import { designs } from "@/data/designs";
import { ImageHero } from "@/components/ui/ImageHero";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ImageReveal, Reveal } from "@/components/motion/Reveal";
import { DesignGallery } from "@/components/gallery/DesignGallery";
import { CollectionTile } from "@/components/collections/CollectionTile";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return {};
  return {
    title: c.title,
    description: `${c.summary} ${c.intro[0]}`.slice(0, 160),
    alternates: { canonical: `/collections/${c.slug}` },
    openGraph: { title: c.title, description: c.summary, images: [{ url: c.image.src, alt: c.image.alt }] },
  };
}

export default function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  return (
    <Suspense fallback={<section aria-busy="true" className="min-h-[88svh] bg-night" />}>
      <CollectionContent params={params} />
    </Suspense>
  );
}

async function CollectionContent({ params }: { params: PageProps<"/collections/[slug]">["params"] }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const related = collections.filter((c) => c.slug !== slug).slice(0, 3);
  const collectionDesigns = designs.filter((d) => d.categories.includes(collection.galleryCategory));
  const [a, b, c] = collection.detailImages;

  return (
    <>
      <ImageHero
        image={collection.image}
        eyebrow="Collection"
        title={[collection.title]}
        lede={collection.summary}
        crumbs={[{ label: "Collections", href: "/collections" }, { label: collection.title }]}
      />

      <section className="bg-paper py-24 lg:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-rose-deep">About the Collection</p>
            {collection.intro.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "mt-6 font-serif text-[1.75rem] leading-snug text-ink"
                    : "mt-6 text-[0.9375rem] leading-7 text-stone"
                }
              >
                {p}
              </p>
            ))}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/book-consultation?service=${collection.formService}`} arrow>
                Enquire About This Collection
              </ButtonLink>
              <ButtonLink href={collection.service.href} variant="outline">
                {collection.service.label}
              </ButtonLink>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-5 lg:col-span-6 lg:col-start-7">
            <ImageReveal className="relative row-span-2 aspect-[3/5] card">
              <Image src={a.src} alt={a.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" style={{ objectPosition: a.position }} />
            </ImageReveal>
            <ImageReveal className="relative aspect-square card" delay={0.1}>
              <Image src={b.src} alt={b.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" style={{ objectPosition: b.position }} />
            </ImageReveal>
            <ImageReveal className="relative aspect-square card" delay={0.2}>
              <Image src={c.src} alt={c.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" style={{ objectPosition: c.position }} />
            </ImageReveal>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 lg:py-28">
        <div className="container-site">
          <p className="eyebrow text-rose-deep">What You Can Personalise</p>
          <ul className="mt-10 grid border-t border-ink/70 md:grid-cols-3">
            {collection.considerations.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 0.08}
                className={`border-b border-line py-8 md:border-b-0 md:px-8 md:pt-10 ${i > 0 ? "md:border-l" : "md:pl-0"}`}
              >
                <h2 className="font-serif text-[1.75rem] font-medium">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-stone">{item.text}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-sm leading-6 text-ink-soft">
            Pricing depends on the design, materials and embroidery involved, and is confirmed during your
            consultation.
          </p>
        </div>
      </section>

      {collectionDesigns.length > 0 && (
        <section className="bg-paper py-24 lg:py-32">
          <div className="container-site">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading eyebrow="Designs in This Collection" title={["Inspiration to", "start from."]} />
              <ButtonLink href={`/gallery?category=${collection.galleryCategory}`} variant="text" arrow>
                See more in the gallery
              </ButtonLink>
            </div>
            <div className="mt-12">
              <DesignGallery designs={collectionDesigns} showFilters={false} limit={6} />
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line bg-paper py-24 lg:py-32">
        <div className="container-site">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-serif text-headline font-medium">Continue Exploring</h2>
            <WhatsAppButton variant="outline" message={`Hello SP Femme Fashion, I'm interested in your ${collection.title} collection.`} />
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <CollectionTile
                key={r.slug}
                collection={r}
                index={collections.indexOf(r)}
                sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
