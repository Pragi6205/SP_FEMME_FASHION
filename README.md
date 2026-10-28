# SP Femme Fashion — website

Editorial website for SP Femme Fashion, a custom fashion and embroidery atelier.
Built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, Motion and Lucide.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Before launch — what to fill in

| What | Where |
| --- | --- |
| WhatsApp number, phone, email, Instagram | `.env.local` (see `.env.example`) |
| Address, map link, opening hours, other social links | `src/config/site.ts` |
| Enquiry delivery (form backend) | `ENQUIRY_FORWARD_URL` in `.env.local` |
| Designer name, quote and introduction | `src/data/content.ts` → `craftStory.founder` |
| Real photography | `src/data/images.ts` (swap `src` for `/images/your-file.jpg`) |
| Portfolio pieces | `src/data/designs.ts` |
| Collections, services, journal articles | `src/data/collections.ts`, `services.ts`, `journal.ts` |
| Embroidery video (optional) | `src/data/content.ts` → `craftVideo.src` |
| Budget ranges, service list, upload limits | `src/config/form.ts` |
| Privacy Policy & Terms (templates — have them reviewed) | `src/app/privacy-policy`, `src/app/terms` |

Empty contact fields are hidden automatically, so nothing unconfirmed is ever shown.

## Images

All current photographs are temporary Unsplash images used to set the art direction. Replace them
with the boutique's own work in `src/data/images.ts`; every page reads from that file. If all images
become local, the `images.unsplash.com` entry in `next.config.ts` can be removed.

## Forms

The consultation form (`/book-consultation`) and contact form post to `src/app/api/enquiry/route.ts`,
which validates the fields and reference images and forwards them as multipart form data to
`ENQUIRY_FORWARD_URL`. Until that is configured the API returns 503 and the form shows a clear
"not sent" message with a pre-filled WhatsApp fallback — it never reports a false success.

Links can pre-fill the form: `/book-consultation?service=bridal&design=maroon-heirloom`.

## Structure

```
src/app/            routes (home, collections, services, gallery, journal, consultation, contact, legal)
src/components/     layout, home sections, gallery, forms, motion and UI primitives
src/config/         business details and form options
src/data/           images, collections, designs, journal, services, studio content
```
