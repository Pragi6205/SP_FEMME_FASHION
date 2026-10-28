import Link from "next/link";

/** Monogram mark: a needle crossing a thread loop. */
export function LogoMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <path d="M6 26 26 6" strokeLinecap="round" />
      <ellipse cx="24.2" cy="7.8" rx="1.4" ry="2.6" transform="rotate(45 24.2 7.8)" />
      <path d="M8 13c4-6 12-6 12 0s-8 7-12 13" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Typographic wordmark. To use a logo file instead, replace the contents of the
 * <Link> with <Image src="/images/logo.svg" ... />.
 */
export function Wordmark({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="SP Femme Fashion — home"
      className={`group inline-flex items-center gap-2.5 leading-none ${className}`}
    >
      <LogoMark className="size-6 shrink-0" />
      <span className="whitespace-nowrap font-serif text-[1.05rem] font-normal tracking-[0.22em]">
        SP FEMME
      </span>
    </Link>
  );
}
