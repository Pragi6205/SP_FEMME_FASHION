import { images, type SiteImage } from "./images";
import type { DesignCategory } from "./designs";

export type Collection = {
  slug: string;
  title: string;
  /** One sentence used on cards. */
  summary: string;
  /** Short editorial introduction used on the detail page. */
  intro: string[];
  image: SiteImage;
  detailImages: SiteImage[];
  /** What a client can personalise within this collection. */
  considerations: { title: string; text: string }[];
  /** Gallery filter shown on the detail page. */
  galleryCategory: DesignCategory;
  /** Related service page. */
  service: { label: string; href: string };
  /** Service pre-selected in the consultation form. */
  formService: string;
};

export const collections: Collection[] = [
  {
    slug: "aari-maggam-embroidery",
    title: "Aari & Maggam Embroidery",
    summary: "Fine needlework, zari and beadwork composed into motifs drawn for each garment.",
    intro: [
      "Aari and maggam work bring texture and light to a garment — fine chain stitches, zari outlines, stones and beads arranged into motifs that follow the shape of a sleeve, a neckline or a back.",
      "Each design begins with a conversation about the occasion, the fabric and how much embellishment feels right, so the finished piece reflects your taste rather than a catalogue pattern.",
    ],
    image: images.pinkKurtaSleeve,
    detailImages: [images.lavenderSleeve, images.beadedFabric, images.bridalZari],
    considerations: [
      { title: "Motif & placement", text: "Choose where the work sits — sleeves, neckline, back or an all-over pattern." },
      { title: "Density", text: "From a delicate outline to rich, fully embellished coverage." },
      { title: "Materials", text: "Thread colour, zari, beads, stones and sequins selected to suit your fabric." },
    ],
    galleryCategory: "aari",
    service: { label: "Aari & Embroidery", href: "/aari-embroidery" },
    formService: "aari",
  },
  {
    slug: "custom-blouse-designs",
    title: "Custom Blouse Designs",
    summary: "Necklines, sleeves and backs designed and fitted around your own measurements.",
    intro: [
      "A well-made blouse changes how a sari sits and moves. We design the silhouette first — the neckline, the back, the sleeve length and the closure — and then decide how much detailing it needs.",
      "Whether you bring a reference image or start from a blank page, the design is refined together until the proportions feel right for you.",
    ],
    image: images.redCutworkTop,
    detailImages: [images.chikankariSeated, images.navyKurta, images.redKurtaSmile],
    considerations: [
      { title: "Silhouette", text: "Neckline depth, back design, sleeve style and length." },
      { title: "Fit", text: "Made to your measurements, with fittings arranged where needed." },
      { title: "Finishing", text: "Tassels, latkans, piping, lining and closures chosen with you." },
    ],
    galleryCategory: "blouse",
    service: { label: "Custom Blouse Designs", href: "/custom-blouse-designs" },
    formService: "blouse-design",
  },
  {
    slug: "bridal-occasion-wear",
    title: "Bridal & Occasion Wear",
    summary: "Considered pieces for weddings and ceremonies, planned well ahead of the day.",
    intro: [
      "Bridal and ceremony wear deserves time — time to plan the look, to choose the embroidery and to fit the garment properly.",
      "We work with you from the first idea to the final fitting, keeping your event date at the centre of the plan.",
    ],
    image: images.redOccasionSet,
    detailImages: [images.lilacDupatta, images.bridalZariDetail, images.bridalDrape],
    considerations: [
      { title: "Timeline", text: "Planned backwards from your event date, with fittings agreed in advance." },
      { title: "Coordination", text: "Blouse, embroidery and drape considered as one complete look." },
      { title: "Detail", text: "Motifs, initials or meaningful elements can be worked into the design." },
    ],
    galleryCategory: "bridal",
    service: { label: "Custom Outfits", href: "/custom-outfits" },
    formService: "bridal",
  },
  {
    slug: "festive-contemporary-wear",
    title: "Festive & Contemporary Wear",
    summary: "Celebration pieces with a modern line — lighter, easier, still personal.",
    intro: [
      "Festive dressing does not have to be heavy. This collection explores cleaner silhouettes, unexpected colour pairings and embroidery used with restraint.",
      "Ideal for festivals, receptions and family celebrations where you want something special that still feels like you.",
    ],
    image: images.mintPoolSet,
    detailImages: [images.blushCoord, images.lemonKurta, images.embroideredCropTop],
    considerations: [
      { title: "Colour", text: "Contrast blouses, tonal pairings or a single bold accent." },
      { title: "Comfort", text: "Lighter fabrics and finishes that suit a long day of celebrations." },
      { title: "Versatility", text: "Pieces that can be restyled with different saris and skirts." },
    ],
    galleryCategory: "festive",
    service: { label: "Custom Blouse Designs", href: "/custom-blouse-designs" },
    formService: "festive",
  },
  {
    slug: "personalised-embroidery",
    title: "Personalised Embroidery",
    summary: "Names, initials, florals and motifs that carry a story of their own.",
    intro: [
      "Personalised embroidery turns a garment into something only you could own — a name hidden in a border, a flower that means something, a date stitched inside a hem.",
      "Bring the idea and we will help translate it into a motif that sits naturally within the design.",
    ],
    image: images.floralHoop,
    detailImages: [images.hoopScissors, images.mirrorWork, images.threadAbstract],
    considerations: [
      { title: "Meaning", text: "Names, initials, dates, florals or symbols that matter to you." },
      { title: "Scale", text: "From a small detail to a statement panel." },
      { title: "Technique", text: "Thread, Aari, mirror or bead work chosen to suit the motif." },
    ],
    galleryCategory: "embroidery",
    service: { label: "Aari & Embroidery", href: "/aari-embroidery" },
    formService: "embroidery",
  },
  {
    slug: "custom-designed-outfits",
    title: "Custom-Designed Outfits",
    summary: "Complete looks designed from a sketch, a reference or a feeling.",
    intro: [
      "Sometimes the idea is bigger than a blouse — a lehenga set, a drape-ready ensemble or a coordinated outfit for an occasion.",
      "We design the complete look with you, balancing silhouette, fabric, embroidery and comfort.",
    ],
    image: images.lemonArchSet,
    detailImages: [images.chikankariGarden, images.pinkFloralSet, images.embroideredPanels],
    considerations: [
      { title: "Concept", text: "Start with references, a mood, a colour story or a sketch." },
      { title: "Fabric", text: "Fabric and lining options discussed against your budget." },
      { title: "Fittings", text: "Measurements and fittings coordinated to your schedule." },
    ],
    galleryCategory: "contemporary",
    service: { label: "Custom Outfits", href: "/custom-outfits" },
    formService: "other",
  },
];

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}
