"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { categoryLabel, designCategories, designs as allDesigns, type Design } from "@/data/designs";
import { buttonClasses } from "@/components/ui/Button";

type FilterId = (typeof designCategories)[number]["id"];

type Props = {
  designs?: Design[];
  initialFilter?: FilterId;
  initialDesignId?: string | null;
  limit?: number;
  showFilters?: boolean;
  /** Called when the filter or open design changes, e.g. to sync the URL. */
  onStateChange?: (state: { filter: FilterId; designId: string | null }) => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function DesignGallery({
  designs = allDesigns,
  initialFilter = "all",
  initialDesignId = null,
  limit,
  showFilters = true,
  onStateChange,
}: Props) {
  const [filter, setFilter] = useState<FilterId>(initialFilter);
  const [openId, setOpenId] = useState<string | null>(initialDesignId);

  const filtered = useMemo(() => {
    const list = filter === "all" ? designs : designs.filter((d) => d.categories.includes(filter));
    return limit ? list.slice(0, limit) : list;
  }, [designs, filter, limit]);

  const openIndex = openId ? filtered.findIndex((d) => d.id === openId) : -1;
  const openDesign = openIndex >= 0 ? filtered[openIndex] : openId ? designs.find((d) => d.id === openId) : undefined;

  const update = (next: { filter?: FilterId; designId?: string | null }) => {
    const f = next.filter ?? filter;
    const id = next.designId === undefined ? openId : next.designId;
    if (next.filter !== undefined) setFilter(f);
    if (next.designId !== undefined) setOpenId(id);
    onStateChange?.({ filter: f, designId: id });
  };

  return (
    <div>
      {showFilters && (
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="toolbar" aria-label="Filter designs">
          <ul className="flex min-w-max gap-7 border-b border-line">
            {designCategories.map((c) => {
              const active = c.id === filter;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => update({ filter: c.id })}
                    className={`relative pb-4 text-[0.8125rem] font-medium tracking-[0.03em] transition-colors ${
                      active ? "text-ink" : "text-stone hover:text-ink"
                    }`}
                  >
                    {c.label}
                    {active && (
                      <motion.span
                        layoutId="gallery-filter"
                        className="absolute inset-x-0 -bottom-px h-px bg-ink"
                        transition={{ duration: 0.5, ease }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.ul
          key={filter}
          className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease }}
        >
          {filtered.map((d, i) => (
            <li key={d.id} className="mb-8 break-inside-avoid sm:mb-10">
              <button
                type="button"
                onClick={() => update({ designId: d.id })}
                className="group block w-full text-left"
                aria-label={`View ${d.name}`}
              >
                <span
                  className={`relative block card bg-ivory-deep ${
                    d.tall ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={d.image.src}
                    alt={d.image.alt}
                    fill
                    sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-editorial)] group-hover:scale-[1.04]"
                    style={{ objectPosition: d.image.position }}
                  />
                  <span className="absolute right-4 top-4 grid size-10 place-items-center bg-paper/90 text-ink opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Expand className="size-4" strokeWidth={1.4} aria-hidden />
                  </span>
                </span>
                <span className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="font-serif text-[1.375rem] font-medium leading-tight text-ink">{d.name}</span>
                  <span className="eyebrow shrink-0 text-stone">{categoryLabel(d.categories[0])}</span>
                </span>
              </button>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-stone">No designs in this category yet.</p>
      )}

      <Lightbox
        design={openDesign}
        onClose={() => update({ designId: null })}
        onPrev={openIndex > 0 ? () => update({ designId: filtered[openIndex - 1].id }) : undefined}
        onNext={
          openIndex >= 0 && openIndex < filtered.length - 1
            ? () => update({ designId: filtered[openIndex + 1].id })
            : undefined
        }
      />
    </div>
  );
}

function Lightbox({
  design,
  onClose,
  onPrev,
  onNext,
}: {
  design?: Design;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const open = Boolean(design);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onKey]);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = "";
      lastFocus.current?.focus?.();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {design && (
        <motion.div
          className="fixed inset-0 z-[80] flex bg-ink/85 lg:items-center lg:justify-center lg:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            className="relative grid h-full w-full overflow-y-auto bg-paper lg:rounded-[1.5rem] lg:h-auto lg:max-h-[90vh] lg:max-w-6xl lg:grid-cols-[1.25fr_1fr] lg:overflow-hidden"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/5] bg-ivory-deep lg:aspect-auto lg:h-[90vh] lg:max-h-[820px]">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={design.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                >
                  <Image
                    src={design.image.src}
                    alt={design.image.alt}
                    fill
                    sizes="(min-width:1024px) 55vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: design.image.position }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex flex-col p-6 sm:p-10 lg:overflow-y-auto">
              <div className="flex items-start justify-between gap-6">
                <p className="eyebrow text-rose-deep">
                  {design.categories.map((c) => categoryLabel(c)).join(" · ")}
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  className="-mr-2 -mt-2 grid size-10 shrink-0 place-items-center hover:text-rose-deep"
                  aria-label="Close"
                >
                  <X className="size-5" strokeWidth={1.4} />
                </button>
              </div>
              <h2 id="lightbox-title" className="mt-4 font-serif text-[2.5rem] font-medium leading-[1.05]">
                {design.name}
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-7 text-stone">{design.description}</p>
              {design.customisable && (
                <p className="mt-6 border-l border-rose pl-4 text-sm leading-6 text-ink-soft">
                  This design can be customised — colours, motifs, neckline and sleeve can all be adapted.
                  Customisation and pricing are confirmed through consultation.
                </p>
              )}
              <div className="mt-auto pt-10">
                <Link
                  href={`/book-consultation?design=${design.id}`}
                  className={buttonClasses("dark", "w-full")}
                >
                  Enquire About This Design
                </Link>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                  <button
                    type="button"
                    onClick={onPrev}
                    disabled={!onPrev}
                    className="inline-flex items-center gap-2 text-sm font-medium disabled:opacity-30"
                  >
                    <ArrowLeft className="size-4" strokeWidth={1.4} aria-hidden /> Previous
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    disabled={!onNext}
                    className="inline-flex items-center gap-2 text-sm font-medium disabled:opacity-30"
                  >
                    Next <ArrowRight className="size-4" strokeWidth={1.4} aria-hidden />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
