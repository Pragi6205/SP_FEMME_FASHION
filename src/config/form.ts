/** Options and limits for the consultation form. Shared by the client and the API route. */

export const serviceOptions = [
  { value: "aari", label: "Aari / Maggam Embroidery" },
  { value: "blouse-design", label: "Custom Blouse Design" },
  { value: "blouse-stitching", label: "Blouse Stitching" },
  { value: "bridal", label: "Bridal Outfit" },
  { value: "festive", label: "Festive / Occasion Wear" },
  { value: "embroidery", label: "Custom Embroidery" },
  { value: "other", label: "Other Custom Design" },
] as const;

export const consultationMethods = [
  { value: "studio", label: "Studio visit" },
  { value: "phone", label: "Phone call" },
  { value: "video", label: "Video call" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

export const occasionOptions = ["Wedding", "Engagement", "Reception", "Festival", "Party / Celebration", "Everyday", "Other"];

export const budgetOptions = [
  "Not sure yet",
  "Under ₹5,000",
  "₹5,000 – ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "Above ₹50,000",
];

export const uploadLimits = {
  maxFiles: 5,
  maxFileBytes: 8 * 1024 * 1024,
  maxTotalBytes: 25 * 1024 * 1024,
  acceptedTypes: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
  acceptAttr: ".jpg,.jpeg,.png,.webp,.heic,.heif",
};

export function labelFor<T extends readonly { value: string; label: string }[]>(options: T, value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

/** Basic phone check: 7–15 digits, allowing spaces, dashes, brackets and a leading +. */
export function isValidPhone(value: string) {
  const digits = value.replace(/[\s\-()]/g, "");
  return /^\+?\d{7,15}$/.test(digits);
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}
