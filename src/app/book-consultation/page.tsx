import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { images } from "@/data/images";
import { designJourney } from "@/data/content";
import { siteConfig } from "@/config/site";
import { PageIntro } from "@/components/ui/PageIntro";
import { ConsultationFormFromParams } from "@/components/forms/ConsultationFormFromParams";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Request a custom design consultation with SP Femme Fashion — share your ideas, references and timeline for blouses, Aari embroidery, bridal and occasion wear.",
  alternates: { canonical: "/book-consultation" },
};

export default function BookConsultationPage() {
  return (
    <>
      <PageIntro
        eyebrow="Book a Consultation"
        title={["Begin your", "custom design."]}
        intro="Tell us about your idea in a few short steps. We'll get back to you to talk it through and arrange a consultation that suits you."
        crumbs={[{ label: "Book a Consultation" }]}
      />

      <section className="bg-paper pb-24 lg:pb-36">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Suspense fallback={<ConsultationForm />}>
              <ConsultationFormFromParams />
            </Suspense>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="space-y-10 lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] card">
                <Image
                  src={images.lavenderSleeve.src}
                  alt={images.lavenderSleeve.alt}
                  fill
                  sizes="(min-width:1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="eyebrow text-rose-deep">What Happens Next</p>
                <ol className="mt-5 space-y-4">
                  {designJourney.slice(0, 3).map((s) => (
                    <li key={s.number} className="grid grid-cols-[2.5rem_1fr] text-sm leading-6">
                      <span className="font-serif text-xl leading-6 text-rose">{s.number}</span>
                      <span>
                        <span className="font-semibold text-ink">{s.title}</span>
                        <span className="block text-stone">{s.text}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="border-t border-line pt-8">
                <p className="text-sm leading-6 text-ink-soft">Prefer to talk first?</p>
                <WhatsAppButton variant="outline" className="mt-4 w-full" />
                <p className="mt-4 text-xs leading-5 text-stone">{siteConfig.contact.appointmentNote}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
