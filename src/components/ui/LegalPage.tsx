import { PageIntro } from "./PageIntro";

export type LegalSection = { heading: string; body: (string | string[])[] };

export function LegalPage({
  eyebrow,
  title,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageIntro eyebrow={eyebrow} title={[title]} crumbs={[{ label: title }]} intro={<>Last updated: {updated}</>} />
      <section className="bg-paper pb-24 lg:pb-36">
        <div className="container-site grid gap-12 border-t border-line pt-14 lg:grid-cols-12">
          <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
            <ol className="sticky top-28 space-y-3 text-sm text-stone">
              {sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#section-${i + 1}`} className="link-underline hover:text-ink">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="prose-editorial max-w-2xl lg:col-span-8 lg:col-start-5">
            {sections.map((s, i) => (
              <section key={s.heading} id={`section-${i + 1}`} className="scroll-mt-28">
                <h2 className={i === 0 ? "!mt-0" : undefined}>{s.heading}</h2>
                {s.body.map((b, j) =>
                  Array.isArray(b) ? (
                    <ul key={j}>
                      {b.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={j}>{b}</p>
                  ),
                )}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
