import type { Project } from "@/data/projects";

export default function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button type="button" className="proj-card" onClick={onOpen} aria-label={`Open ${project.name}`}>
      <span className="proj-card-title">{project.name}</span>
    </button>
  );
}
