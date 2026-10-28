import type { Metadata } from "next";
import { services } from "@/data/services";
import { ServicePage } from "@/components/services/ServicePage";

const service = services["custom-blouse-designs"];

export const metadata: Metadata = {
  title: service.eyebrow,
  description: service.metaDescription,
  alternates: { canonical: "/custom-blouse-designs" },
  openGraph: { title: service.eyebrow, description: service.metaDescription, images: [{ url: service.heroImage.src, alt: service.heroImage.alt }] },
};

export default function Page() {
  return <ServicePage service={service} />;
}
