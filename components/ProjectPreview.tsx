"use client";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

const VIEW_W = 1440; // virtual browser width used when a live site is shown instead of a screenshot
const VIEW_H = 900;

export default function ProjectPreview({ project }: { project: Project }) {
  const demo = project.action.type === "demo" ? project.action.href : null;
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.7);

  useEffect(() => {
    const el = box.current;
    if (!el || !demo) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / VIEW_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, [demo]);

  if (!demo) return null;
  const host = new URL(demo).host;

  return (
    <figure className="proj-preview">
      <figcaption className="proj-preview-bar">{host}</figcaption>
      <div className="proj-preview-view" ref={box}>
        <iframe
          src={demo} title={`${project.name} — live preview`} loading="lazy" tabIndex={-1} aria-hidden="true"
          style={{ width: VIEW_W, height: VIEW_H, transform: `scale(${scale})` }}
        />
      </div>
    </figure>
  );
}
