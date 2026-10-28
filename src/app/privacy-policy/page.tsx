import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/ui/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects the information you share with us.`,
  alternates: { canonical: "/privacy-policy" },
};

// This is a general template. Please have it reviewed so it reflects how the
// business actually stores enquiries and complies with applicable law.
const contactLine = siteConfig.contact.email
  ? `You can contact us about your data at ${siteConfig.contact.email}.`
  : "You can contact us about your data using the details on our Contact page.";

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      `${siteConfig.name} is a custom fashion and embroidery boutique. This policy explains how we handle personal information shared with us through this website.`,
    ],
  },
  {
    heading: "Information we collect",
    body: [
      "We only collect information that you choose to send us, such as through the consultation form, the contact form or WhatsApp:",
      [
        "Your name, phone number and, optionally, your email address",
        "Details about the design you are interested in, your occasion, preferred dates and budget",
        "Reference images you upload",
        "Your preferred method of consultation",
      ],
    ],
  },
  {
    heading: "How we use it",
    body: [
      "We use this information to respond to your enquiry, discuss and plan your design, arrange consultations and fittings, and keep you updated about your order. We do not sell your information or use it for unrelated marketing.",
    ],
  },
  {
    heading: "Service providers",
    body: [
      "Enquiries submitted through this website are delivered to us through a form-handling service. WhatsApp conversations are subject to WhatsApp's own privacy policy. These providers process information only to deliver the service to us.",
    ],
  },
  {
    heading: "Retention",
    body: [
      "We keep enquiry details for as long as needed to respond to you and complete any work you commission, and for a reasonable period afterwards for record keeping. You can ask us to delete your information at any time.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      `You can ask to see, correct or delete the personal information we hold about you. ${contactLine}`,
    ],
  },
  {
    heading: "Cookies",
    body: [
      "This website does not use advertising or tracking cookies. If analytics are added in future, this policy will be updated.",
    ],
  },
  {
    heading: "Changes",
    body: ["We may update this policy from time to time. The latest version will always be available on this page."],
  },
];

export default function PrivacyPage() {
  return <LegalPage eyebrow="Legal" title="Privacy Policy" updated="October 2026" sections={sections} />;
}
