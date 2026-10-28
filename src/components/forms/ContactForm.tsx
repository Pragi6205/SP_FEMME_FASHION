"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { isValidEmail, isValidPhone } from "@/config/form";
import { whatsappLink } from "@/config/site";
import { TextArea, TextField } from "./Fields";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

type Values = { name: string; phone: string; email: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

export function ContactForm() {
  const [values, setValues] = useState<Values>({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const set = (key: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e: Errors = {};
    if (values.name.trim().length < 2) e.name = "Please enter your name.";
    if (!isValidPhone(values.phone)) e.phone = "Please enter a valid phone number.";
    if (values.email.trim() && !isValidEmail(values.email.trim())) e.email = "Please enter a valid email address.";
    if (values.message.trim().length < 5) e.message = "Please write a short message.";
    return e;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) return document.getElementById(`contact-${first}`)?.focus();

    setStatus("submitting");
    const data = new FormData();
    data.set("kind", "contact");
    data.set("website", honeypot);
    Object.entries(values).forEach(([k, v]) => data.set(k, v));
    try {
      const res = await fetch("/api/enquiry", { method: "POST", body: data });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      if (res.ok && json?.ok) return setStatus("success");
      setMessage(json?.message ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setMessage("We couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="rounded-[1.25rem] border border-line p-8 sm:p-10">
        <span className="grid size-12 place-items-center rounded-full bg-ink text-paper">
          <Check className="size-5" strokeWidth={1.5} aria-hidden />
        </span>
        <h3 className="mt-6 font-serif text-[2rem] font-medium">Message sent.</h3>
        <p className="mt-3 text-sm leading-6 text-stone">Thank you — we will reply to you on {values.phone}.</p>
      </div>
    );
  }

  const wa = whatsappLink(`Hello SP Femme Fashion, I'm ${values.name || "getting in touch"}.\n\n${values.message}`);

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-9 sm:grid-cols-2">
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>
      <TextField id="contact-name" label="Your name" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} error={errors.name} wrapperClassName="sm:col-span-2" />
      <TextField id="contact-phone" label="Phone number" type="tel" autoComplete="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} error={errors.phone} />
      <TextField id="contact-email" label="Email" type="email" optional autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} error={errors.email} />
      <TextArea id="contact-message" label="Message" rows={4} value={values.message} onChange={(e) => set("message", e.target.value)} error={errors.message} wrapperClassName="sm:col-span-2" maxLength={2000} />

      {status === "error" && (
        <div role="alert" className="rounded-2xl border border-[#a2392f]/40 bg-[#a2392f]/[0.04] p-5 sm:col-span-2">
          <p className="text-sm font-semibold text-[#a2392f]">Your message was not sent.</p>
          <p className="mt-1 text-sm leading-6 text-ink-soft">{message}</p>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonClasses("dark", "mt-4 h-11 px-5")}>
              <WhatsAppIcon className="size-4" /> Send via WhatsApp
            </a>
          )}
        </div>
      )}

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-stone">
          By sending, you agree to our{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
        <button type="submit" disabled={status === "submitting"} className={buttonClasses("dark", "min-w-44")}>
          {status === "submitting" ? (
            <>
              <LoaderCircle className="size-4 animate-spin" strokeWidth={1.5} aria-hidden /> Sending…
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </div>
    </form>
  );
}
