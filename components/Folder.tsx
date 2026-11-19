"use client";
import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { TABLE } from "@/data/workspace";
import { u } from "@/lib/units";
import { BackButton, SiteTitle } from "./Navigation";

export interface FolderTab<T extends string> { id: T; label: string; /** design px (1440 frame) */ width?: number }

interface Props<T extends string> {
  label: string;
  tabs: FolderTab<T>[];
  active: T;
  onChange: (id: T) => void;
  onBack: () => void;
  /** Changing this key cross-fades the content and scrolls back to the top. */
  contentKey: string;
  /** "dark" = the deeper brown used by My Projects and Contact */
  variant?: "default" | "dark";
  children: ReactNode;
}

/** The dark brown folder with tabs, shared by My Hobbies and My Projects. */
export default function Folder<T extends string>({ label, tabs, active, onChange, onBack, contentKey, variant = "default", children }: Props<T>) {
  const body = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => { body.current?.scrollTo({ top: 0 }); }, [contentKey]);

  const onKey = (e: KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = (i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
    onChange(tabs[n].id); refs.current[n]?.focus();
  };

  return (
    <main className={`hob-root${variant === "dark" ? " folder--dark" : ""}`}>
      <SiteTitle />
      <BackButton onClick={onBack} />

      <div className="hob-frame">
        {/* The workspace table, softly out of focus behind the folder (as in the prototype) */}
        <div className="hob-table" style={{ left: u(TABLE.center[0] - TABLE.size / 2), top: u(TABLE.center[1] - TABLE.size / 2), width: u(TABLE.size), height: u(TABLE.size) }}>
          <Image src={TABLE.src} alt="" width={500} height={500} draggable={false} className="h-full w-full" />
        </div>

        <div role="tablist" aria-label={label} className="hob-tabs">
          {tabs.map((t, i) => (
            <button
              key={t.id} ref={(el) => { refs.current[i] = el; }} role="tab" id={`tab-${t.id}`} aria-selected={active === t.id} aria-controls={`panel-${t.id}`}
              tabIndex={active === t.id ? 0 : -1} onClick={() => onChange(t.id)} onKeyDown={(e) => onKey(e, i)} className="hob-tab"
              style={{ "--w": t.width ?? 332 } as React.CSSProperties}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="hob-folder">
          <div className="hob-body" ref={body}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={contentKey} role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.28, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
