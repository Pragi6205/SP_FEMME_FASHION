"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { designCategories, getDesign } from "@/data/designs";
import { DesignGallery } from "./DesignGallery";

type FilterId = (typeof designCategories)[number]["id"];

/** Gallery whose filter and open design are reflected in the URL, so views can be shared. */
export function GalleryBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const category = params.get("category");
  const initialFilter = (designCategories.some((c) => c.id === category) ? category : "all") as FilterId;
  const designParam = params.get("design");
  const initialDesignId = designParam && getDesign(designParam) ? designParam : null;

  return (
    <DesignGallery
      initialFilter={initialFilter}
      initialDesignId={initialDesignId}
      onStateChange={({ filter, designId }) => {
        const next = new URLSearchParams();
        if (filter !== "all") next.set("category", filter);
        if (designId) next.set("design", designId);
        const qs = next.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      }}
    />
  );
}
