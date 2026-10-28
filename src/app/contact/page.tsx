import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig, whatsappLink } from "@/config/site";
import { images } from "@/data/images";
import { PageIntro } from "@/components/ui/PageIntro";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact SP Femme Fashion for custom blouse design, Aari embroidery, bridal and occasion wear enquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { contact, social } = siteConfig;
  const wa = whatsappLink();

  const rows = [
    contact.phone && { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    wa && { icon: WhatsAppIcon, label: "WhatsApp", value: "Chat with the studio", href: wa, external: true },
    contact.email && { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    social.instagram && { icon: InstagramIcon, label: "Instagram", value: "Follow our work", href: social.instagram, external: true },
    contact.address.length > 0 && { icon: MapPin, label: "Studio", value: contact.address.join(", "), href: contact.mapUrl || undefined, external: true },
  ].filter(Boolean) as { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; label: string; value: string; href?: string; external?: boolean }[];

  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title={["Let’s talk about", "your design."]}
        intro="For a new design, the consultation form is the quickest way to share your ideas and references. For anything else, send us a message below."
        crumbs={[{ label: "Contact" }]}
      >
        <div className="mt-10">
          <ButtonLink href="/book-consultation" arrow>
            Book a Consultation
          </ButtonLink>
        </div>
      </PageIntro>

      <section className="bg-paper pb-24 lg:pb-36">
        <div className="container-site grid gap-16 border-t border-line pt-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {rows.length > 0 ? (
              <ul className="divide-y divide-line border-y border-line">
                {rows.map((r) => {
                  const Icon = r.icon;
                  const content = (
                    <>
                      <Icon className="size-5 shrink-0 text-rose-deep" strokeWidth={1.4} />
                      <span>
                        <span className="eyebrow block text-stone">{r.label}</span>
                        <span className="mt-1 block text-[0.9375rem] text-ink">{r.value}</span>
                      </span>
                    </>
                  );
                  return (
                    <li key={r.label}>
                      {r.href ? (
                        <a
                          href={r.href}
                          {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="flex items-center gap-5 py-5 hover:text-rose-deep"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-5 py-5">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="border-y border-line py-6 text-sm leading-6 text-stone">
                Send us a message using the form and we will get back to you.
              </p>
            )}

            <div className="mt-10 flex gap-5">
              <Clock className="mt-0.5 size-5 shrink-0 text-rose-deep" strokeWidth={1.4} aria-hidden />
              <div className="text-sm leading-6">
                <p className="eyebrow text-stone">Hours</p>
                {contact.hours.length > 0 && (
                  <dl className="mt-2 space-y-1">
                    {contact.hours.map((h) => (
                      <div key={h.days} className="flex gap-6">
                        <dt className="w-28 text-stone">{h.days}</dt>
                        <dd className="text-ink">{h.hours}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <p className="mt-2 text-ink-soft">{contact.appointmentNote}</p>
              </div>
            </div>

            <div className="relative mt-12 hidden aspect-[16/10] card lg:block">
              <Image src={images.fabricSelection.src} alt={images.fabricSelection.alt} fill sizes="40vw" className="object-cover" />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="font-serif text-title font-medium">Send a message</h2>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
