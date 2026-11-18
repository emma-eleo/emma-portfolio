"use client";
import { useState } from "react";
import { PROJECTS } from "@/data/projects";
import Folder, { type FolderTab } from "./Folder";
import ProjectCard from "./ProjectCard";
import ProjectDetail from "./ProjectDetail";
import Resume from "./Resume";

const TABS: FolderTab<"projects" | "resume">[] = [
  { id: "projects", label: "My projects" },
  { id: "resume", label: "Resume", width: 238 },
];

export default function Projects({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<"projects" | "resume">("projects");
  const [openId, setOpenId] = useState<string | null>(null);
  const open = PROJECTS.find((p) => p.id === openId) ?? null;

  const change = (t: "projects" | "resume") => { setTab(t); setOpenId(null); };

  return (
    <Folder label="My projects" tabs={TABS} active={tab} onChange={change} onBack={onBack} contentKey={`${tab}:${openId ?? ""}`}>
      {tab === "resume" ? (
        <Resume />
      ) : open ? (
        <ProjectDetail project={open} onClose={() => setOpenId(null)} />
      ) : (
        <div className="proj-grid">
          {PROJECTS.map((p) => <ProjectCard key={p.id} project={p} onOpen={() => setOpenId(p.id)} />)}
        </div>
      )}
    </Folder>
  );
}
