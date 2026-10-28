"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { searchSite } from "@/lib/search-index";

const suggestions = ["Aari", "Bridal blouse", "Neckline", "Consultation"];

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchSite(query);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const close = () => {
    setQuery("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] bg-ink/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search the site"
            className="bg-paper text-ink"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container-site pb-10 pt-6 sm:pt-8">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-stone">Search</p>
                <button
                  type="button"
                  onClick={close}
                  className="-mr-2 grid size-10 place-items-center text-ink hover:text-rose-deep"
                  aria-label="Close search"
                >
                  <X className="size-5" strokeWidth={1.4} />
                </button>
              </div>
              <label className="mt-4 flex items-center gap-4 border-b border-ink/70 pb-3">
                <Search className="size-6 shrink-0 text-stone" strokeWidth={1.3} aria-hidden />
                <span className="sr-only">Search designs, services and journal</span>
                <input
                  ref={inputRef}
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search designs, services, stories…"
                  className="w-full bg-transparent font-serif text-3xl outline-none placeholder:text-stone/60 sm:text-5xl"
                />
              </label>

              {query.trim() === "" ? (
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone">
                  <span>Try</span>
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="link-underline text-ink"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : results.length === 0 ? (
                <p className="mt-6 text-sm text-stone">
                  Nothing found for “{query}”. Try a broader word, or{" "}
                  <Link href="/book-consultation" onClick={close} className="link-underline text-ink">
                    describe your idea in a consultation request
                  </Link>
                  .
                </p>
              ) : (
                <ul className="mt-4 max-h-[55vh] divide-y divide-line overflow-y-auto">
                  {results.map((r) => (
                    <li key={r.href + r.title}>
                      <Link
                        href={r.href}
                        onClick={close}
                        className="group flex items-center justify-between gap-6 py-4"
                      >
                        <span>
                          <span className="eyebrow block text-rose-deep">{r.kind}</span>
                          <span className="mt-1 block font-serif text-2xl">{r.title}</span>
                        </span>
                        <ArrowUpRight
                          className="size-5 shrink-0 text-stone transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                          strokeWidth={1.3}
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
