import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RangeLine } from "@/components/RangeLine";
import { SiteFooter } from "@/components/SiteFooter";
import { projects } from "@/content/portfolio";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main id="main-content" tabIndex={-1}>
      <article className="case-study">
        <header className="case-study__hero">
          <div className="case-study__breadcrumb">
            <Link href="/#work">Selected work</Link>
            <span aria-hidden="true">/</span>
            <span>{project.title}</span>
          </div>

          <div className="case-study__title">
            <p className="kicker">{project.eyebrow}</p>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
          </div>

          <dl className="case-study__meta">
            <div>
              <dt>Context</dt>
              <dd>{project.context}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{project.status}</dd>
            </div>
            <div>
              <dt>Visibility</dt>
              <dd>{project.visibility}</dd>
            </div>
          </dl>

          <RangeLine active={project.range} />
        </header>

        <aside className="case-study__boundary" aria-labelledby="boundary-title">
          <p className="kicker" id="boundary-title">
            Evidence boundary
          </p>
          <div>
            <p>
              <strong>Supported:</strong> {project.proof}
            </p>
            <p>
              <strong>Not overstated:</strong> {project.limitation}
            </p>
          </div>
        </aside>

        <div className="case-study__content">
          <nav aria-label="Case study sections">
            <p className="kicker">On this page</p>
            <ol>
              {project.sections.map((section, index) => (
                <li key={section.title}>
                  <a href={`#section-${index + 1}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="case-study__sections">
            {project.sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.title}>
                <p className="case-study__section-index">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}

            <section className="case-study__tools" id="technical-notes">
              <p className="case-study__section-index">+</p>
              <h2>Technical notes</h2>
              <ul>
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              {project.href ? (
                <a className="button-link" href={project.href}>
                  View public repository <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <p className="case-study__private-note">
                  The repository is private. Approved public artifacts will be added
                  here after redaction and review.
                </p>
              )}
            </section>
          </div>
        </div>

        <footer className="case-study__next">
          <p className="kicker">Next working proof</p>
          <Link href={`/work/${nextProject.slug}`}>
            <span>{nextProject.title}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </footer>
      </article>
      <SiteFooter />
    </main>
  );
}
