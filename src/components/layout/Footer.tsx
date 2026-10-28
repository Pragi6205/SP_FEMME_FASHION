import Link from "next/link";
import { footerNav, siteConfig, whatsappLink } from "@/config/site";
import { Wordmark } from "@/components/ui/Wordmark";
import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  WhatsAppIcon,
  YoutubeIcon,
} from "@/components/ui/BrandIcons";

const socialIcons = {
  instagram: { label: "Instagram", Icon: InstagramIcon },
  facebook: { label: "Facebook", Icon: FacebookIcon },
  youtube: { label: "YouTube", Icon: YoutubeIcon },
  pinterest: { label: "Pinterest", Icon: PinterestIcon },
} as const;

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="eyebrow text-paper/50">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-underline text-sm text-paper/85 hover:text-paper">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { contact, social } = siteConfig;
  const whatsapp = whatsappLink();
  const socials = (Object.keys(socialIcons) as (keyof typeof socialIcons)[]).filter((k) => social[k]);

  return (
    <footer className="bg-paper px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
      <div className="card bg-night text-paper lg:rounded-[1.75rem]">
      <div className="container-site pt-16 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Wordmark />
            <p className="mt-8 max-w-sm text-sm leading-7 text-paper/70">
              A custom fashion and embroidery atelier for blouses, Aari and maggam work, bridal and
              occasion wear — every piece designed around the person who wears it.
            </p>
            <Link
              href="/book-consultation"
              className="mt-8 inline-flex h-10 items-center rounded-full border border-paper/40 px-5 text-[0.8125rem] font-semibold tracking-[0.04em] transition-colors duration-500 hover:bg-paper hover:text-ink"
            >
              Book a Consultation
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            <FooterColumn title="Collections" links={footerNav.collections} />
            <FooterColumn title="Custom Services" links={footerNav.services} />
            <FooterColumn title="Studio" links={footerNav.studio} />
          </div>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-paper/50">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm text-paper/85">
              {contact.phone && (
                <li>
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="link-underline">
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className="link-underline">
                    {contact.email}
                  </a>
                </li>
              )}
              {whatsapp && (
                <li>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 link-underline">
                    <WhatsAppIcon className="size-4" /> WhatsApp
                  </a>
                </li>
              )}
              {contact.address.length > 0 && (
                <li className="leading-6 text-paper/70">
                  {contact.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </li>
              )}
              <li>
                <Link href="/contact" className="link-underline">
                  All contact details
                </Link>
              </li>
            </ul>

            {contact.hours.length > 0 && (
              <dl className="mt-8 space-y-1 text-sm text-paper/70">
                {contact.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4">
                    <dt>{h.days}</dt>
                    <dd>{h.hours}</dd>
                  </div>
                ))}
              </dl>
            )}
            <p className="mt-6 text-xs leading-5 text-paper/50">{contact.appointmentNote}</p>

            {socials.length > 0 && (
              <ul className="mt-8 flex gap-2">
                {socials.map((k) => {
                  const { label, Icon } = socialIcons[k];
                  return (
                    <li key={k}>
                      <a
                        href={social[k]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${siteConfig.name} on ${label}`}
                        className="grid size-10 place-items-center rounded-full border border-paper/25 transition-colors hover:bg-paper hover:text-ink"
                      >
                        <Icon />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-paper/15 py-7 text-xs text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center font-serif text-[9vw] font-light leading-[0.75] tracking-[0.01em] text-paper/[0.08]"
      >
        SP FEMME FASHION
      </p>
      </div>
    </footer>
  );
}
