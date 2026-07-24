import Link from "next/link";
import {
  visibilityLabels,
  type Project,
} from "@/content/projects";
import { ContentImage } from "./ContentImage";
import { RangeLine } from "./RangeLine";

type ProjectCardProps = {
  project: Project;
  index: number;
  featured?: boolean;
};

export function ProjectCard({
  project,
  index,
  featured = false,
}: ProjectCardProps) {
  return (
    <article className={`project-card${featured ? " project-card--featured" : ""}`}>
      <div className="project-card__topline">
        <p>
          <span>{String(index + 1).padStart(2, "0")}</span>
          {project.eyebrow}
        </p>
        <p>{visibilityLabels[project.visibility]}</p>
      </div>

      <div className="project-card__body">
        <div>
          <h3>
            <Link href={`/work/${project.slug}`}>{project.title}</Link>
          </h3>
          <p className="project-card__summary">{project.summary}</p>
        </div>

        <dl className="project-card__facts">
          <div>
            <dt>Context</dt>
            <dd>{project.context}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{project.stage}</dd>
          </div>
        </dl>
      </div>

      {project.coverImage ? (
        <ContentImage
          asset={project.coverImage}
          className="project-card__media"
          sizes="(max-width: 960px) 100vw, 82rem"
        />
      ) : null}

      <RangeLine active={project.range} compact />

      <div className="project-card__footer">
        <ul aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <Link className="text-link" href={`/work/${project.slug}`}>
          Read case study <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
