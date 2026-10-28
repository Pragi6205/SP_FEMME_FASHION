import { images, type SiteImage } from "./images";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  category: string;
  intro: string;
  readingTime: string;
  image: SiteImage;
  body: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "how-to-choose-an-aari-blouse-design",
    title: "How to Choose an Aari Blouse Design",
    category: "Embroidery",
    intro: "Start with the occasion, then the sari — a simple way to arrive at Aari work that feels balanced rather than busy.",
    readingTime: "5 min read",
    image: images.pinkKurtaSleeve,
    body: [
      { type: "p", text: "Aari work can be as quiet as a single outline or as rich as a fully embellished bridal sleeve. The most beautiful designs are rarely the busiest — they are the ones where the embroidery, the sari and the occasion agree with each other." },
      { type: "h2", text: "Begin with the occasion" },
      { type: "p", text: "A wedding ceremony, a reception and a family function each ask for something different. Ceremonies often welcome dense, traditional motifs; receptions can carry more sparkle; smaller functions usually look best with lighter coverage that lets the fabric breathe." },
      { type: "h2", text: "Let the sari set the scale" },
      { type: "p", text: "A heavily woven silk already has a strong border and pallu. Pairing it with a blouse of equal intensity can compete for attention. Consider picking one hero — the sari or the blouse — and letting the other support it." },
      { type: "list", items: ["Heavy zari sari: lighter sleeve or neckline work", "Plain or pastel sari: a fuller embroidered blouse can lead the look", "Contrast sari: echo a single border colour in the thread"] },
      { type: "h2", text: "Think about placement" },
      { type: "p", text: "Sleeves are seen most in photographs; the back is seen when you walk away; the neckline frames your face. Decide where you want the eye to travel first, and concentrate the work there." },
      { type: "h2", text: "Bring references" },
      { type: "p", text: "Screenshots, sketches and photos of motifs you like are all useful. Even an image you only partly like helps — it shows what to keep and what to leave out." },
    ],
  },
  {
    slug: "neckline-and-sleeve-design-inspiration",
    title: "Neckline and Sleeve Design Inspiration",
    category: "Blouse Design",
    intro: "Necklines and sleeves shape the whole silhouette. A guide to the classic options and what each one does.",
    readingTime: "6 min read",
    image: images.chikankariSeated,
    body: [
      { type: "p", text: "Before choosing embroidery, it helps to choose a shape. The neckline and sleeve together decide how a blouse frames the shoulders, how it photographs and how comfortable it feels through a long day." },
      { type: "h2", text: "Front necklines" },
      { type: "list", items: ["Round: timeless and easy to embellish evenly", "Sweetheart: softer, romantic and flattering for many shapes", "Boat: elegant and modern, with a clean line across the collarbone", "High neck: polished and striking, ideal for statement embroidery"] },
      { type: "h2", text: "Back designs" },
      { type: "p", text: "The back is where a blouse can be most expressive — deep U and V shapes, keyhole openings, tie-ups with tassels or a sheer panel carrying embroidery. Consider how you will wear your hair and whether you would like support built in." },
      { type: "h2", text: "Sleeves" },
      { type: "p", text: "Elbow-length sleeves remain the favourite for embroidered bridal blouses because they give the work room to show. Three-quarter sleeves feel classic; short and cap sleeves feel lighter and contemporary; puffed and flared sleeves add drama." },
      { type: "p", text: "Whatever you choose, the final proportions are best confirmed at a fitting — what looks right in an image can change on the body." },
    ],
  },
  {
    slug: "exploring-embroidery-patterns",
    title: "Exploring Embroidery Patterns",
    category: "Craft",
    intro: "Butas, creepers, peacocks and geometric jaals — an introduction to motifs and how they translate onto a garment.",
    readingTime: "5 min read",
    image: images.mirrorWork,
    body: [
      { type: "p", text: "Embroidery motifs have their own vocabulary. Knowing a few of the common ones makes it easier to describe what you have in mind during a consultation." },
      { type: "h2", text: "Classic motifs" },
      { type: "list", items: ["Buta: a small repeated floral or paisley motif scattered across fabric", "Creeper (bel): a continuous vine, often used along borders and necklines", "Peacock and mango: traditional favourites for bridal and festive pieces", "Jaal: a net-like all-over pattern that fills a panel or sleeve"] },
      { type: "h2", text: "Contemporary directions" },
      { type: "p", text: "Modern embroidery often uses fewer motifs with more space around them: a single floral spray, abstract linework, or tonal thread that shows only in the light." },
      { type: "h2", text: "Combining techniques" },
      { type: "p", text: "Thread work, zari, beads, stones, sequins and mirrors can be combined in one design. The trick is hierarchy — one technique leads, the others support." },
    ],
  },
  {
    slug: "styling-custom-blouses-with-sarees",
    title: "Styling Custom Blouses with Sarees",
    category: "Styling",
    intro: "Contrast or tone-on-tone? A few principles for pairing a custom blouse with the sari it was made for — and the next one.",
    readingTime: "4 min read",
    image: images.redKurtaSmile,
    body: [
      { type: "p", text: "A custom blouse can be designed for one sari or made to work across several. Thinking about this early helps you get more from every piece." },
      { type: "h2", text: "Contrast" },
      { type: "p", text: "A contrasting blouse — red on ivory, coral on teal — creates instant energy. Pull the blouse colour from the sari border so the pairing looks intentional." },
      { type: "h2", text: "Tone-on-tone" },
      { type: "p", text: "Matching or near-matching colours feel calm and elongating. Embroidery becomes the texture, so tonal thread or gold zari works beautifully here." },
      { type: "h2", text: "Designing for more than one sari" },
      { type: "list", items: ["Choose neutral or metallic embroidery", "Keep the sleeve and neckline classic", "Consider gold, ivory, black or deep red as versatile bases"] },
    ],
  },
  {
    slug: "preparing-for-a-custom-outfit-consultation",
    title: "Preparing for a Custom Outfit Consultation",
    category: "Guide",
    intro: "What to bring, what to think about and the questions worth answering before your first conversation.",
    readingTime: "4 min read",
    image: images.studioTable,
    body: [
      { type: "p", text: "A little preparation turns a first consultation into a productive one. You do not need a finished idea — just a sense of direction." },
      { type: "h2", text: "What to bring" },
      { type: "list", items: ["Reference images, screenshots or sketches", "The sari or fabric, if you already have it", "A well-fitting blouse, as a guide for measurements", "Your event date and any fitting dates you are unavailable"] },
      { type: "h2", text: "Questions to consider" },
      { type: "list", items: ["What is the occasion, and what time of day?", "Which part of the design matters most to you?", "Is there a budget range you would like to stay within?", "Do you prefer a classic or contemporary feel?"] },
      { type: "h2", text: "Timelines" },
      { type: "p", text: "Embroidered work takes time. Getting in touch early leaves room for design changes and fittings without pressure. Timelines are always confirmed during the consultation." },
    ],
  },
  {
    slug: "contemporary-ways-to-wear-traditional-embroidery",
    title: "Contemporary Ways to Wear Traditional Embroidery",
    category: "Inspiration",
    intro: "Traditional techniques, modern silhouettes — ideas for wearing embroidery beyond the wedding season.",
    readingTime: "4 min read",
    image: images.goldLace,
    body: [
      { type: "p", text: "Traditional embroidery does not belong only to ceremonies. Used with intention, it can make everyday celebration wear feel considered and personal." },
      { type: "h2", text: "Edit the placement" },
      { type: "p", text: "Embroider only the cuffs, a collar line or a single shoulder. Concentrated work on a clean silhouette reads instantly modern." },
      { type: "h2", text: "Play with colour" },
      { type: "p", text: "Tonal embroidery — ivory on ivory, black on black — keeps the craft visible up close while feeling minimal from a distance." },
      { type: "h2", text: "Mix with modern pieces" },
      { type: "p", text: "An embroidered blouse can be worn with a pre-draped skirt, wide trousers or a plain silk sari for a look that moves easily between occasions." },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
