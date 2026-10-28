import { Check, Minus, Ruler, Palette, PenTool, Gem, MessageCircle, CalendarClock, Sparkles, Shirt } from "lucide-react";
import { Reveal, StaggerLines } from "@/components/motion/Reveal";
import { LogoMark } from "@/components/ui/Wordmark";

/** Custom vs. ready-made — general differences, not claims about other businesses. */
const rows = [
  { icon: Ruler, label: "Fit", custom: "Made to your measurements", other: "Standard sizes" },
  { icon: PenTool, label: "Design", custom: "Designed with you", other: "Fixed designs" },
  { icon: Sparkles, label: "Embroidery", custom: "Motifs & placement you choose", other: "Pre-set patterns" },
  { icon: Palette, label: "Colours", custom: "Your own palette", other: "Limited options" },
  { icon: Gem, label: "Personal details", custom: "Names, initials, meaningful motifs", other: "Not available" },
  { icon: MessageCircle, label: "Consultation", custom: "One-to-one design discussion", other: "Self-service" },
  { icon: CalendarClock, label: "Timeline", custom: "Planned around your occasion", other: "Off the shelf" },
  { icon: Shirt, label: "Fittings", custom: "Arranged where the design needs them", other: "Not offered" },
];

export function SeeTheDifference() {
  return (
    <section className="bg-paper px-4 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="font-serif text-[clamp(2rem,3.2vw,3rem)] font-medium leading-[1.04] tracking-[-0.045em]">
            <StaggerLines lines={["See the Difference"]} />
          </h2>
          <p className="mt-3 text-sm text-stone">What a custom-made piece offers that ready-made clothing can&apos;t.</p>
        </div>

        <Reveal className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-separate border-spacing-0 text-left text-[0.8125rem]">
            <caption className="sr-only">Custom design with SP Femme Fashion compared with ready-made clothing</caption>
            <thead>
              <tr>
                <th scope="col" className="w-[34%] pb-3 font-normal text-stone">
                  <span className="sr-only">Feature</span>
                </th>
                <th scope="col" className="w-[36%] rounded-t-2xl bg-rose-soft/60 px-5 pb-3 pt-5 text-center font-normal">
                  <span className="mx-auto flex w-fit items-center gap-2 text-ink">
                    <LogoMark className="size-5" />
                    <span className="font-serif text-[0.95rem] font-medium tracking-[0.12em]">SP FEMME</span>
                  </span>
                  <span className="mt-1 block text-[0.6875rem] text-stone">Custom made</span>
                </th>
                <th scope="col" className="w-[30%] px-5 pb-3 pt-5 text-center font-semibold text-ink">
                  Ready-made
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const Icon = r.icon;
                const last = i === rows.length - 1;
                return (
                  <tr key={r.label}>
                    <th scope="row" className="border-t border-line py-3.5 pr-4 font-normal text-ink-soft">
                      <span className="flex items-center gap-3">
                        <Icon className="size-4 shrink-0 text-stone" strokeWidth={1.5} aria-hidden />
                        {r.label}
                      </span>
                    </th>
                    <td className={`border-t border-rose/25 bg-rose-soft/60 px-5 py-3.5 text-ink ${last ? "rounded-b-2xl" : ""}`}>
                      <span className="flex items-center gap-2.5">
                        <Check className="size-4 shrink-0 text-rose-deep" strokeWidth={2} aria-hidden />
                        {r.custom}
                      </span>
                    </td>
                    <td className="border-t border-line px-5 py-3.5 text-stone">
                      <span className="flex items-center gap-2.5">
                        <Minus className="size-4 shrink-0 text-stone/70" strokeWidth={2} aria-hidden />
                        {r.other}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
