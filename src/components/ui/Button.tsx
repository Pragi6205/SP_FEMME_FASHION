import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Variant = "dark" | "light" | "outline" | "outline-light" | "text" | "text-light";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full text-[0.8125rem] font-semibold tracking-[0.01em] transition-[background-color,color,border-color] duration-500 ease-[var(--ease-editorial)] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  dark: "h-11 px-6 bg-ink text-paper hover:bg-rose-deep",
  light: "h-11 px-6 bg-paper text-ink hover:bg-rose-soft",
  outline: "h-11 px-6 border border-ink/80 text-ink hover:bg-ink hover:text-paper",
  "outline-light": "h-11 px-6 border border-paper/70 text-paper hover:bg-paper hover:text-ink",
  text: "text-ink",
  "text-light": "text-paper",
};

export function buttonClasses(variant: Variant = "dark", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function ButtonLink({
  href,
  children,
  variant = "dark",
  className = "",
  arrow = false,
  external = false,
  ...rest
}: ButtonLinkProps) {
  const isText = variant === "text" || variant === "text-light";
  const content = (
    <>
      <span className={isText ? "link-underline pb-0.5" : undefined}>{children}</span>
      {arrow && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.5}
        />
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses(variant, className)}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClasses(variant, className)} {...rest}>
      {content}
    </Link>
  );
}
