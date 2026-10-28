import Link from "next/link";
import { StaggerLines, Reveal } from "@/components/motion/Reveal";

type Crumb = { label: string; href?: string };

/** Text-led page opening used on pages without a full-bleed hero image. */
export function PageIntro({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: string[];
  intro?: React.ReactNode;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-paper pb-14 pt-36 lg:pb-20 lg:pt-48">
      <div className="container-site">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <p className="eyebrow mt-8 text-rose-deep">{eyebrow}</p>
        <h1 className="mt-5 max-w-5xl font-serif text-display font-medium tracking-[-0.035em]">
          <StaggerLines lines={title} animateOnMount />
        </h1>
        {intro && (
          <Reveal delay={0.3}>
            <div className="mt-8 max-w-2xl text-[1rem] leading-8 text-stone">{intro}</div>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-2 text-xs ${tone === "dark" ? "text-stone" : "text-paper/70"}`}>
        <li>
          <Link href="/" className="link-underline">
            Home
          </Link>
        </li>
        {items.map((c) => (
          <li key={c.label} className="flex items-center gap-2">
            <span aria-hidden>/</span>
            {c.href ? (
              <Link href={c.href} className="link-underline">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className={tone === "dark" ? "text-ink" : "text-paper"}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
