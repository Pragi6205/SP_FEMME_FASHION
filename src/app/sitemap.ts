import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { collections } from "@/data/collections";
import { articles } from "@/data/journal";

const staticRoutes = [
  { path: "/", priority: 1 },
  { path: "/collections", priority: 0.9 },
  { path: "/aari-embroidery", priority: 0.9 },
  { path: "/custom-blouse-designs", priority: 0.9 },
  { path: "/custom-outfits", priority: 0.9 },
  { path: "/gallery", priority: 0.8 },
  { path: "/book-consultation", priority: 0.8 },
  { path: "/our-craft", priority: 0.7 },
  { path: "/journal", priority: 0.7 },
  { path: "/contact", priority: 0.6 },
  { path: "/privacy-policy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((r) => ({ url: absoluteUrl(r.path), priority: r.priority })),
    ...collections.map((c) => ({ url: absoluteUrl(`/collections/${c.slug}`), priority: 0.8 })),
    ...articles.map((a) => ({ url: absoluteUrl(`/journal/${a.slug}`), priority: 0.6 })),
  ];
}
