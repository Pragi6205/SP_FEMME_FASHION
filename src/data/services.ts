import { images, type SiteImage } from "./images";
import type { DesignCategory } from "./designs";

export type Service = {
  slug: "aari-embroidery" | "custom-blouse-designs" | "custom-outfits";
  eyebrow: string;
  title: string;
  lede: string;
  metaDescription: string;
  heroImage: SiteImage;
  sideImage: SiteImage;
  statement: string;
  offerings: { title: string; text: string }[];
  considerations: string[];
  galleryCategories: DesignCategory[];
  /** Pre-selects the service in the consultation form. */
  formService: string;
};

export const services: Record<Service["slug"], Service> = {
  "aari-embroidery": {
    slug: "aari-embroidery",
    eyebrow: "Aari, Maggam & Custom Embroidery",
    title: "Embroidery, Composed for You.",
    lede: "Aari and maggam work, beadwork and personalised motifs — designed around your garment, your occasion and the amount of sparkle that feels right.",
    metaDescription:
      "Custom Aari and maggam embroidery for blouses, bridal wear and occasion outfits. Motifs, placement and materials designed with you at SP Femme Fashion.",
    heroImage: images.lavenderSleeve,
    sideImage: images.pinkKurtaSleeve,
    statement: "The smallest stitch can carry the greatest meaning.",
    offerings: [
      { title: "Aari Work", text: "Fine chain-stitch embroidery outlining motifs with thread and zari." },
      { title: "Maggam Work", text: "Embellished embroidery with beads, stones and sequins for richer coverage." },
      { title: "Bridal Embroidery", text: "Sleeves, backs and borders planned as part of a complete bridal look." },
      { title: "Personalised Motifs", text: "Names, initials, florals and symbols translated into embroidery." },
    ],
    considerations: [
      "Where the embroidery sits — sleeve, neckline, back or all over",
      "How dense the work should be, from outline to full coverage",
      "Thread, zari, bead and stone colours that suit your fabric",
      "Your event date, so the timeline can be planned comfortably",
    ],
    galleryCategories: ["aari", "embroidery"],
    formService: "aari",
  },
  "custom-blouse-designs": {
    slug: "custom-blouse-designs",
    eyebrow: "Custom Blouse Design & Stitching",
    title: "A Blouse Shaped Around You.",
    lede: "Necklines, backs and sleeves designed from your ideas and made to your measurements — simple, statement or bridal.",
    metaDescription:
      "Custom blouse design and stitching — necklines, sleeves, backs and embroidery designed and fitted to your measurements at SP Femme Fashion.",
    heroImage: images.navyKurta,
    sideImage: images.redCutworkTop,
    statement: "Fit first. Then everything else falls into place.",
    offerings: [
      { title: "Designer Blouses", text: "Original designs developed from your references and preferences." },
      { title: "Blouse Stitching", text: "Made-to-measure stitching for your own fabric and design." },
      { title: "Bridal Blouses", text: "Structured, embroidered blouses designed for the wedding day." },
      { title: "Contemporary Cuts", text: "Boat necks, high necks, puffed sleeves and modern silhouettes." },
    ],
    considerations: [
      "Neckline depth and shape, front and back",
      "Sleeve style and length",
      "Closures, lining, padding and finishing details",
      "Embroidery placement, if any",
    ],
    galleryCategories: ["blouse", "bridal"],
    formService: "blouse-design",
  },
  "custom-outfits": {
    slug: "custom-outfits",
    eyebrow: "Custom-Designed Outfits",
    title: "Complete Looks, Designed from the First Idea.",
    lede: "Lehenga sets, occasion wear and coordinated outfits — the silhouette, fabric and embroidery designed together.",
    metaDescription:
      "Custom-designed outfits for weddings, festivals and special occasions — lehenga sets, occasion wear and coordinated looks by SP Femme Fashion.",
    heroImage: images.lemonArchSet,
    sideImage: images.lilacDupatta,
    statement: "One idea. One person. One garment made for it.",
    offerings: [
      { title: "Bridal Outfits", text: "Bridal looks planned from concept to final fitting." },
      { title: "Occasion Wear", text: "Reception, engagement and celebration outfits." },
      { title: "Festive Sets", text: "Lighter coordinated pieces for festivals and family events." },
      { title: "Reworked Pieces", text: "Ideas for giving a meaningful fabric or sari a new form — discussed case by case." },
    ],
    considerations: [
      "The occasion, venue and time of day",
      "Silhouette and comfort over a long event",
      "Fabric, colour story and embellishment",
      "Budget range and timeline",
    ],
    galleryCategories: ["bridal", "festive", "contemporary"],
    formService: "bridal",
  },
};
