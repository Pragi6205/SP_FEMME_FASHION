import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/data/journal";
import { siteConfig, absoluteUrl } from "@/config/site";
import { Breadcrumbs } from "@/components/ui/PageIntro";
import { ImageReveal, StaggerLines } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.intro,
    alternates: { canonical: `/journal/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.intro, images: [{ url: a.image.src, alt: a.image.alt }] },
  };
}

export default function ArticlePage({ params }: PageProps<"/journal/[slug]">) {
  return (
    <Suspense fallback={<section aria-busy="true" className="min-h-screen bg-paper" />}>
      <ArticleContent params={params} />
    </Suspense>
  );
}

async function ArticleContent({ params }: { params: PageProps<"/journal/[slug]">["params"] }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const index = articles.indexOf(article);
  const next = articles[(index + 1) % articles.length];
  const more = articles.filter((a) => a.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.intro,
    image: article.image.src,
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: absoluteUrl(`/journal/${article.slug}`),
  };

  return (
    <article className="bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="container-site pb-14 pt-36 lg:pt-48">
        <Breadcrumbs items={[{ label: "Journal", href: "/journal" }, { label: article.title }]} />
        <p className="eyebrow mt-10 text-rose-deep">
          {article.category} · {article.readingTime}
        </p>
        <h1 className="mt-5 max-w-4xl font-serif text-headline font-medium tracking-[-0.035em]">
          <StaggerLines lines={[article.title]} animateOnMount />
        </h1>
        <p className="mt-8 max-w-2xl font-serif text-[1.5rem] italic leading-snug text-ink-soft">{article.intro}</p>
      </header>

      <ImageReveal className="container-site">
        <div className="relative aspect-[16/10] card lg:aspect-[21/9]">
          <Image
            src={article.image.src}
            alt={article.image.alt}
            fill
            preload
            sizes="(min-width:1408px) 1300px, 100vw"
            className="object-cover"
            style={{ objectPosition: article.image.position }}
          />
        </div>
      </ImageReveal>

      <div className="container-site grid gap-14 py-20 lg:grid-cols-12 lg:py-28">
        <aside className="order-2 lg:order-1 lg:col-span-3">
          <div className="space-y-8 border-t border-line pt-6 lg:sticky lg:top-28">
            <div>
              <p className="eyebrow text-stone">Planning a design?</p>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                Share your ideas and references, and we will help shape them into a piece made for you.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <ButtonLink href="/book-consultation" className="h-11 px-5" arrow>
                Book a Consultation
              </ButtonLink>
              <WhatsAppButton variant="outline" className="h-11 px-5" />
            </div>
          </div>
        </aside>

        <div className="prose-editorial order-1 max-w-2xl text-[1.0625rem] lg:order-2 lg:col-span-7 lg:col-start-5">
          {article.body.map((block, i) => {
            if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
            if (block.type === "list")
              return (
                <ul key={i}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            return (
              <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-[4.2rem] first-letter:leading-[0.8] first-letter:text-rose-deep" : undefined}>
                {block.text}
              </p>
            );
          })}
        </div>
      </div>

      <Link href={`/journal/${next.slug}`} className="group block border-y border-line bg-ivory">
        <div className="container-site flex flex-col gap-6 py-16 sm:flex-row sm:items-center sm:justify-between lg:py-20">
          <div>
            <p className="eyebrow text-stone">Next Story</p>
            <p className="mt-4 font-serif text-headline font-medium group-hover:text-rose-deep">{next.title}</p>
          </div>
          <span className="relative block aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl sm:w-64">
            <Image src={next.image.src} alt={next.image.alt} fill sizes="256px" className="object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
          </span>
        </div>
      </Link>

      <section className="container-site py-20 lg:py-28">
        <h2 className="font-serif text-title font-medium">More from the Journal</h2>
        <ul className="mt-10 grid gap-10 sm:grid-cols-3">
          {more.map((a) => (
            <li key={a.slug}>
              <Link href={`/journal/${a.slug}`} className="group block">
                <span className="relative block aspect-[4/3] card">
                  <Image src={a.image.src} alt={a.image.alt} fill sizes="(min-width:640px) 30vw, 100vw" className="object-cover transition-transform duration-[1.4s] group-hover:scale-105" style={{ objectPosition: a.image.position }} />
                </span>
                <span className="eyebrow mt-5 block text-stone">{a.category}</span>
                <span className="mt-2 block font-serif text-[1.5rem] leading-tight group-hover:text-rose-deep">{a.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
