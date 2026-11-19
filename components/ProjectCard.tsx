import type { Project } from "@/data/projects";

/** A compact bordered card: name + period, category, description, tech line, action button (bottom-right). */
export default function ProjectCard({ project }: { project: Project }) {
  const { name, period, category, description, technologies, action } = project;
  return (
    <article className="proj-card">
      <header className="proj-card-head">
        <h3 className="proj-card-title">{name}</h3>
        {period && <span className="proj-card-period">{period}</span>}
      </header>
      {category && <p className="proj-card-cat">{category}</p>}
      <p className="proj-card-desc">{description}</p>
      {!!technologies?.length && <p className="proj-card-tech">{technologies.join(" · ")}</p>}
      <footer className="proj-card-foot">
        <a className="proj-btn" href={action.href} target="_blank" rel="noopener noreferrer" aria-label={`${action.label}: ${name} (opens in a new tab)`}>
          {action.label}
        </a>
      </footer>
    </article>
  );
}
