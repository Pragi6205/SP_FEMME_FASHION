import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/journal";
import { images } from "@/data/images";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { ImageReveal, StaggerLines } from "@/components/motion/Reveal";

export function JournalFeature() {
  const [feature, ...rest] = articles;
  const side = rest.slice(0, 3);

  return (
    <section className="bg-paper px-3 py-3 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
      <div className="grid gap-2 lg:grid-cols-[1.15fr_1fr_0.55fr]">
        {/* Feature article */}
        <Link href={`/journal/${feature.slug}`} className="group block">
          <ImageReveal className="card relative flex h-full min-h-[34rem] items-end justify-center text-center text-paper lg:min-h-[44rem]">
            <Image
              src={feature.image.src}
              alt={feature.image.alt}
              fill
              sizes="(min-width:1024px) 40vw, 100vw"
              className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-editorial)] group-hover:scale-[1.04]"
              style={{ objectPosition: feature.image.position }}
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/10" />
            <div className="relative w-full max-w-md px-6 pb-8 sm:pb-10">
              <p className="text-[0.75rem] text-paper/75">Featured Article</p>
              <h3 className="mt-3 font-serif text-[clamp(1.8rem,2.6vw,2.4rem)] font-medium leading-[1.06] tracking-[-0.04em]">
                {feature.title}
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-[0.8125rem] leading-5 text-paper/80">{feature.intro}</p>
              <span className={buttonClasses("dark", "mt-6 h-10 w-full !bg-night/90 group-hover:!bg-rose-deep")}>Read Article</span>
            </div>
          </ImageReveal>
        </Link>

        {/* Heading column */}
        <div className="flex flex-col gap-2">
          <div className="px-3 pb-4 pt-6 sm:px-4 lg:pt-2">
            <h2 className="font-serif text-[clamp(2rem,3vw,2.8rem)] font-medium leading-[1.04] tracking-[-0.045em]">
              <StaggerLines lines={["Stories in Thread"]} />
            </h2>
            <p className="mt-3 max-w-xs text-[0.8125rem] leading-5 text-stone">
              Thoughts, ideas and inspiration on embroidery, blouse design and styling.
            </p>
            <ButtonLink href="/journal" variant="outline" className="mt-5 h-8 border-line-strong px-4 text-[0.75rem]">
              View All Articles
            </ButtonLink>
          </div>
          <ImageReveal className="card relative min-h-[22rem] flex-1 bg-ivory" delay={0.1}>
            <Image
              src={images.floralHoop.src}
              alt={images.floralHoop.alt}
              fill
              sizes="(min-width:1024px) 33vw, 100vw"
              className="object-cover"
            />
          </ImageReveal>
        </div>

        {/* Side stories */}
        <ul className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1 lg:content-start lg:gap-5">
          {side.map((a) => (
            <li key={a.slug}>
              <Link href={`/journal/${a.slug}`} className="group block">
                <span className="card relative block aspect-[4/3.4] bg-ivory">
                  <Image
                    src={a.image.src}
                    alt={a.image.alt}
                    fill
                    sizes="(min-width:1024px) 15vw, (min-width:640px) 30vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                    style={{ objectPosition: a.image.position }}
                  />
                </span>
                <span className="mt-2.5 block text-[0.6875rem] text-stone">
                  {a.category} · {a.readingTime}
                </span>
                <span className="mt-1 block font-serif text-[1rem] font-medium leading-snug tracking-[-0.02em] group-hover:text-rose-deep">
                  {a.title}
                </span>
                <span className="mt-1 line-clamp-2 text-[0.75rem] leading-5 text-stone">{a.intro}</span>
                <span className="mt-2 inline-block text-[0.75rem] font-semibold">
                  <span className="link-underline pb-0.5 group-hover:bg-[length:100%_1px]">Read Article</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
