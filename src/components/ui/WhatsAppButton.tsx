import { whatsappLink } from "@/config/site";
import { ButtonLink } from "./Button";
import { WhatsAppIcon } from "./BrandIcons";

type Props = {
  message?: string;
  variant?: "dark" | "light" | "outline" | "outline-light";
  className?: string;
  label?: string;
};

/**
 * Opens a WhatsApp chat with the configured business number. When no number is
 * configured it falls back to the contact page so the button always works.
 */
export function WhatsAppButton({ message, variant = "outline", className = "", label = "Chat on WhatsApp" }: Props) {
  const href = whatsappLink(message);
  if (!href) {
    return (
      <ButtonLink href="/contact" variant={variant} className={className} arrow>
        Contact the Studio
      </ButtonLink>
    );
  }
  return (
    <ButtonLink href={href} external variant={variant} className={className}>
      <span className="inline-flex items-center gap-2.5">
        <WhatsAppIcon className="size-4" />
        {label}
      </span>
    </ButtonLink>
  );
}
