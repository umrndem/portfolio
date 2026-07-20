import { ProfilePortrait } from "@/components/ProfilePortrait";
import { ProjectCard } from "@/components/ProjectCard";
import { RangeLine } from "@/components/RangeLine";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { homeContent } from "@/content/home";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="kicker">{homeContent.hero.kicker}</p>
          <h1 id="hero-title">{homeContent.hero.title}</h1>
          <p className="hero__intro">
            I’m {profile.shortName}, {homeContent.hero.introduction}
          </p>
          <div className="hero__actions">
            <a className="button-link" href="#work">
              {homeContent.hero.primaryAction} <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href={`mailto:${profile.email}`}>
              {profile.email} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <ProfilePortrait
          asset={profile.portrait}
          name={profile.name}
          location={profile.location}
          placeholder={homeContent.hero.portraitPlaceholder}
        />
        <div className="hero__aside">
          <p>{homeContent.hero.currentLabel}</p>
          <p>{homeContent.hero.current}</p>
        </div>
      </section>

      <section className="range-section" aria-labelledby="range-title">
        <div>
          <p className="kicker">{homeContent.range.kicker}</p>
          <h2 id="range-title">{homeContent.range.title}</h2>
        </div>
        <p>{homeContent.range.description}</p>
        <RangeLine />
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <SectionHeading
          index={homeContent.work.index}
          title={homeContent.work.title}
          note={homeContent.work.note}
        />
        <div className="project-list">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              featured={project.display === "featured"}
            />
          ))}
        </div>
      </section>

      <section className="experience-section" aria-labelledby="experience-title">
        <SectionHeading
          index={homeContent.experience.heading.index}
          title={homeContent.experience.heading.title}
          note={homeContent.experience.heading.note}
        />
        <article className="experience-entry">
          <div className="experience-entry__when">
            <p>{homeContent.experience.period}</p>
            <p>{homeContent.experience.duration}</p>
          </div>
          <div className="experience-entry__role">
            <p>{homeContent.experience.organization}</p>
            <h3>{homeContent.experience.role}</h3>
            <p>{homeContent.experience.summary}</p>
          </div>
          <ul>
            {homeContent.experience.responsibilities.map((responsibility) => (
              <li key={responsibility}>{responsibility}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="approach-section" id="approach" aria-labelledby="approach-title">
        <SectionHeading
          index={homeContent.approach.heading.index}
          title={homeContent.approach.heading.title}
          note={homeContent.approach.heading.note}
        />
        <div className="approach-grid">
          {homeContent.approach.steps.map((step) => (
            <article key={step.key}>
              <p className="approach-grid__number">{step.key}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
          <article className="approach-grid__statement">
            <p className="kicker">{homeContent.approach.boundaryLabel}</p>
            <blockquote>{homeContent.approach.boundary}</blockquote>
          </article>
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <SectionHeading
          index={homeContent.about.heading.index}
          title={homeContent.about.heading.title}
          note={homeContent.about.heading.note}
        />
        <div className="about-grid">
          <div className="about-grid__lead">
            {homeContent.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl>
            <div>
              <dt>Education</dt>
              <dd>{profile.degree}</dd>
            </div>
            <div>
              <dt>Graduation</dt>
              <dd>{profile.graduation}</dd>
            </div>
            <div>
              <dt>Verified CGPA</dt>
              <dd>{profile.cgpa}</dd>
            </div>
            <div>
              <dt>Strong coursework</dt>
              <dd>{homeContent.about.strongCoursework}</dd>
            </div>
          </dl>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
