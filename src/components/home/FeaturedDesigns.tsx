"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { categoryLabel, designCategories, designs, type Design } from "@/data/designs";
import { ButtonLink } from "@/components/ui/Button";

type FilterId = (typeof designCategories)[number]["id"];
const ease = [0.22, 1, 0.36, 1] as const;

function DesignTile({ design, large = false }: { design: Design; large?: boolean }) {
  return (
    <Link href={`/gallery?design=${design.id}`} className={`group flex flex-col ${large ? "lg:row-span-2" : ""}`}>
      <span className={`card relative block bg-ivory ${large ? "aspect-[4/5] lg:aspect-auto lg:flex-1" : "aspect-[4/3.2]"}`}>
        <Image
          src={design.image.src}
          alt={design.image.alt}
          fill
          sizes={large ? "(min-width:1024px) 40vw, 100vw" : "(min-width:1024px) 25vw, 50vw"}
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-editorial)] group-hover:scale-[1.05]"
          style={{ objectPosition: design.image.position }}
        />
        <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 text-[0.6875rem] font-semibold text-ink backdrop-blur">
          {categoryLabel(design.categories[0])}
        </span>
      </span>
      <span className="mt-3 flex items-start justify-between gap-3 px-1">
        <span>
          <span className="block text-[0.8125rem] text-stone">{design.categories.map(categoryLabel).join(" · ")}</span>
          <span className={`mt-0.5 block font-serif font-medium tracking-[-0.03em] text-ink ${large ? "text-[1.6rem]" : "text-[1.15rem]"}`}>
            {design.name}
          </span>
        </span>
        <span className="mt-1 shrink-0 text-[0.75rem] font-semibold text-ink">
          <span className="link-underline pb-0.5 group-hover:bg-[length:100%_1px]">Enquire</span>
        </span>
      </span>
    </Link>
  );
}

export function FeaturedDesigns() {
  const [filter, setFilter] = useState<FilterId>("all");
  const list = (filter === "all" ? designs : designs.filter((d) => d.categories.includes(filter))).slice(0, 5);
  const [first, ...rest] = list;

  return (
    <section className="bg-paper px-3 py-20 sm:px-5 lg:px-6 lg:py-28">
      <div className="px-2 sm:px-3 lg:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-[clamp(2.1rem,3.6vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.045em]">
              New Creations
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-stone">
              A selection of recent designs. Every piece can be adapted to you — customisation and pricing
              are confirmed through consultation.
            </p>
          </div>
          <ButtonLink href="/gallery" variant="dark" className="h-10 shrink-0 self-start px-5 sm:self-auto">
            See All Designs
          </ButtonLink>
        </div>

        <div className="-mx-1 mt-8 flex gap-2 overflow-x-auto px-1 pb-1" role="toolbar" aria-label="Filter designs">
          {designCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={filter === c.id}
              onClick={() => setFilter(c.id)}
              className={`h-9 shrink-0 rounded-full border px-4 text-[0.8125rem] font-medium transition-colors ${
                filter === c.id ? "border-ink bg-ink text-paper" : "border-line-strong text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          className="mt-8 grid gap-x-2 gap-y-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:grid-rows-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease }}
        >
          {first && <DesignTile design={first} large />}
          {rest.map((d) => (
            <DesignTile key={d.id} design={d} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
