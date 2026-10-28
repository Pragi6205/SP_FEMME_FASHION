import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Collection } from "@/data/collections";
import { ImageReveal } from "@/components/motion/Reveal";

type Props = {
  collection: Collection;
  index: number;
  /** Tailwind aspect class for the image. */
  aspect?: string;
  sizes: string;
  /** Overlay places the caption on the image; below places it underneath. */
  caption?: "below" | "overlay";
  className?: string;
};

export function CollectionTile({
  collection,
  index,
  aspect = "aspect-[4/5]",
  sizes,
  caption = "below",
  className = "",
}: Props) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <Link href={`/collections/${collection.slug}`} className={`group block ${className}`}>
      <ImageReveal className={`relative card bg-ivory-deep ${aspect}`}>
        <Image
          src={collection.image.src}
          alt={collection.image.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-editorial)] group-hover:scale-[1.04]"
          style={{ objectPosition: collection.image.position }}
        />
        {caption === "overlay" && (
          <>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-paper sm:p-8">
              <p className="eyebrow text-paper/70">{number}</p>
              <h3 className="mt-3 font-serif text-title font-medium">{collection.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-paper/80">{collection.summary}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-semibold">
                <span className="link-underline pb-0.5 group-hover:bg-[length:100%_1px]">Explore</span>
                <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden />
              </span>
            </div>
          </>
        )}
      </ImageReveal>
      {caption === "below" && (
        <div className="mt-5 grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4">
          <span className="eyebrow text-stone">{number}</span>
          <h3 className="font-serif text-[1.6rem] font-medium leading-tight text-ink">{collection.title}</h3>
          <ArrowUpRight
            className="size-5 text-stone transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
            strokeWidth={1.3}
            aria-hidden
          />
          <p className="col-start-2 mt-2 text-sm leading-6 text-stone">{collection.summary}</p>
          <span className="col-start-2 mt-3 text-[0.8125rem] font-semibold text-ink">
            <span className="link-underline pb-0.5 group-hover:bg-[length:100%_1px]">Explore</span>
          </span>
        </div>
      )}
    </Link>
  );
}
