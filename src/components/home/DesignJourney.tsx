import { designJourney } from "@/data/content";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, StaggerLines } from "@/components/motion/Reveal";

export function DesignJourney({ showCta = true }: { showCta?: boolean }) {
  return (
    <section className="bg-paper px-3 py-3 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
      <div className="card bg-ivory p-7 sm:p-10 lg:rounded-[1.75rem] lg:p-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-serif text-[clamp(2.1rem,3.6vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.045em]">
              <StaggerLines lines={["Your Custom Design Journey"]} />
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-stone">
              Commissioning a piece is a conversation. Here is how it usually unfolds — every step is
              shaped around your occasion and timeline.
            </p>
          </div>
          {showCta && (
            <ButtonLink href="/book-consultation" variant="dark" className="h-10 shrink-0 self-start px-5 lg:self-auto">
              Start Your Design Journey
            </ButtonLink>
          )}
        </div>

        <ol className="mt-10 grid gap-2 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5">
          {designJourney.map((step, i) => (
            <Reveal
              as="li"
              key={step.number}
              delay={i * 0.07}
              className="group flex flex-col justify-between gap-10 rounded-2xl bg-paper p-6 transition-colors duration-500 hover:bg-night hover:text-paper lg:min-h-[17rem]"
            >
              <span className="font-serif text-[2.75rem] font-light leading-none tracking-[-0.04em] text-rose transition-colors group-hover:text-rose-soft">
                {step.number}
              </span>
              <div>
                <h3 className="font-serif text-[1.15rem] font-medium tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-2 text-[0.8125rem] leading-5 text-stone transition-colors group-hover:text-paper/70">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
