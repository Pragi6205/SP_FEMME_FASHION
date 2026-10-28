"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { images } from "@/data/images";
import { ButtonLink } from "@/components/ui/Button";
import { StaggerLines } from "@/components/motion/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

/** Warm cream sampled from the hero photograph's wall, so the image blends into the card. */
const HERO_TONE = "#e5cbb1";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "6%"]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-35%"]);

  return (
    <section ref={ref} className="bg-paper p-3 sm:p-5 lg:p-6">
      <div
        className="card relative isolate flex h-[calc(100svh-1.5rem)] min-h-[620px] flex-col justify-end text-ink sm:h-[calc(100svh-2.5rem)] lg:h-[calc(100svh-3rem)] lg:min-h-[640px] lg:justify-center lg:rounded-[1.75rem]"
        style={{ background: HERO_TONE }}
      >
        {/* Photograph fills the whole card */}
        <motion.div className="absolute inset-0 -z-10" style={{ y: imageY }}>
          <motion.div
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease }}
          >
            <Image
              src={images.hero.src}
              alt={images.hero.alt}
              fill
              preload
              quality={95}
              sizes="100vw"
              className="object-cover object-[50%_12%] lg:object-[50%_18%]"
            />
          </motion.div>
        </motion.div>
        {/* Soft cream wash keeps the copy readable over the wall */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(233,214,193,0.96)_0%,rgba(233,214,193,0.78)_30%,rgba(233,214,193,0)_52%)] lg:bg-[linear-gradient(90deg,rgba(229,203,177,0.92)_0%,rgba(229,203,177,0.7)_32%,rgba(229,203,177,0)_52%)]"
        />

        {/* Copy */}
        <div className="relative z-10 flex flex-col items-center px-6 pb-[23vw] text-center sm:px-10 sm:pb-[18vw] lg:w-[48%] lg:items-start lg:pb-[6vw] lg:pl-14 lg:pr-6 lg:pt-20 lg:text-left xl:pl-20">
          <motion.p
            className="eyebrow hidden text-rose-deep sm:block"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.25 }}
          >
            Custom Fashion &amp; Embroidery Atelier
          </motion.p>
          <h1 className="mt-5 font-serif text-[clamp(2.1rem,4vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.045em]">
            <StaggerLines lines={["Designed around you.", "Crafted with intention."]} delay={0.35} animateOnMount />
          </h1>
          <motion.p
            className="mt-4 max-w-[30rem] text-[0.875rem] leading-6 text-ink-soft sm:mt-5 sm:text-[0.9375rem] sm:leading-7"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.8 }}
          >
            Personalised fashion, intricate embroidery, and thoughtfully crafted designs that bring your
            vision to life<span className="hidden sm:inline"> — from Aari and maggam work to custom blouses, bridal and occasion wear</span>.
          </motion.p>
          <motion.div
            className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-7 lg:justify-start"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.95 }}
          >
            <ButtonLink href="/collections" variant="dark">
              Explore Our Creations
            </ButtonLink>
            <ButtonLink href="/book-consultation" variant="light">
              Begin Your Custom Design
            </ButtonLink>
          </motion.div>
        </div>

        <motion.p
          aria-hidden
          style={{ y: wordY }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex translate-y-[26%] select-none justify-center whitespace-nowrap font-serif text-[9.6vw] font-light leading-[0.8] tracking-[0.01em] text-paper/80"
        >
          <motion.span
            className="inline-block"
            initial={reduce ? false : { opacity: 0, y: "25%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{ duration: 1.8, ease, delay: 0.5 }}
          >
            SP FEMME FASHION
          </motion.span>
        </motion.p>
      </div>
    </section>
  );
}
