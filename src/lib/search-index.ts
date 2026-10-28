import { collections } from "@/data/collections";
import { designs, categoryLabel } from "@/data/designs";
import { articles } from "@/data/journal";
import { services } from "@/data/services";

export type SearchItem = { title: string; kind: string; href: string; text: string };

export const searchIndex: SearchItem[] = [
  ...Object.values(services).map((s) => ({
    title: s.eyebrow,
    kind: "Service",
    href: `/${s.slug}`,
    text: `${s.title} ${s.lede}`,
  })),
  ...collections.map((c) => ({
    title: c.title,
    kind: "Collection",
    href: `/collections/${c.slug}`,
    text: c.summary,
  })),
  ...designs.map((d) => ({
    title: d.name,
    kind: categoryLabel(d.categories[0]),
    href: `/gallery?design=${d.id}`,
    text: d.description,
  })),
  ...articles.map((a) => ({
    title: a.title,
    kind: "Journal",
    href: `/journal/${a.slug}`,
    text: a.intro,
  })),
  { title: "Book a Consultation", kind: "Page", href: "/book-consultation", text: "custom design enquiry appointment form" },
  { title: "Our Craft", kind: "Page", href: "/our-craft", text: "about studio process designer founder" },
  { title: "Contact", kind: "Page", href: "/contact", text: "phone email whatsapp address hours" },
];

export function searchSite(query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return searchIndex
    .map((item) => {
      const hay = `${item.title} ${item.kind} ${item.text}`.toLowerCase();
      const title = item.title.toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (!hay.includes(t)) return null;
        score += title.includes(t) ? 3 : 1;
      }
      return { item, score };
    })
    .filter((r): r is { item: SearchItem; score: number } => r !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((r) => r.item);
}
