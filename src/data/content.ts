import { images, type SiteImage } from "./images";

/** Service qualities shown beneath the hero. Only list what the boutique offers. */
export const serviceQualities = [
  { label: "Made to Measure", icon: "ruler" },
  { label: "Custom Design Consultations", icon: "message" },
  { label: "Intricate Handwork", icon: "needle" },
  { label: "Personalised Creations", icon: "sparkle" },
] as const;

export const designJourney = [
  {
    number: "01",
    title: "Share Your Inspiration",
    text: "Share reference images, ideas and preferences — a screenshot, a sketch or simply a feeling.",
  },
  {
    number: "02",
    title: "Discuss Your Design",
    text: "Together we discuss the garment, embroidery style, colour palette, budget and occasion.",
  },
  {
    number: "03",
    title: "Refine the Details",
    text: "The design, measurements, materials and finishing details are confirmed before work begins.",
  },
  {
    number: "04",
    title: "Craft Your Creation",
    text: "The agreed work is carried out, with fittings or progress updates coordinated where applicable.",
  },
  {
    number: "05",
    title: "Final Fitting & Collection",
    text: "Final fitting, collection or delivery is arranged according to what we have agreed.",
  },
] as const;

/**
 * "A Little About Our Craft" — editable studio content.
 * The founder entry is a placeholder: add the designer's real name, photo and
 * words before launch, or remove the `founder` block to hide it.
 */
export const craftStory = {
  founder: {
    name: "", // e.g. the founder's name — hidden while empty
    role: "Founder & Designer",
    image: images.goldLace,
    quote:
      "Every piece begins with listening — to the occasion, to the person, and to the story they want to wear.",
    // Replace with the designer's own words: how the studio began and what inspires the work.
    note: "SP Femme Fashion is a studio for women who want their clothes to feel personal — a blouse shaped to their fit, embroidery that carries meaning, an outfit designed for one important moment.",
  },
  chapters: [
    {
      title: "Design Preparation",
      label: "Sketch & Plan",
      text: "Ideas, references and measurements are gathered into a clear plan before a single stitch is placed.",
      image: images.studioTable,
    },
    {
      title: "Fabric & Thread Selection",
      label: "Materials",
      text: "Fabric, lining, thread and embellishments are chosen together so colour and texture work as one.",
      image: images.fabricSelection,
    },
    {
      title: "The Embroidery Process",
      label: "Embroidery",
      text: "Motifs are traced, framed and built up layer by layer — outlines first, then fill, then sparkle.",
      image: images.hoopScissors,
    },
    {
      title: "Finishing & Detailing",
      label: "Final Touches",
      text: "Edges, closures, linings and final details are completed with the same care as the embroidery.",
      image: images.handsSewing,
    },
  ],
} satisfies {
  founder: { name: string; role: string; image: SiteImage; quote: string; note: string };
  chapters: { title: string; label: string; text: string; image: SiteImage }[];
};

/**
 * Optional looping video for the Signature Craft section. Add a short, muted
 * clip (e.g. "/media/embroidery.mp4") to show embroidery in progress; when
 * empty, the still image is shown instead.
 */
export const craftVideo = {
  src: "",
  poster: images.lavenderSleeve,
};
