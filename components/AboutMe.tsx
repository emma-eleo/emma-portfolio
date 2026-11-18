"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ABOUT_ASSETS, } from "@/lib/assets";
import { ABOUT_LAYOUT as L, ABOUT_TEXT } from "@/data/about";
import { TABLE } from "@/data/workspace";
import { dropShadow, u } from "@/lib/units";
import { BackButton, SiteTitle } from "./Navigation";

const rowTop = (row: number) => L.rule.firstY + L.rule.pitch * row;

function Page({ x, width, row, paragraphs, blankBetween }: { x: number; width: number; row: number; paragraphs: string[]; blankBetween?: boolean }) {
  return (
    <div className="about-text" style={{ left: u(x), top: u(rowTop(row)), width: u(width) }}>
      {paragraphs.map((p, i) => <p key={i} style={{ marginTop: i && blankBetween ? u(L.rule.pitch) : 0 }}>{p}</p>)}
    </div>
  );
}

export default function AboutMe({ onBack }: { onBack: () => void }) {
  // Phones show one page at a time (turn with the buttons or ← / →); desktop shows the whole spread.
  const [page, setPage] = useState<0 | 1>(0);
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "ArrowRight") setPage(1); if (e.key === "ArrowLeft") setPage(0); };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, []);

  const nb = L.notebook, ph = L.photo;
  const nbW = (nb.bbox[2] - nb.bbox[0]) * nb.scale, nbH = (nb.bbox[3] - nb.bbox[1]) * nb.scale;
  const phW = (ph.bbox[2] - ph.bbox[0]) * ph.scale, phH = (ph.bbox[3] - ph.bbox[1]) * ph.scale;

  return (
    <main className="hob-root about-root" data-page={page}>
      <h1 className="sr-only">About Emma</h1>
      <SiteTitle />
      <BackButton onClick={onBack} />

      <div className="about-frame">
        <div className="hob-table" style={{ left: u(TABLE.center[0] - TABLE.size / 2), top: u(TABLE.center[1] - TABLE.size / 2), width: u(TABLE.size), height: u(TABLE.size) }}>
          <Image src={TABLE.src} alt="" width={500} height={500} draggable={false} className="h-full w-full" />
        </div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="absolute inset-0">
          {/* Layer 1 — the notebook image itself (never recreated in HTML) */}
          <div className="absolute" style={{ left: u(nb.center[0] - nbW / 2), top: u(nb.center[1] - nbH / 2), width: u(nbW), height: u(nbH) }}>
            <Image src={ABOUT_ASSETS.notebook} alt="An open, ruled notebook" width={nb.src.w} height={nb.src.h} priority draggable={false}
              sizes="(max-width: 900px) 200vw, 75vw"
              style={{ position: "absolute", maxWidth: "none", width: u(nb.src.w * nb.scale), height: u(nb.src.h * nb.scale), left: u(-nb.bbox[0] * nb.scale), top: u(-nb.bbox[1] * nb.scale) }} />
          </div>

          {/* Layer 2 — handwriting */}
          <Page {...L.left} paragraphs={ABOUT_TEXT.left} />
          <Page {...L.right} paragraphs={ABOUT_TEXT.right} blankBetween />

          {/* Layer 3 — the photograph, on top of the page */}
          <div className="absolute" style={{ left: u(ph.center[0] - phW / 2), top: u(ph.center[1] - phH / 2), width: u(phW), height: u(phH), transform: `rotate(${ph.rotate}deg)` }}>
            <Image src={ABOUT_ASSETS.photo} alt="A childhood photograph of Emma in a striped sweater, standing among autumn leaves" width={ph.src.w} height={ph.src.h} priority draggable={false}
              sizes="(max-width: 900px) 60vw, 20vw"
              style={{ position: "absolute", maxWidth: "none", width: u(ph.src.w * ph.scale), height: u(ph.src.h * ph.scale), left: u(-ph.bbox[0] * ph.scale), top: u(-ph.bbox[1] * ph.scale), filter: dropShadow(undefined) }} />
          </div>
        </motion.div>
      </div>

      <div className="about-turn" aria-label="Turn the page">
        <button type="button" onClick={() => setPage(0)} disabled={page === 0} aria-label="Previous page">‹</button>
        <span aria-hidden>{page + 1} / 2</span>
        <button type="button" onClick={() => setPage(1)} disabled={page === 1} aria-label="Next page">›</button>
      </div>
    </main>
  );
}
