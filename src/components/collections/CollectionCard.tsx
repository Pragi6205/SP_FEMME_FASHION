import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Collection } from "@/data/collections";
import { ImageReveal } from "@/components/motion/Reveal";

/** Rounded image card with its caption laid over the photograph. */
export function CollectionCard({
  collection,
  sizes,
  className = "",
  large = false,
}: {
  collection: Collection;
  sizes: string;
  className?: string;
  large?: boolean;
}) {
  return (
    <Link href={`/collections/${collection.slug}`} className={`group block ${className}`}>
      <ImageReveal className="card relative h-full min-h-[18rem] bg-ivory-deep">
        <Image
          src={collection.image.src}
          alt={collection.image.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-editorial)] group-hover:scale-[1.05]"
          style={{ objectPosition: collection.image.position }}
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/5 to-transparent" />
        <div className={`absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 text-paper ${large ? "p-6 sm:p-8" : "p-5"}`}>
          <div>
            <h3 className={`font-serif font-medium leading-tight tracking-[-0.03em] ${large ? "text-[1.75rem] sm:text-[2.1rem]" : "text-[1.3rem]"}`}>
              {collection.title}
            </h3>
            <p className={`mt-1.5 max-w-sm leading-snug text-paper/80 ${large ? "text-sm" : "text-[0.8125rem]"}`}>
              {collection.summary}
            </p>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-paper text-ink transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="size-4" strokeWidth={1.6} aria-hidden />
            <span className="sr-only">Explore {collection.title}</span>
          </span>
        </div>
      </ImageReveal>
    </Link>
  );
}
