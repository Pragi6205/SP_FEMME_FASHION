"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, ImagePlus, LoaderCircle, RotateCcw, X } from "lucide-react";
import {
  budgetOptions,
  consultationMethods,
  isValidEmail,
  isValidPhone,
  labelFor,
  occasionOptions,
  serviceOptions,
  uploadLimits,
} from "@/config/form";
import { whatsappLink } from "@/config/site";
import { getDesign } from "@/data/designs";
import { ChoiceGroup, SelectField, TextArea, TextField } from "./Fields";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

type FormState = {
  name: string;
  phone: string;
  email: string;
  method: string;
  service: string;
  occasion: string;
  garment: string;
  embroidery: string;
  colours: string;
  date: string;
  budget: string;
  description: string;
  consent: boolean;
};

type Upload = { id: string; file: File; url: string };
type Errors = Partial<Record<keyof FormState | "references", string>>;
type Status = { state: "idle" } | { state: "submitting" } | { state: "success" } | { state: "error"; message: string };

const steps = [
  { title: "About You", short: "You" },
  { title: "Your Design", short: "Design" },
  { title: "Details & Timing", short: "Details" },
  { title: "References", short: "Images" },
  { title: "Review", short: "Review" },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

function validateStep(step: number, v: FormState): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (v.name.trim().length < 2) e.name = "Please enter your name.";
    if (!isValidPhone(v.phone)) e.phone = "Please enter a valid phone number, including country code if outside India.";
    if (v.email.trim() && !isValidEmail(v.email.trim())) e.email = "Please enter a valid email address.";
    if (!v.method) e.method = "Please choose how you would like to consult.";
  }
  if (step === 1) {
    if (!v.service) e.service = "Please choose the service you need.";
  }
  if (step === 2) {
    if (v.date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(v.date) < today) e.date = "Please choose a date in the future.";
    }
    if (v.description.trim().length < 10) e.description = "Tell us a little about your idea (at least a few words).";
  }
  if (step === 4 && !v.consent) e.consent = "Please confirm so we can contact you about this enquiry.";
  return e;
}

