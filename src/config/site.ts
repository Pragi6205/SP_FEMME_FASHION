/**
 * Central business configuration for SP Femme Fashion.
 *
 * Every piece of business information that appears on the website lives here.
 * Fields left empty ("") are hidden automatically wherever they would appear,
 * so nothing is ever shown that the boutique has not confirmed.
 *
 * Values that differ between environments (phone numbers, form endpoints) are read
 * from environment variables first — see `.env.example`.
 */

export const siteConfig = {
  name: "SP Femme Fashion",
  shortName: "SP Femme",
  tagline: "Custom fashion & embroidery atelier",
  description:
    "SP Femme Fashion is a boutique atelier for custom blouse design, Aari and maggam embroidery, bridal and occasion wear, and personalised outfits — designed around you and crafted with intention.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_IN",
  copyrightYear: 2026,

  contact: {
    /** International format without "+" or spaces, e.g. 919876543210 */
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
    /** Display phone number, e.g. "+91 98765 43210" */
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
    /** Studio address lines. Leave empty to hide. */
    address: [] as string[],
    /** Google Maps link for the address. Leave empty to hide. */
    mapUrl: "",
    /** Opening hours, e.g. [{ days: "Mon – Sat", hours: "10:00 – 19:00" }] */
    hours: [] as { days: string; hours: string }[],
    /** Shown beside hours when the studio works by appointment. */
    appointmentNote: "Consultations are arranged by appointment.",
  },

  /** Only add profiles that genuinely exist. Empty URLs are hidden. */
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    facebook: "",
    youtube: "",
    pinterest: "",
  },

  /** Default WhatsApp message used by "Chat on WhatsApp" buttons. */
  whatsappGreeting:
    "Hello SP Femme Fashion, I would like to enquire about a custom design.",
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Aari & Embroidery", href: "/aari-embroidery" },
  { label: "Custom Designs", href: "/custom-blouse-designs" },
  { label: "Our Craft", href: "/our-craft" },
  { label: "Journal", href: "/journal" },
] as const;

export const footerNav = {
  collections: [
    { label: "All Collections", href: "/collections" },
    { label: "Aari & Maggam", href: "/collections/aari-maggam-embroidery" },
    { label: "Bridal & Occasion", href: "/collections/bridal-occasion-wear" },
    { label: "Festive & Contemporary", href: "/collections/festive-contemporary-wear" },
    { label: "Design Gallery", href: "/gallery" },
  ],
  services: [
    { label: "Aari & Embroidery", href: "/aari-embroidery" },
    { label: "Custom Blouse Designs", href: "/custom-blouse-designs" },
    { label: "Custom Outfits", href: "/custom-outfits" },
    { label: "Book a Consultation", href: "/book-consultation" },
  ],
  studio: [
    { label: "Our Craft", href: "/our-craft" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
} as const;

/** Builds a wa.me link, or returns null when no WhatsApp number is configured. */
export function whatsappLink(message: string = siteConfig.whatsappGreeting) {
  const number = siteConfig.contact.whatsappNumber.replace(/\D/g, "");
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
