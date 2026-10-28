import { StaggerLines } from "@/components/motion/Reveal";

type Props = {
  eyebrow?: string;
  title: string | string[];
  intro?: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2";
};

/** Editorial section heading: small eyebrow, large serif title, optional intro. */
export function SectionHeading({ eyebrow, title, intro, tone = "dark", className = "", as = "h2" }: Props) {
  const Tag = as;
  const lines = Array.isArray(title) ? title : [title];
  return (
    <div className={className}>
      {eyebrow && <p className={`eyebrow ${tone === "dark" ? "text-rose-deep" : "text-rose-soft"}`}>{eyebrow}</p>}
      <Tag className={`mt-4 font-serif text-headline font-medium tracking-[-0.035em] ${tone === "dark" ? "text-ink" : "text-paper"}`}>
        <StaggerLines lines={lines} />
      </Tag>
      {intro && (
        <div className={`mt-6 max-w-xl text-[0.9375rem] leading-7 ${tone === "dark" ? "text-stone" : "text-paper/70"}`}>
          {intro}
        </div>
      )}
    </div>
  );
}
