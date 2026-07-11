import { PortraitPlaceholder } from "@/components/PortraitPlaceholder";
import { ProjectCard } from "@/components/ProjectCard";
import { RangeLine } from "@/components/RangeLine";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { profile, projects } from "@/content/portfolio";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="kicker">
            Islamabad · Data Science · Software systems
          </p>
          <h1 id="hero-title">
            I turn unclear problems into systems I can explain.
          </h1>
          <p className="hero__intro">
            I’m {profile.shortName}, a Data Science student with a strong C++
            foundation. I work across data, databases, and product software—using
            agentic AI heavily, transparently, and with responsibility for the
            decisions and outcomes.
          </p>
          <div className="hero__actions">
            <a className="button-link" href="#work">
              See selected work <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href={`mailto:${profile.email}`}>
              {profile.email} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <PortraitPlaceholder />
        <div className="hero__aside">
          <p>Currently</p>
          <p>
            IT Intern at Eastern Testing Services, building internal and
            public-facing systems with operational stakeholders.
          </p>
        </div>
      </section>

      <section className="range-section" aria-labelledby="range-title">
        <div>
          <p className="kicker">Technical range / one connected practice</p>
          <h2 id="range-title">
            From low-level behavior to software people can actually use.
          </h2>
        </div>
        <p>
          This is a map of the kinds of problems I work across—not a proficiency
          score. Each project below activates the part it genuinely covers.
        </p>
        <RangeLine />
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <SectionHeading
          index="01"
          title="Selected working proofs"
          note="Five projects, chosen for distinct evidence—not to make the list look larger."
        />
        <div className="project-list">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              featured={index < 2}
            />
          ))}
        </div>
      </section>

      <section className="experience-section" aria-labelledby="experience-title">
        <SectionHeading
          index="02"
          title="Experience in context"
          note="Responsibilities and observed outcomes, without invented metrics."
        />
        <article className="experience-entry">
          <div className="experience-entry__when">
            <p>Jun — Aug 2026</p>
            <p>Eight weeks</p>
          </div>
          <div className="experience-entry__role">
            <p>Eastern Testing Services</p>
            <h3>IT Intern</h3>
            <p>
              Working with management and operational stakeholders to gather
              requirements and build internal and public-facing software systems.
            </p>
          </div>
          <ul>
            <li>Translate stakeholder needs into bounded software workflows.</li>
            <li>Structure content, data models, permissions, and interfaces.</li>
            <li>Replace fragmented manual work with more centralized systems.</li>
            <li>Review, test, document, and refine AI-assisted implementation.</li>
          </ul>
        </article>
      </section>

      <section className="approach-section" id="approach" aria-labelledby="approach-title">
        <SectionHeading
          index="03"
          title="How I build"
          note="AI is part of the method. Ownership still means making and verifying the decisions."
        />
        <div className="approach-grid">
          <article>
            <p className="approach-grid__number">A</p>
            <h3>Frame the real problem</h3>
            <p>
              I write the ambiguity down, ask questions, identify constraints, and
              begin implementation early enough to learn from the real system.
            </p>
          </article>
          <article>
            <p className="approach-grid__number">B</p>
            <h3>Structure the system</h3>
            <p>
              I research unfamiliar technology, discuss architecture and tradeoffs,
              and split the work into boundaries another person—or agent—can follow.
            </p>
          </article>
          <article>
            <p className="approach-grid__number">C</p>
            <h3>Direct and verify</h3>
            <p>
              I use AI for implementation, research, debugging, tests, and review;
              then I run the product, inspect diffs, use checks, and iterate weak
              behavior.
            </p>
          </article>
          <article className="approach-grid__statement">
            <p className="kicker">A boundary I keep visible</p>
            <blockquote>
              I don’t claim I manually wrote every line. I claim responsibility for
              understanding the problem, shaping the system, testing it, and deciding
              when the result is good enough.
            </blockquote>
          </article>
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <SectionHeading
          index="04"
          title="Foundation and direction"
          note="Strong foundations, with deeper machine learning practice still ahead."
        />
        <div className="about-grid">
          <div className="about-grid__lead">
            <p>
              Mathematics and computing brought me to Data Science. The work I have
              now is broader: C++ and operating systems, relational data, applied
              computer vision, analytics, and complete web workflows.
            </p>
            <p>
              I’m looking for environments with meaningful technical exposure—where
              I can become much stronger in software, data systems, machine learning,
              and AI.
            </p>
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
              <dd>
                Data Structures, Operating Systems, Probability & Statistics,
                Calculus, Linear Algebra
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
