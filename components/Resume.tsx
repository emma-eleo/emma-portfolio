"use client";
import { useEffect, useState } from "react";
import { RESUME_SRC } from "@/lib/assets";

/** Inline PDF viewer + download. Shows a quiet placeholder until the file exists at RESUME_SRC. */
export default function Resume() {
  const [state, setState] = useState<"checking" | "ready" | "missing">("checking");

  useEffect(() => {
    let live = true;
    fetch(RESUME_SRC, { method: "HEAD" })
      .then((r) => live && setState(r.ok && (r.headers.get("content-type") ?? "").includes("pdf") ? "ready" : "missing"))
      .catch(() => live && setState("missing"));
    return () => { live = false; };
  }, []);

  return (
    <div className="resume">
      <div className="resume-bar">
        {state === "ready" ? (
          <a className="resume-btn" href={RESUME_SRC} download>Download PDF</a>
        ) : (
          <span className="resume-btn is-disabled" aria-disabled="true">Download PDF</span>
        )}
      </div>
      <div className="resume-frame">
        {state === "ready" ? (
          <object data={`${RESUME_SRC}#view=FitH`} type="application/pdf" className="resume-object" aria-label="Resume (PDF)">
            <p className="resume-note">Your browser can&apos;t show PDFs inline. <a href={RESUME_SRC}>Open the resume</a>.</p>
          </object>
        ) : (
          <p className="resume-note">{state === "checking" ? "" : "Resume coming soon."}</p>
        )}
      </div>
    </div>
  );
}
