import { NextResponse } from "next/server";
import { isValidEmail, isValidPhone, labelFor, serviceOptions, uploadLimits } from "@/config/form";

/**
 * Enquiry endpoint used by the consultation and contact forms.
 *
 * INTEGRATION POINT
 * -----------------
 * Set ENQUIRY_FORWARD_URL to any service that accepts multipart form posts —
 * for example a Formspree form ("https://formspree.io/f/<id>"), Getform, Basin,
 * or your own webhook (Make, Zapier, n8n, a CRM). The validated fields and
 * reference images are forwarded as-is. Optionally set ENQUIRY_FORWARD_TOKEN to
 * send an `Authorization: Bearer <token>` header.
 *
 * When no destination is configured the route responds with 503 so the form
 * shows an honest error with a WhatsApp fallback — it never reports a false
 * success.
 */

type Kind = "consultation" | "contact";

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return error(400, "invalid_body", "We couldn't read your enquiry. Please try again.");
  }

  // Honeypot: real visitors never fill this hidden field.
  if (String(form.get("website") ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const kind: Kind = form.get("kind") === "contact" ? "contact" : "consultation";
  const get = (key: string) => String(form.get(key) ?? "").trim();

  const errors: Record<string, string> = {};
  if (get("name").length < 2) errors.name = "Please enter your name.";
  if (!isValidPhone(get("phone"))) errors.phone = "Please enter a valid phone number.";
  if (get("email") && !isValidEmail(get("email"))) errors.email = "Please enter a valid email address.";
  if (kind === "consultation") {
    if (!serviceOptions.some((s) => s.value === get("service"))) errors.service = "Please choose a service.";
    if (get("description").length < 10) errors.description = "Please describe your design in a few words.";
  } else if (get("message").length < 5) {
    errors.message = "Please write a short message.";
  }

  const files = form.getAll("references").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > uploadLimits.maxFiles) errors.references = `Please upload up to ${uploadLimits.maxFiles} images.`;
  let total = 0;
  for (const f of files) {
    total += f.size;
    if (!uploadLimits.acceptedTypes.includes(f.type)) errors.references = "Only JPG, PNG, WEBP or HEIC images are accepted.";
    if (f.size > uploadLimits.maxFileBytes) errors.references = "Each image must be 8 MB or smaller.";
  }
  if (total > uploadLimits.maxTotalBytes) errors.references = "Total upload size must be 25 MB or less.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, code: "validation", message: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  const destination = process.env.ENQUIRY_FORWARD_URL;
  if (!destination) {
    return error(
      503,
      "not_configured",
      "Online enquiries aren't connected yet, so your request was not sent. Please send it to us on WhatsApp or contact the studio directly.",
    );
  }

  const outgoing = new FormData();
  outgoing.set("_subject", kind === "contact" ? `New contact message from ${get("name")}` : `New consultation request — ${labelFor(serviceOptions, get("service"))}`);
  outgoing.set("enquiry_type", kind);
  for (const [key, value] of form.entries()) {
    if (key === "references" || key === "website" || key === "kind") continue;
    if (typeof value === "string" && value.trim()) outgoing.append(key, value.trim().slice(0, 4000));
  }
  if (kind === "consultation") outgoing.set("service_label", labelFor(serviceOptions, get("service")));
  files.forEach((f) => outgoing.append("references", f, f.name));

  try {
    const res = await fetch(destination, {
      method: "POST",
      body: outgoing,
      headers: {
        Accept: "application/json",
        ...(process.env.ENQUIRY_FORWARD_TOKEN ? { Authorization: `Bearer ${process.env.ENQUIRY_FORWARD_TOKEN}` } : {}),
      },
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) {
      console.error("Enquiry forward failed", res.status, await res.text().catch(() => ""));
      return error(502, "delivery_failed", "We couldn't deliver your enquiry just now. Please try again, or reach us on WhatsApp.");
    }
  } catch (e) {
    console.error("Enquiry forward error", e);
    return error(502, "delivery_failed", "We couldn't deliver your enquiry just now. Please try again, or reach us on WhatsApp.");
  }

  return NextResponse.json({ ok: true });
}

function error(status: number, code: string, message: string) {
  return NextResponse.json({ ok: false, code, message }, { status });
}
