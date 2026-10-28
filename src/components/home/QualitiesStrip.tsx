import { MessageCircle, Ruler, Sparkles, Spline } from "lucide-react";
import { serviceQualities } from "@/data/content";

const icons = { ruler: Ruler, message: MessageCircle, needle: Spline, sparkle: Sparkles } as const;

export function QualitiesStrip() {
  return (
    <section aria-label="What we offer" className="bg-paper">
      <ul className="container-site flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5 lg:gap-x-14">
        {serviceQualities.map((q) => {
          const Icon = icons[q.icon];
          return (
            <li key={q.label} className="flex items-center gap-2 text-[0.8125rem] text-ink-soft">
              <Icon className="size-4 shrink-0 text-ink" strokeWidth={1.5} aria-hidden />
              <span>
                <span className="font-semibold text-ink">{q.label.split(" ")[0]}</span>{" "}
                {q.label.split(" ").slice(1).join(" ")}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
