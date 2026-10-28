"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { craftStory } from "@/data/content";
import { images } from "@/data/images";
import { ButtonLink } from "@/components/ui/Button";
import { StaggerLines } from "@/components/motion/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

export function CraftStory({ showCta = true }: { showCta?: boolean }) {
  const { founder, chapters } = craftStory;
  const rows = [
    {
      title: founder.name || "The Designer",
      label: founder.role,
      text: founder.note,
      image: founder.image,
    },
    ...chapters,
  ];
  const [active, setActive] = useState(2);

  return (
    <section className="bg-paper px-3 sm:px-5 lg:px-6">
      <div className="card relative isolate bg-night text-paper lg:rounded-[1.75rem]">
        <Image
          src={images.embroideredPanels.src}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover opacity-40"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(32,22,22,0.92)_0%,rgba(32,22,22,0.8)_45%,rgba(32,22,22,0.9)_100%)]" />

        <div className="px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            <h2 className="font-serif text-[clamp(2rem,3.4vw,3.2rem)] font-medium leading-[1.04] tracking-[-0.045em]">
              <StaggerLines lines={["A Little About", "Our Craft."]} />
            </h2>
            <p className="max-w-sm text-sm leading-6 text-paper/70 lg:justify-self-end">
              Behind every piece is a careful process — listening, planning, choosing materials and
              finishing each detail so the garment feels truly yours.
            </p>
          </div>

          <ol className="mt-12 lg:mt-16" onMouseLeave={() => setActive(2)}>
            {rows.map((r, i) => {
              const isActive = active === i;
              return (
                <li
                  key={r.title}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  tabIndex={0}
                  className={`relative grid gap-3 rounded-xl border-b border-paper/12 px-4 py-6 outline-none transition-colors duration-500 last:border-b-0 sm:grid-cols-[1fr_1fr] lg:grid-cols-[1.1fr_1fr_1.3fr] lg:items-center lg:py-7 ${
                    isActive ? "bg-paper/[0.09]" : ""
                  }`}
                >
                  <h3 className="font-serif text-[1.15rem] font-medium tracking-[-0.02em]">{r.title}</h3>
                  <p className="text-sm text-paper/70 lg:pl-[45%]">{r.label}</p>
                  <p className="text-[0.8125rem] leading-6 text-paper/65 sm:col-span-2 lg:col-span-1">{r.text}</p>
                  <div className="relative mt-2 aspect-[16/10] overflow-hidden rounded-lg sm:col-span-2 lg:hidden">
                    <Image src={r.image.src} alt={r.image.alt} fill sizes="90vw" className="object-cover" />
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        aria-hidden
                        className="pointer-events-none absolute left-[35%] top-1/2 z-10 hidden w-32 -translate-y-1/2 lg:block xl:w-36"
                        initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
                        animate={{ opacity: 1, scale: 1, rotate: -6 }}
                        exit={{ opacity: 0, scale: 0.94 }}
                        transition={{ duration: 0.45, ease }}
                      >
                        <div className="relative aspect-[3/4] overflow-hidden rounded-xl border-[3px] border-paper/90 shadow-2xl">
                          <Image src={r.image.src} alt="" fill sizes="150px" className="object-cover" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>

          {showCta && (
            <div className="mt-10">
              <ButtonLink href="/our-craft" variant="light" className="h-10 px-5">
                Discover Our Craft
              </ButtonLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
