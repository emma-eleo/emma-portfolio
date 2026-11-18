"use client";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

const VIEW_W = 1440; // virtual browser width used when a live site is shown instead of a screenshot
const VIEW_H = 900;

/**
 * Large website preview. Shows the screenshot at project.preview.src; if that file doesn't exist yet
 * it falls back to a scaled, non-interactive live view of project.demo. With neither, it renders nothing.
 */
export default function ProjectPreview({ project }: { project: Project }) {
  const { preview, demo, name } = project;
  const [mode, setMode] = useState<"shot" | "live" | "none">(preview ? "shot" : demo ? "live" : "none");
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.7);

  useEffect(() => {
    const el = box.current;
    if (!el || mode !== "live") return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / VIEW_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, [mode]);

  if (mode === "none") return null;
  const host = demo ? new URL(demo).host : null;

  return (
    <figure className="proj-preview">
      {host && <figcaption className="proj-preview-bar">{host}</figcaption>}
      <div className="proj-preview-view" ref={box}>
        {mode === "shot" && preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview.src} alt={preview.alt} onError={() => setMode(demo ? "live" : "none")} draggable={false} />
        ) : (
          demo && (
            <iframe
              src={demo} title={`${name} — live preview`} loading="lazy" tabIndex={-1} aria-hidden="true"
              style={{ width: VIEW_W, height: VIEW_H, transform: `scale(${scale})` }}
            />
          )
        )}
      </div>
    </figure>
  );
}
