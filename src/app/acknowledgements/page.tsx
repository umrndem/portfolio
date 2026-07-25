import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { acknowledgementsPage } from "@/content/acknowledgements";

const metadataDescription =
  "A quiet acknowledgement of the faith, family, friendship, and guidance behind Muhammad Umar Nadeem.";

export const metadata: Metadata = {
  title: {
    absolute: "Acknowledgements",
  },
  description: metadataDescription,
  alternates: {
    canonical: "/acknowledgements",
  },
  openGraph: {
    title: "Acknowledgements",
    description: metadataDescription,
    type: "website",
    url: "/acknowledgements",
  },
};

export default function AcknowledgementsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <article className="acknowledgements">
        <header className="acknowledgements__hero">
          <nav
            className="acknowledgements__breadcrumb"
            aria-label="Breadcrumb"
          >
            <Link href="/">Portfolio</Link>
            <span aria-hidden="true">/</span>
            <span>Acknowledgements</span>
          </nav>
          <p className="kicker acknowledgements__eyebrow">
            {acknowledgementsPage.eyebrow}
          </p>
          <div className="acknowledgements__hero-main">
            <h1>
              {acknowledgementsPage.titleLines.map((line, index) => {
                const isFirst = index === 0;

                return (
                  <span
                    className={
                      isFirst
                        ? "acknowledgements__title-line acknowledgements__title-line--first"
                        : "acknowledgements__title-line"
                    }
                    key={line}
                  >
                    {isFirst ? (
                      <>
                        <span className="acknowledgements__optical-t">
                          {line.slice(0, 1)}
                        </span>
                        {line.slice(1)}
                      </>
                    ) : (
                      line
                    )}
                  </span>
                );
              })}
            </h1>
            <p className="acknowledgements__introduction">
              {acknowledgementsPage.introduction}
            </p>
          </div>
        </header>

        <Reveal as="section" className="acknowledgements__praise">
          <p className="kicker">{acknowledgementsPage.praiseKicker}</p>
          <div className="acknowledgements__praise-copy">
            <h2>{acknowledgementsPage.praiseTitle}</h2>
            <p>{acknowledgementsPage.praise}</p>
          </div>
        </Reveal>

        <section
          aria-label="People acknowledged"
          className="acknowledgements__entries"
        >
          {acknowledgementsPage.entries.map((entry, index) => (
            <Reveal
              as="article"
              className="acknowledgements__entry"
              delayMs={index * 40}
              key={entry.id}
            >
              <span aria-hidden="true" className="acknowledgements__marker" />
              <p className="acknowledgements__relationship">
                {entry.relationshipLabel}
              </p>
              <h3 className="acknowledgements__name">{entry.publicDisplayName}</h3>
              <p className="acknowledgements__copy">{entry.acknowledgement}</p>
            </Reveal>
          ))}
        </section>

        <footer className="acknowledgements__closing">
          <p>{acknowledgementsPage.closing}</p>
          <Link className="text-link" href={acknowledgementsPage.returnHref}>
            {acknowledgementsPage.returnLabel}{" "}
            <span aria-hidden="true">←</span>
          </Link>
        </footer>
      </article>
      <SiteFooter />
    </main>
  );
}
