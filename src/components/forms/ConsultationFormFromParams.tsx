"use client";

import { useSearchParams } from "next/navigation";
import { ConsultationForm } from "./ConsultationForm";

/** Pre-fills the consultation form from ?service= and ?design= links. */
export function ConsultationFormFromParams() {
  const params = useSearchParams();
  const service = params.get("service") ?? "";
  const design = params.get("design") ?? "";
  return <ConsultationForm key={`${service}|${design}`} initialService={service} initialDesignId={design} />;
}