function formatBytes(n: number) {
  return n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`;
}

export function ConsultationForm({ initialService = "", initialDesignId = "" }: { initialService?: string; initialDesignId?: string }) {
  const design = initialDesignId ? getDesign(initialDesignId) : undefined;
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    method: "",
    service: serviceOptions.some((s) => s.value === initialService) ? initialService : "",
    occasion: "",
    garment: "",
    embroidery: "",
    colours: "",
    date: "",
    budget: "",
    description: design ? `I'm interested in the "${design.name}" design and would like to discuss adapting it.\n\n` : "",
    consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [honeypot, setHoneypot] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const uploadsRef = useRef<Upload[]>([]);

  useEffect(() => {
    uploadsRef.current = uploads;
  }, [uploads]);
  useEffect(() => () => uploadsRef.current.forEach((u) => URL.revokeObjectURL(u.url)), []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const scrollToPanel = () => {
    const top = (panelRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 110;
    if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
  };

  const focusFirstError = (e: Errors) => {
    const first = Object.keys(e)[0];
    if (!first) return;
    window.setTimeout(() => {
      const el = document.getElementById(first) ?? document.querySelector<HTMLElement>(`[name="${first}"]`);
      el?.focus();
    }, 50);
  };

  const goNext = () => {
    const e = validateStep(step, values);
    setErrors(e);
    if (Object.keys(e).length) return focusFirstError(e);
    setStep((s) => Math.min(s + 1, steps.length - 1));
    scrollToPanel();
  };

  const goTo = (target: number) => {
    // Only allow jumping back, or forward through steps that validate.
    for (let s = 0; s < target; s++) {
      const e = validateStep(s, values);
      if (Object.keys(e).length) {
        setStep(s);
        setErrors(e);
        return focusFirstError(e);
      }
    }
    setErrors({});
    setStep(target);
    scrollToPanel();
  };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    const accepted: Upload[] = [];
    let message = "";
    let total = uploads.reduce((n, u) => n + u.file.size, 0);
    for (const file of incoming) {
      if (uploads.length + accepted.length >= uploadLimits.maxFiles) {
        message = `You can upload up to ${uploadLimits.maxFiles} images.`;
        break;
      }
      if (!uploadLimits.acceptedTypes.includes(file.type)) {
        message = `“${file.name}” isn't a supported image. Please use JPG, PNG, WEBP or HEIC.`;
        continue;
      }
      if (file.size > uploadLimits.maxFileBytes) {
        message = `“${file.name}” is ${formatBytes(file.size)}. Each image must be 8 MB or smaller.`;
        continue;
      }
      if (total + file.size > uploadLimits.maxTotalBytes) {
        message = "Total upload size must be 25 MB or less.";
        continue;
      }
      total += file.size;
      accepted.push({ id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`, file, url: URL.createObjectURL(file) });
    }
    if (accepted.length) setUploads((u) => [...u, ...accepted]);
    setErrors((e) => ({ ...e, references: message || undefined }));
    if (fileInput.current) fileInput.current.value = "";
  };

  const removeUpload = (id: string) => {
    setUploads((list) => {
      const target = list.find((u) => u.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return list.filter((u) => u.id !== id);
    });
    setErrors((e) => ({ ...e, references: undefined }));
  };

  const whatsappSummary = () => {
    const lines = [
      "Hello SP Femme Fashion, I'd like to request a design consultation.",
      "",
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      values.email && `Email: ${values.email}`,
      values.service && `Service: ${labelFor(serviceOptions, values.service)}`,
      values.occasion && `Occasion: ${values.occasion}`,
      values.garment && `Garment: ${values.garment}`,
      values.embroidery && `Embroidery style: ${values.embroidery}`,
      values.colours && `Colours: ${values.colours}`,
      values.date && `Date needed: ${values.date}`,
      values.budget && `Budget: ${values.budget}`,
      values.method && `Preferred consultation: ${labelFor(consultationMethods, values.method)}`,
      values.description && `\nIdea: ${values.description.trim()}`,
      uploads.length ? `\nI have ${uploads.length} reference image(s) to share here.` : "",
    ];
    return lines.filter(Boolean).join("\n");
  };

  const submit = async () => {
    for (let s = 0; s < steps.length; s++) {
      const e = validateStep(s, values);
      if (Object.keys(e).length) {
        setStep(s);
        setErrors(e);
        return focusFirstError(e);
      }
    }
    setStatus({ state: "submitting" });
    const data = new FormData();
    data.set("kind", "consultation");
    data.set("website", honeypot);
    (Object.keys(values) as (keyof FormState)[]).forEach((k) => {
      if (k === "consent") return;
      data.set(k, String(values[k]));
    });
    if (values.method) data.set("method", labelFor(consultationMethods, values.method));
    if (design) data.set("design_reference", `${design.name} (${design.id})`);
    uploads.forEach((u) => data.append("references", u.file, u.file.name));

    try {
      const res = await fetch("/api/enquiry", { method: "POST", body: data });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; message?: string; errors?: Errors } | null;
      if (res.ok && json?.ok) {
        setStatus({ state: "success" });
        scrollToPanel();
        return;
      }
      if (json?.errors && Object.keys(json.errors).length) setErrors(json.errors);
      setStatus({
        state: "error",
        message: json?.message ?? "Something went wrong while sending your enquiry. Please try again.",
      });
    } catch {
      setStatus({
        state: "error",
        message: "We couldn't reach the server. Please check your connection and try again.",
      });
    }
  };

  const wa = whatsappLink(whatsappSummary());

  if (status.state === "success") {
    return (
      <div ref={panelRef} className="rounded-[1.25rem] border border-line bg-paper p-8 sm:p-14" role="status" aria-live="polite">
        <span className="grid size-14 place-items-center rounded-full bg-ink text-paper">
          <Check className="size-6" strokeWidth={1.5} aria-hidden />
        </span>
        <h2 className="mt-8 font-serif text-[2.75rem] font-medium leading-[1.05]">Thank you, {values.name.split(" ")[0]}.</h2>
        <p className="mt-5 max-w-lg text-[0.9375rem] leading-7 text-stone">
          Your consultation request has been sent. We will contact you on {values.phone}
          {values.method ? ` to arrange a ${labelFor(consultationMethods, values.method).toLowerCase()}` : ""}.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/gallery" className={buttonClasses("dark")}>
            Browse the Gallery
          </Link>
          <Link href="/journal/preparing-for-a-custom-outfit-consultation" className={buttonClasses("outline")}>
            How to Prepare
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={panelRef}>
      {/* Step indicator */}
      <nav aria-label="Form progress">
        <p className="text-sm text-stone">
          Step {step + 1} of {steps.length} — <span className="text-ink">{steps[step].title}</span>
        </p>
        <ol className="mt-4 grid grid-cols-5 gap-1.5">
          {steps.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => (i < step ? goTo(i) : i > step ? goTo(i) : undefined)}
                aria-current={i === step ? "step" : undefined}
                aria-label={`${s.title}${i < step ? " (completed)" : ""}`}
                className="group block w-full text-left"
              >
                <span className="relative block h-[2px] overflow-hidden bg-line">
                  <motion.span
                    className="absolute inset-y-0 left-0 bg-ink"
                    initial={false}
                    animate={{ width: i <= step ? "100%" : "0%" }}
                    transition={{ duration: 0.6, ease }}
                  />
                </span>
                <span className={`eyebrow mt-3 hidden sm:block ${i === step ? "text-ink" : "text-stone group-hover:text-ink"}`}>
                  {String(i + 1).padStart(2, "0")} {s.short}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (step < steps.length - 1) goNext();
          else submit();
        }}
        className="mt-12"
      >
        {/* Honeypot for spam bots */}
        <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </label>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease }}
          >
            <h2 className="font-serif text-[2.25rem] font-medium leading-tight">{steps[step].title}</h2>

            {step === 0 && (
              <div className="mt-10 grid gap-9 sm:grid-cols-2">
                <TextField id="name" label="Your name" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} error={errors.name} wrapperClassName="sm:col-span-2" />
                <TextField id="phone" label="Phone number" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" value={values.phone} onChange={(e) => set("phone", e.target.value)} error={errors.phone} />
                <TextField id="email" label="Email" type="email" autoComplete="email" optional value={values.email} onChange={(e) => set("email", e.target.value)} error={errors.email} />
                <div className="sm:col-span-2">
                  <ChoiceGroup name="method" legend="Preferred consultation method" options={consultationMethods} value={values.method} onChange={(v) => set("method", v)} error={errors.method} columns="grid-cols-2 lg:grid-cols-4" />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="mt-10 grid gap-9 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <ChoiceGroup name="service" legend="Service required" options={serviceOptions} value={values.service} onChange={(v) => set("service", v)} error={errors.service} />
                </div>
                <SelectField id="occasion" label="Occasion" optional options={occasionOptions} value={values.occasion} onChange={(e) => set("occasion", e.target.value)} />
                <TextField id="garment" label="Preferred garment" optional placeholder="e.g. blouse, lehenga set, kurta" value={values.garment} onChange={(e) => set("garment", e.target.value)} />
                <TextField id="embroidery" label="Preferred embroidery style" optional placeholder="e.g. Aari, maggam, minimal thread work" value={values.embroidery} onChange={(e) => set("embroidery", e.target.value)} />
                <TextField id="colours" label="Preferred colours" optional placeholder="e.g. ivory with gold, deep red" value={values.colours} onChange={(e) => set("colours", e.target.value)} />
              </div>
            )}

            {step === 2 && (
              <div className="mt-10 grid gap-9 sm:grid-cols-2">
                <TextField id="date" label="Event or required completion date" type="date" optional value={values.date} onChange={(e) => set("date", e.target.value)} error={errors.date} hint="Helps us plan fittings and timelines." />
                <SelectField id="budget" label="Approximate budget" optional options={budgetOptions} value={values.budget} onChange={(e) => set("budget", e.target.value)} />
                <TextArea id="description" label="Describe your design" wrapperClassName="sm:col-span-2" placeholder="Tell us about the look you have in mind — neckline, sleeves, motifs, the feeling you want…" value={values.description} onChange={(e) => set("description", e.target.value)} error={errors.description} maxLength={3000} />
              </div>
            )}

            {step === 3 && (
              <div className="mt-10">
                <p className="max-w-lg text-sm leading-6 text-stone">
                  Add up to {uploadLimits.maxFiles} reference images — screenshots, sketches or photos of
                  fabric. JPG, PNG, WEBP or HEIC, up to 8 MB each. This step is optional.
                </p>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    addFiles(e.dataTransfer.files);
                  }}
                  className={`mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-12 text-center transition-colors ${
                    dragging ? "border-ink bg-ivory" : "border-line-strong"
                  }`}
                >
                  <ImagePlus className="size-7 text-rose-deep" strokeWidth={1.2} aria-hidden />
                  <p className="mt-4 text-sm text-ink">Drag images here, or</p>
                  <button type="button" onClick={() => fileInput.current?.click()} className={buttonClasses("outline", "mt-4 h-11 px-5")}>
                    Choose Images
                  </button>
                  <input
                    ref={fileInput}
                    id="references"
                    type="file"
                    multiple
                    accept={uploadLimits.acceptAttr}
                    className="sr-only"
                    onChange={(e) => addFiles(e.target.files)}
                    aria-describedby={errors.references ? "references-error" : undefined}
                  />
                  <p className="mt-4 text-xs text-stone">
                    {uploads.length} of {uploadLimits.maxFiles} added
                  </p>
                </div>
                {errors.references && (
                  <p id="references-error" role="alert" className="mt-3 text-xs font-medium text-[#a2392f]">
                    {errors.references}
                  </p>
                )}
                {uploads.length > 0 && (
                  <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {uploads.map((u) => (
                      <li key={u.id} className="group relative">
                        <span className="relative block aspect-square overflow-hidden rounded-xl bg-ivory-deep">
                          {/* Local object URLs can't go through the image optimiser. */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={u.url} alt={`Reference upload: ${u.file.name}`} className="size-full object-cover" />
                        </span>
                        <span className="mt-2 block truncate text-xs text-stone">
                          {u.file.name} · {formatBytes(u.file.size)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeUpload(u.id)}
                          className="absolute right-2 top-2 grid size-8 place-items-center bg-paper/95 text-ink hover:bg-ink hover:text-paper"
                          aria-label={`Remove ${u.file.name}`}
                        >
                          <X className="size-4" strokeWidth={1.5} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="mt-10">
                <dl className="divide-y divide-line border-y border-line">
                  {[
                    { step: 0, label: "Name", value: values.name },
                    { step: 0, label: "Phone", value: values.phone },
                    { step: 0, label: "Email", value: values.email },
                    { step: 0, label: "Consultation", value: labelFor(consultationMethods, values.method) },
                    { step: 1, label: "Service", value: labelFor(serviceOptions, values.service) },
                    { step: 1, label: "Occasion", value: values.occasion },
                    { step: 1, label: "Garment", value: values.garment },
                    { step: 1, label: "Embroidery style", value: values.embroidery },
                    { step: 1, label: "Colours", value: values.colours },
                    { step: 2, label: "Date", value: values.date },
                    { step: 2, label: "Budget", value: values.budget },
                    { step: 2, label: "Design", value: values.description },
                    { step: 3, label: "References", value: uploads.length ? `${uploads.length} image${uploads.length > 1 ? "s" : ""}` : "" },
                  ].map((row) => (
                    <div key={row.label} className="grid grid-cols-[8rem_1fr_auto] gap-4 py-3.5 text-sm sm:grid-cols-[11rem_1fr_auto]">
                      <dt className="text-stone">{row.label}</dt>
                      <dd className="whitespace-pre-line break-words text-ink">{row.value || <span className="text-stone/70">—</span>}</dd>
                      <dd>
                        <button type="button" onClick={() => goTo(row.step)} className="link-underline text-xs font-semibold text-rose-deep">
                          Edit<span className="sr-only"> {row.label}</span>
                        </button>
                      </dd>
                    </div>
                  ))}
                </dl>
                {uploads.length > 0 && (
                  <ul className="mt-5 flex gap-3">
                    {uploads.map((u) => (
                      <li key={u.id} className="relative size-16 overflow-hidden rounded-lg bg-ivory-deep">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={u.url} alt="" className="size-full object-cover" />
                      </li>
                    ))}
                  </ul>
                )}
                <label className="mt-8 flex cursor-pointer items-start gap-3 text-sm leading-6 text-ink-soft">
                  <input
                    id="consent"
                    type="checkbox"
                    checked={values.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    className="mt-1 size-4 shrink-0 accent-[#1f1b19]"
                    aria-invalid={errors.consent ? true : undefined}
                    aria-describedby={errors.consent ? "consent-error" : undefined}
                  />
                  <span>
                    I agree to be contacted about this enquiry and have read the{" "}
                    <Link href="/privacy-policy" className="underline underline-offset-2">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                {errors.consent && (
                  <p id="consent-error" role="alert" className="mt-2 text-xs font-medium text-[#a2392f]">
                    {errors.consent}
                  </p>
                )}
                <p className="mt-6 text-xs leading-5 text-stone">
                  Submitting this form is a request for a consultation, not an order. Design, pricing and
                  timelines are confirmed with you before any work begins.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {status.state === "error" && (
          <div role="alert" className="mt-10 rounded-2xl border border-[#a2392f]/40 bg-[#a2392f]/[0.04] p-5 sm:p-6">
            <p className="text-sm font-semibold text-[#a2392f]">Your enquiry was not sent.</p>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{status.message}</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={submit} className={buttonClasses("outline", "h-11 px-5")}>
                <RotateCcw className="size-4" strokeWidth={1.5} aria-hidden /> Try Again
              </button>
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonClasses("dark", "h-11 px-5")}>
                  <WhatsAppIcon className="size-4" /> Send via WhatsApp
                </a>
              ) : (
                <Link href="/contact" className={buttonClasses("dark", "h-11 px-5")}>
                  Contact the Studio
                </Link>
              )}
            </div>
            {wa && (
              <p className="mt-3 text-xs text-stone">
                WhatsApp opens with your details filled in — attach your reference images in the chat.
              </p>
            )}
          </div>
        )}

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-8">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => {
                setErrors({});
                setStep((s) => s - 1);
                scrollToPanel();
              }}
              className="inline-flex h-12 items-center gap-2 text-[0.8125rem] font-semibold text-ink hover:text-rose-deep"
            >
              <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden /> Back
            </button>
          ) : (
            <span />
          )}
          {step < steps.length - 1 ? (
            <button type="submit" className={buttonClasses("dark")}>
              {step === 3 && uploads.length === 0 ? "Skip & Continue" : "Continue"}
              <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
            </button>
          ) : (
            <button type="submit" disabled={status.state === "submitting"} className={buttonClasses("dark", "min-w-48")} aria-busy={status.state === "submitting"}>
              {status.state === "submitting" ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" strokeWidth={1.5} aria-hidden /> Sending…
                </>
              ) : (
                "Send Request"
              )}
            </button>
          )}
        </div>
      </form>

      {design && step === 0 && (
        <div className="mt-10 flex items-center gap-4 rounded-2xl border border-line p-4">
          <span className="relative size-16 shrink-0 overflow-hidden rounded-lg">
            <Image src={design.image.src} alt={design.image.alt} fill sizes="64px" className="object-cover" />
          </span>
          <p className="text-sm text-ink-soft">
            Enquiring about <span className="font-semibold text-ink">{design.name}</span>. We have added it to your design notes.
          </p>
        </div>
      )}
    </div>
  );
}
