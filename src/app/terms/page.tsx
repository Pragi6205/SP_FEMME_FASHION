import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/ui/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms for consultations, custom orders and use of the ${siteConfig.name} website.`,
  alternates: { canonical: "/terms" },
};

// General template — please review and adapt the order, payment, alteration and
// cancellation terms to match how the boutique actually works.
const sections: LegalSection[] = [
  {
    heading: "About these terms",
    body: [
      `These terms apply to your use of this website and to consultations and custom work arranged with ${siteConfig.name}.`,
    ],
  },
  {
    heading: "Enquiries and consultations",
    body: [
      "Submitting a form or message through this website is a request for a consultation. It is not an order and does not create an obligation for either party until the design, price and timeline have been agreed with you.",
    ],
  },
  {
    heading: "Custom orders",
    body: [
      "Each custom piece is quoted individually. The final design, materials, measurements, price, payment schedule and completion date are confirmed with you before work begins.",
      "Because custom pieces are made to your specifications, changes requested after work has started may affect the price and timeline.",
    ],
  },
  {
    heading: "Measurements and fittings",
    body: [
      "Please provide accurate measurements and attend agreed fittings where applicable. Fit adjustments are discussed at the fitting stage.",
    ],
  },
  {
    heading: "Fabrics, colours and handwork",
    body: [
      "Colours may look different on screen than in person. Embroidered and embellished work can show small variations, which are part of the character of a made-to-order piece.",
    ],
  },
  {
    heading: "Collection and delivery",
    body: ["Collection or delivery is arranged according to what we agree with you when the order is confirmed."],
  },
  {
    heading: "Website content",
    body: [
      "Designs and images on this website are shown for inspiration. Some photographs are representative and may be replaced as our portfolio grows. Please do not reproduce website content without permission.",
    ],
  },
  {
    heading: "Contact",
    body: ["If you have a question about these terms, please get in touch through our Contact page."],
  },
];

export default function TermsPage() {
  return <LegalPage eyebrow="Legal" title="Terms & Conditions" updated="October 2026" sections={sections} />;
}
