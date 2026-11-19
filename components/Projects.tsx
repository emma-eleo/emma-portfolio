"use client";
import { useState } from "react";
import { PROJECTS } from "@/data/projects";
import Folder, { type FolderTab } from "./Folder";
import ProjectCard from "./ProjectCard";
import Resume from "./Resume";

const TABS: FolderTab<"projects" | "resume">[] = [
  { id: "projects", label: "My projects" },
  { id: "resume", label: "Resume", width: 240 },
];

export default function Projects({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<"projects" | "resume">("projects");
  return (
    <Folder label="My projects" tabs={TABS} active={tab} onChange={setTab} onBack={onBack} contentKey={tab} variant="dark">
      {tab === "resume" ? (
        <Resume />
      ) : (
        <div className="proj-grid">
          {PROJECTS.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}
    </Folder>
  );
}
