import type { Project } from "@/data/projects";
import ProjectPreview from "./ProjectPreview";

/** Detail view: name → large website preview → description → external button. */
export default function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const { description, technologies, github, demo } = project;
  return (
    <article className="proj-detail">
      <button type="button" className="proj-detail-back" onClick={onClose}>← All projects</button>
      <h2 className="proj-detail-title">{project.name}</h2>

      <ProjectPreview project={project} />

      {description && <p className="proj-detail-text">{description}</p>}
      {!!technologies?.length && <ul className="proj-tags" aria-label="Technologies">{technologies.map((t) => <li key={t}>{t}</li>)}</ul>}

      {(demo || github) && (
        <p className="proj-links">
          {demo && <a className="proj-btn" href={demo} target="_blank" rel="noopener noreferrer">View Demo <span aria-hidden>↗</span></a>}
          {github && <a className="proj-btn" href={github} target="_blank" rel="noopener noreferrer">View on GitHub <span aria-hidden>↗</span></a>}
        </p>
      )}
    </article>
  );
}
