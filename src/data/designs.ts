import { images, type SiteImage } from "./images";

export const designCategories = [
  { id: "all", label: "All Designs" },
  { id: "aari", label: "Aari Work" },
  { id: "blouse", label: "Blouse Designs" },
  { id: "bridal", label: "Bridal" },
  { id: "festive", label: "Festive" },
  { id: "contemporary", label: "Contemporary" },
  { id: "embroidery", label: "Custom Embroidery" },
] as const;

export type DesignCategory = Exclude<(typeof designCategories)[number]["id"], "all">;

export type Design = {
  id: string;
  name: string;
  categories: DesignCategory[];
  description: string;
  image: SiteImage;
  /** Shown as a tall tile in masonry layouts. */
  tall?: boolean;
  customisable: boolean;
};

/**
 * Portfolio entries. Replace the images with photographs of the boutique's own
 * work and update the names and descriptions to match.
 */
export const designs: Design[] = [
  {
    id: "blush-cutwork-kurta",
    name: "Blush Cutwork Kurta",
    categories: ["embroidery", "contemporary"],
    description: "A blush-pink kurta with white thread embroidery and cutwork panels — soft, modern and easy to wear.",
    image: images.blushCutworkKurta,
    tall: true,
    customisable: true,
  },
  {
    id: "lavender-organza-sleeve",
    name: "Lavender Organza Sleeve",
    categories: ["aari", "embroidery"],
    description: "Tonal thread embroidery on a lavender organza sleeve, finished with a scalloped edge.",
    image: images.lavenderSleeve,
    customisable: true,
  },
  {
    id: "red-cutwork-crop",
    name: "Red Cutwork Crop Top",
    categories: ["blouse", "contemporary"],
    description: "A cropped red top with cutwork embroidery at the hem and sleeves, styled with black trousers.",
    image: images.redCutworkTop,
    tall: true,
    customisable: true,
  },
  {
    id: "lemon-arch-set",
    name: "Lemon Embroidered Set",
    categories: ["festive", "embroidery"],
    description: "A lemon-yellow kurta set with tonal embroidery on the yoke and hem, made for daytime celebrations.",
    image: images.lemonArchSet,
    tall: true,
    customisable: true,
  },
  {
    id: "wine-chikankari",
    name: "Wine Chikankari Kurta",
    categories: ["aari", "contemporary"],
    description: "A wine-coloured kurta covered in fine white chikankari-style threadwork.",
    image: images.chikankariGarden,
    tall: true,
    customisable: true,
  },
  {
    id: "mint-pool-set",
    name: "Mint Day Set",
    categories: ["festive", "contemporary"],
    description: "A mint kurta and trouser set with delicate embroidery around the neckline and cuffs.",
    image: images.mintPoolSet,
    tall: true,
    customisable: true,
  },
  {
    id: "multicolour-crop-top",
    name: "Colour-Story Crop Top",
    categories: ["blouse", "embroidery"],
    description: "A multicoloured embroidered crop top worn with denim — embroidery for everyday.",
    image: images.embroideredCropTop,
    tall: true,
    customisable: true,
  },
  {
    id: "lilac-dupatta-set",
    name: "Lilac Organza Set",
    categories: ["festive", "aari"],
    description: "A lilac kurta with a sheer embroidered dupatta, ideal for evening functions.",
    image: images.lilacDupatta,
    tall: true,
    customisable: true,
  },
  {
    id: "pink-sleeve-detail",
    name: "Pink Mirror Sleeve",
    categories: ["aari", "embroidery"],
    description: "Thread embroidery, mirror work and lace trim on a pink kurta sleeve.",
    image: images.pinkKurtaSleeve,
    customisable: true,
  },
  {
    id: "blush-coord",
    name: "Blush Co-ord",
    categories: ["contemporary", "blouse"],
    description: "A relaxed blush co-ord set with embroidered placket and cuffs.",
    image: images.blushCoord,
    tall: true,
    customisable: true,
  },
  {
    id: "magenta-kurta",
    name: "Magenta Statement Kurta",
    categories: ["festive", "aari"],
    description: "A magenta kurta with silver and gold embroidery down the front, paired with a sage dupatta.",
    image: images.consultation,
    tall: true,
    customisable: true,
  },
  {
    id: "red-occasion-set",
    name: "Red Occasion Set",
    categories: ["bridal", "festive"],
    description: "A red embroidered kurta set with a matching dupatta — a modern choice for wedding functions.",
    image: images.redOccasionSet,
    tall: true,
    customisable: true,
  },
  {
    id: "pink-floral-set",
    name: "Pink Floral Set",
    categories: ["embroidery", "contemporary"],
    description: "A pink kurta set with floral thread embroidery scattered across the fabric.",
    image: images.pinkFloralSet,
    tall: true,
    customisable: true,
  },
  {
    id: "navy-silver-kurta",
    name: "Navy & Silver Kurta",
    categories: ["festive", "aari"],
    description: "A navy kurta with silver thread embroidery and a soft beige dupatta.",
    image: images.navyKurta,
    tall: true,
    customisable: true,
  },
  {
    id: "gold-pool-kurta",
    name: "Gold Tonal Kurta",
    categories: ["bridal", "contemporary"],
    description: "A gold kurta with tonal embroidery — understated shimmer for receptions and engagements.",
    image: images.goldPoolKurta,
    tall: true,
    customisable: true,
  },
  {
    id: "powder-blue-set",
    name: "Powder Blue Set",
    categories: ["festive", "embroidery"],
    description: "A powder-blue embroidered kurta set with a matching dupatta.",
    image: images.blueFloralSet,
    tall: true,
    customisable: true,
  },
  {
    id: "black-velvet-set",
    name: "Black Velvet Suit",
    categories: ["bridal", "aari"],
    description: "A black velvet suit with rich embroidery and an embroidered organza dupatta.",
    image: images.blackVelvetSet,
    tall: true,
    customisable: true,
  },
  {
    id: "white-chikankari",
    name: "White Chikankari",
    categories: ["embroidery", "contemporary"],
    description: "A white chikankari kurta in soft cotton — classic threadwork with a modern ease.",
    image: images.chikankariPortrait,
    tall: true,
    customisable: true,
  },
  {
    id: "lemon-everyday-kurta",
    name: "Lemon Everyday Kurta",
    categories: ["contemporary"],
    description: "A lemon kurta and trouser set with delicate embroidered borders.",
    image: images.lemonKurta,
    tall: true,
    customisable: true,
  },
  {
    id: "mint-studio-coord",
    name: "Mint Co-ord",
    categories: ["contemporary", "blouse"],
    description: "A mint-green co-ord with embroidered neckline and cuffs.",
    image: images.mintStudioSet,
    tall: true,
    customisable: true,
  },
  {
    id: "sequin-panel",
    name: "Gilded Sequin Panel",
    categories: ["embroidery"],
    description: "A study in metallic sequins and beadwork for a statement panel or border.",
    image: images.beadedFabric,
    customisable: true,
  },
  {
    id: "mirror-motif",
    name: "Mirror Motif Study",
    categories: ["embroidery"],
    description: "Thread and mirror work in red and violet — a starting point for a personalised border.",
    image: images.mirrorWork,
    customisable: true,
  },
];

export function getDesign(id: string) {
  return designs.find((d) => d.id === id);
}

export function categoryLabel(id: DesignCategory) {
  return designCategories.find((c) => c.id === id)?.label ?? id;
}
