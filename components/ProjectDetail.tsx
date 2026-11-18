import type { Project } from "@/data/projects";
import Image from "next/image";

/** Detail view for one project. Sections only appear once their data exists in data/projects.ts. */
export default function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const { description, screenshots, technologies, github, demo } = project;
  const empty = !description && !screenshots?.length && !technologies?.length && !github && !demo;
  return (
    <article className="proj-detail">
      <button type="button" className="proj-detail-back" onClick={onClose}>← All projects</button>
      <h2 className="proj-detail-title">{project.name}</h2>

      {empty && <p className="proj-detail-note">Details coming soon.</p>}
      {description && <p className="proj-detail-text">{description}</p>}
      {!!technologies?.length && (
        <ul className="proj-tags" aria-label="Technologies">{technologies.map((t) => <li key={t}>{t}</li>)}</ul>
      )}
      {(github || demo) && (
        <p className="proj-links">
          {github && <a href={github} target="_blank" rel="noopener noreferrer">GitHub</a>}
          {demo && <a href={demo} target="_blank" rel="noopener noreferrer">Live demo</a>}
        </p>
      )}
      {!!screenshots?.length && (
        <div className="proj-shots">
          {screenshots.map((s) => (
            <div key={s.src} className="proj-shot"><Image src={s.src} alt={s.alt} fill sizes="(max-width: 900px) 100vw, 45vw" style={{ objectFit: "cover" }} /></div>
          ))}
        </div>
      )}
    </article>
  );
}
