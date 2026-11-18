"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { u, dropShadow } from "@/lib/units";
import { TABLE, WORKSPACE_OBJECTS, type SectionId } from "@/data/workspace";
import WorkspaceObject from "./WorkspaceObject";
import MusicPlayer from "./MusicPlayer";
import { SiteTitle } from "./Navigation";

/** Placeholder: replace with the real address when you're ready. */
const CONTACT_HREF = "mailto:";

export default function Workspace({ onNavigate }: { onNavigate: (s: SectionId) => void }) {
  const corner = { fontFamily: "var(--font-script)", color: "rgba(241,232,214,.8)" } as const;
  return (
    <main className="fixed inset-0 overflow-hidden" style={{ background: "var(--bg)" }}>
      <h1 className="sr-only">E&apos;s Essentials — Emma&apos;s workspace</h1>

      {/* The 1440×932 Figma frame, scaled with --u and centred. */}
      <div
        className="absolute"
        style={{
          left: "50%", top: "50%", width: u(1440), height: u(932),
          marginLeft: `calc(${u(1)} * -1 * var(--cx))`, marginTop: `calc(${u(1)} * -1 * var(--cy))`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute"
          style={{ left: u(TABLE.center[0] - TABLE.size / 2), top: u(TABLE.center[1] - TABLE.size / 2), width: u(TABLE.size), height: u(TABLE.size) }}
        >
          <Image src="/assets/workspace/table.png" alt="" width={500} height={500} priority draggable={false}
            sizes="(max-width: 900px) 100vw, 58vw" className="h-full w-full select-none" style={{ filter: dropShadow(TABLE.shadow) }} />
        </motion.div>

        {WORKSPACE_OBJECTS.map((o, i) =>
          o.action === "music" ? (
            <MusicPlayer key={o.id} data={o} delay={0.25 + i * 0.08} />
          ) : (
            <WorkspaceObject key={o.id} data={o} delay={0.25 + i * 0.08} onActivate={() => onNavigate(o.action as SectionId)} />
          ),
        )}
      </div>

      {/* Corner details sit on the viewport corners, sized from the same unit. */}
      <SiteTitle />
      <a
        href={CONTACT_HREF}
        className="absolute underline underline-offset-4 decoration-1 outline-none transition-colors hover:text-[#fff8e8] focus-visible:text-[#fff8e8]"
        style={{ ...corner, right: `max(16px, ${u(65)})`, bottom: `max(14px, ${u(55)})`, fontSize: `max(17px, ${u(33)})` }}
      >
        Contact me
      </a>
    </main>
  );
}
