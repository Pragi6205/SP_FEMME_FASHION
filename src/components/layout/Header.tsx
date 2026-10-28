"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Search, X } from "lucide-react";
import { mainNav, siteConfig, whatsappLink } from "@/config/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { SearchDialog } from "./SearchDialog";

/** Routes that open with a full-bleed image, so the header starts transparent. */
const overlayRoutes = [/^\/aari-embroidery$/, /^\/custom-blouse-designs$/, /^\/custom-outfits$/, /^\/our-craft$/, /^\/collections\/[^/]+$/];

const ease = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const overlay = overlayRoutes.some((r) => r.test(pathname));
  const transparent = overlay && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const instagram = siteConfig.social.instagram;
  const whatsapp = whatsappLink();

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ease-[var(--ease-editorial)] ${
          scrolled ? "px-3 pt-3 sm:px-5 sm:pt-4 lg:px-6 lg:pt-4" : "px-6 pt-6 sm:px-9 sm:pt-9 lg:px-10 lg:pt-10"
        }`}
      >
        <div
          className={`flex h-14 w-full items-center justify-between gap-4 rounded-2xl border px-4 transition-[background-color,color,border-color,box-shadow] duration-500 ease-[var(--ease-editorial)] sm:px-5 lg:h-[3.75rem] lg:px-6 ${
            transparent
              ? "border-paper/45 bg-paper/[0.06] text-paper backdrop-blur-[2px]"
              : "border-line bg-paper/95 text-ink shadow-[0_8px_30px_-18px_rgba(31,27,25,0.25)] backdrop-blur-md"
          }`}
        >
          <Wordmark onClick={closeMenu} />

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-8">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`link-underline rounded-sm pb-0.5 text-[0.8125rem] font-medium focus-visible:outline-offset-[6px] ${
                      isActive(item.href) ? "bg-[length:100%_1px]" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className={`hidden h-9 w-40 items-center justify-between rounded-lg border px-3 text-[0.8125rem] transition-colors md:flex ${
                transparent ? "border-paper/45 text-paper/80 hover:text-paper" : "border-line-strong text-stone hover:text-ink"
              }`}
            >
              Search
              <Search className="size-4" strokeWidth={1.5} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="grid size-10 place-items-center md:hidden"
              aria-label="Search"
            >
              <Search className="size-[18px]" strokeWidth={1.5} />
            </button>
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden size-10 place-items-center opacity-90 transition-opacity hover:opacity-100 sm:grid"
                aria-label="SP Femme Fashion on Instagram"
              >
                <InstagramIcon />
              </a>
            )}
            <Link
              href="/book-consultation"
              className={`ml-1 hidden h-9 items-center rounded-full px-4 text-[0.8125rem] font-semibold transition-colors duration-500 md:inline-flex ${
                transparent ? "bg-paper text-ink hover:bg-rose-soft" : "bg-ink text-paper hover:bg-rose-deep"
              }`}
            >
              Book a Consultation
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="-mr-2 grid size-10 place-items-center xl:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="size-6" strokeWidth={1.3} /> : <Menu className="size-6" strokeWidth={1.3} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-paper pt-24 xl:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}
          >
            <nav aria-label="Mobile" className="container-site flex-1 pt-6">
              <ul className="border-t border-line">
                {[...mainNav, { label: "Design Gallery", href: "/gallery" }, { label: "Contact", href: "/contact" }].map(
                  (item, i) => (
                    <motion.li
                      key={item.href}
                      className="border-b border-line"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className="flex items-baseline justify-between py-4 font-serif text-[1.85rem] font-medium leading-none tracking-[-0.035em] text-ink aria-[current=page]:text-rose-deep sm:text-[2.5rem]"
                      >
                        {item.label}
                        <span className="font-sans text-[0.6875rem] tracking-[0.2em] text-stone">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </motion.li>
                  ),
                )}
              </ul>
            </nav>
            <motion.div
              className="container-site flex flex-col gap-3 py-8 sm:flex-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link
                href="/book-consultation"
                onClick={closeMenu}
                className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-ink text-[0.8125rem] font-semibold tracking-[0.04em] text-paper"
              >
                Book a Consultation
              </Link>
              {whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-ink text-[0.8125rem] font-semibold tracking-[0.04em] text-ink"
                >
                  <WhatsAppIcon className="size-4" /> Chat on WhatsApp
                </a>
              )}
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line text-[0.8125rem] font-semibold tracking-[0.04em] text-ink"
                >
                  <InstagramIcon className="size-4" /> Instagram
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchDialog open={searchOpen} onClose={closeSearch} />
    </>
  );
}
