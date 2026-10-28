import { collections } from "@/data/collections";
import { CollectionCard } from "@/components/collections/CollectionCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, StaggerLines } from "@/components/motion/Reveal";

export function CreationsSection() {
  const [aari, blouse, bridal, festive, personalised, outfits] = collections;

  return (
    <section id="creations" className="bg-paper px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
      <div className="grid gap-2 lg:grid-cols-2">
        <div className="grid gap-2">
          <Reveal className="card flex flex-col justify-between gap-10 bg-ivory p-7 sm:p-10 lg:min-h-[19rem] lg:p-12">
            <h2 className="font-serif text-[clamp(2.1rem,3.6vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.045em]">
              <StaggerLines lines={["Explore Our Creations"]} />
            </h2>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-sm leading-6 text-stone">
                Designed for weddings, festivals and the moments in between — each piece begins with a
                conversation and is shaped around the person who will wear it.
              </p>
              <ButtonLink href="/collections" variant="dark" className="h-10 shrink-0 px-5">
                All Collections
              </ButtonLink>
            </div>
          </Reveal>
          <div className="grid gap-2 sm:grid-cols-2">
            <CollectionCard collection={aari} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="aspect-[4/3.6] sm:aspect-auto sm:h-[26rem]" />
            <CollectionCard collection={blouse} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="aspect-[4/3.6] sm:aspect-auto sm:h-[26rem]" />
          </div>
        </div>
        <CollectionCard collection={bridal} large sizes="(min-width:1024px) 50vw, 100vw" className="aspect-[4/5] lg:aspect-auto" />
      </div>

      <div className="mt-2 grid gap-2 md:grid-cols-3">
        <CollectionCard collection={festive} sizes="(min-width:768px) 33vw, 100vw" className="aspect-[4/3.4]" />
        <CollectionCard collection={personalised} sizes="(min-width:768px) 33vw, 100vw" className="aspect-[4/3.4]" />
        <CollectionCard collection={outfits} sizes="(min-width:768px) 33vw, 100vw" className="aspect-[4/3.4]" />
      </div>
    </section>
  );
}
