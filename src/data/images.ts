/**
 * Image library.
 *
 * These are temporary Unsplash photographs showing modern embroidered looks,
 * chosen to set the art direction until the boutique's own photography is
 * available. To use the boutique's own photography, drop files into
 * /public/images and replace the `src` with a local path such as
 * "/images/hero.jpg" — nothing else needs to change.
 */

export type SiteImage = {
  src: string;
  alt: string;
  /** CSS object-position used when the image is cropped. */
  position?: string;
};

const unsplash = (id: string, width = 2000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const images = {
  hero: {
    src: "/images/hero-red-lehenga-4k.jpg",
    alt: "A smiling woman seated on sunlit steps in a red lehenga with a round-neck embroidered blouse, pink floral embroidery and a sheer dupatta",
    position: "55% 22%",
  },
  blushCutworkKurta: {
    src: unsplash("1702468507274-48e7175e4ebb", 2400),
    alt: "A woman in a blush-pink kurta with white thread and cutwork embroidery posing against a soft pink backdrop",
    position: "62% 30%",
  },
  consultation: {
    src: unsplash("1773439878124-62c684385ab4", 2200),
    alt: "A woman in a magenta kurta with gold and silver embroidery and a sage dupatta in a warm studio",
    position: "62% 30%",
  },
  pinkKurtaSleeve: {
    src: unsplash("1702468508641-a832a0b37bea"),
    alt: "Close-up of a pink kurta sleeve with white thread embroidery, mirror work and lace trim",
    position: "50% 40%",
  },
  lavenderSleeve: {
    src: unsplash("1702974779825-7103511e5471"),
    alt: "Close-up of a lavender organza sleeve with tonal thread embroidery and scalloped edging",
    position: "50% 50%",
  },
  redOccasionSet: {
    src: unsplash("1733470381571-c3d082e68457"),
    alt: "A woman in a red embroidered kurta set and dupatta in front of a floral arch",
    position: "50% 6%",
  },
  lemonArchSet: {
    src: unsplash("1733470324488-d0e10d014d80"),
    alt: "A woman in a lemon-yellow embroidered kurta set standing beneath a flower arch",
    position: "50% 22%",
  },
  chikankariGarden: {
    src: unsplash("1708534419572-6e6614a53ca1"),
    alt: "A young woman in a wine-coloured chikankari kurta sitting on the grass in a garden",
    position: "50% 30%",
  },
  chikankariSeated: {
    src: unsplash("1708534246051-7f47b279e94b"),
    alt: "A young woman in a wine chikankari kurta with white embroidery seated outdoors in soft light",
    position: "50% 25%",
  },
  mintPoolSet: {
    src: unsplash("1733209588000-339b73c36575"),
    alt: "A woman in a mint embroidered kurta and trousers standing beside a pool with greenery",
    position: "50% 22%",
  },
  mintStudioSet: {
    src: unsplash("1733209589578-97136bee7d7a"),
    alt: "A woman in a mint-green embroidered co-ord set in a bright modern living room",
    position: "50% 22%",
  },
  lilacDupatta: {
    src: unsplash("1705920824583-0e783235394d"),
    alt: "A woman in a lilac embroidered kurta with a sheer embroidered dupatta",
    position: "50% 18%",
  },
  blushCoord: {
    src: unsplash("1733209484732-6b094322a89f"),
    alt: "A woman in a blush-pink embroidered co-ord set in a minimal white living room",
    position: "50% 22%",
  },
  pinkFloralSet: {
    src: unsplash("1741847639057-b51a25d42892"),
    alt: "A woman in a pink kurta set with floral thread embroidery in a light studio",
    position: "50% 22%",
  },
  redCutworkTop: {
    src: unsplash("1622782045716-a05bcc4f5ae8"),
    alt: "A young woman in a red cutwork-embroidered crop top and black trousers crouching outdoors",
    position: "50% 25%",
  },
  lemonKurta: {
    src: unsplash("1733209587923-77ff33202f7c"),
    alt: "A woman in a lemon embroidered kurta and trousers holding a green handbag",
    position: "50% 22%",
  },
  redKurtaSmile: {
    src: unsplash("1763817959593-c3ec2b1ec257"),
    alt: "A smiling young woman in a red kurta with embroidered neckline and sunglasses in her hair",
    position: "50% 25%",
  },
  embroideredCropTop: {
    src: unsplash("1682683067633-190ac6961144"),
    alt: "A young woman in a multicoloured embroidered crop top and jeans smiling in the sun",
    position: "50% 25%",
  },
  navyKurta: {
    src: unsplash("1773439878067-4cdadc0b1124", 2200),
    alt: "A woman in a navy kurta with silver embroidery and a beige dupatta in a warm studio",
    position: "55% 25%",
  },
  goldPoolKurta: {
    src: unsplash("1733209589780-ece842d0dcf8"),
    alt: "A woman in a gold embroidered kurta and trousers beside a pool with a green wall",
    position: "50% 22%",
  },
  blueFloralSet: {
    src: unsplash("1733470381436-bb5a2a441708"),
    alt: "A woman in a powder-blue embroidered kurta set and dupatta beneath a flower arch",
    position: "50% 22%",
  },
  blackVelvetSet: {
    src: unsplash("1704119142483-1269733bcedb"),
    alt: "A woman in a black velvet embroidered suit with an embroidered organza dupatta",
    position: "50% 22%",
  },
  chikankariPortrait: {
    src: unsplash("1660118248632-103511f9b337"),
    alt: "A young woman in a white chikankari kurta adjusting her earring in soft green light",
    position: "50% 25%",
  },
  blackDupattaSet: {
    src: unsplash("1733470381591-c5dfb9df3c3d"),
    alt: "A woman in a black embroidered kurta with a printed dupatta beneath a floral arch",
    position: "50% 22%",
  },
  roseCoordSeated: {
    src: unsplash("1763971922538-5802acdd48b8"),
    alt: "A woman in a rose-pink embroidered kurta set seated on a printed ottoman",
    position: "50% 25%",
  },
  beadedFabric: {
    src: unsplash("1779167327071-963220d85043"),
    alt: "Close-up of ornate gold and silver sequin embroidery",
    position: "50% 50%",
  },
  mirrorWork: {
    src: unsplash("1792397471843-a2a4963088ad"),
    alt: "Thread embroidery with small mirrors on dark fabric",
    position: "50% 50%",
  },
  threadAbstract: {
    src: unsplash("1776164960293-d95467e628e7"),
    alt: "Colourful embroidered shapes on a dark textured fabric",
    position: "50% 50%",
  },
  floralHoop: {
    src: unsplash("1680034976848-d9fe95466aba"),
    alt: "Floral embroidery in progress on a linen cloth",
    position: "50% 50%",
  },
  hoopScissors: {
    src: unsplash("1671535108620-d169ce916f09"),
    alt: "Floral embroidery on dark fabric in a hoop beside a pair of scissors",
    position: "50% 50%",
  },
  handsSewing: {
    src: unsplash("1568288796918-03e7d93306bd"),
    alt: "Hands guiding a needle and thread through ivory fabric",
    position: "50% 50%",
  },
  fabricSelection: {
    src: unsplash("1781888699751-15f2b304693c"),
    alt: "Hands choosing between fabric samples on a design table",
    position: "50% 50%",
  },
  studioTable: {
    src: unsplash("1770970831074-6e88b6cc260b"),
    alt: "Fabric swatches and design sketches arranged on a table",
    position: "50% 50%",
  },
  embroideredPanels: {
    src: unsplash("1787220272461-2c53528c9349"),
    alt: "Panels of fabric with intricate floral embroidery hanging side by side",
    position: "50% 50%",
  },
  goldLace: {
    src: unsplash("1787554497632-1727c23e58cb"),
    alt: "A hand wearing gold rings resting on lace fabric with gold embroidery",
    position: "50% 50%",
  },
  bridalZari: {
    src: unsplash("1724856605022-106d6dd6e842"),
    alt: "Close-up of red bridal fabric with gold zari embroidery",
    position: "50% 50%",
  },
  bridalZariDetail: {
    src: unsplash("1724856604403-60304b28906c"),
    alt: "Detail of a red and gold bridal garment",
    position: "50% 50%",
  },
  bridalDrape: {
    src: unsplash("1724856604254-f7cf4e9c8f72"),
    alt: "Close-up of a red and gold bridal drape",
    position: "50% 50%",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
