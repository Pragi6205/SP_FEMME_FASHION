import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-paper pb-20 pt-36">
      <div className="container-site">
        <p className="eyebrow text-rose-deep">Page not found</p>
        <h1 className="mt-5 max-w-3xl font-serif text-display font-medium">A loose thread.</h1>
        <p className="mt-7 max-w-md text-[0.9375rem] leading-7 text-stone">
          The page you were looking for has moved or no longer exists. Let&apos;s get you back to the collection.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Return Home</ButtonLink>
          <ButtonLink href="/gallery" variant="outline">
            Browse the Gallery
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
