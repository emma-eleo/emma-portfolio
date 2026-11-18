import Image from "next/image";
import { ARTWORKS, PAPER_SRC } from "@/data/artworks";
import { buildSheets, type Sheet } from "@/lib/sheets";

function PaperSheet({ sheet, priority }: { sheet: Sheet; priority: boolean }) {
  return (
    <div className="art-sheet">
      {/* paper.png is the bottom layer; the artwork always sits above it */}
      <Image src={PAPER_SRC} alt="" width={600} height={600} priority={priority} draggable={false} className="art-paper" sizes="(max-width: 900px) 100vw, 45vw" />
      {sheet.items.map((a, i) => (
        <div key={a.id} className={`art-slot art-slot--${sheet.kind}${sheet.kind === "portrait" ? (i === 0 ? " is-left" : " is-right") : ""}`}>
          <Image src={a.src} alt={a.alt} fill priority={priority} sizes="(max-width: 900px) 90vw, 40vw" style={{ objectFit: "contain" }} draggable={false} />
        </div>
      ))}
    </div>
  );
}

export default function ArtGallery() {
  const sheets = buildSheets(ARTWORKS);
  return (
    <div className="art-grid">
      {sheets.map((s, i) => <PaperSheet key={s.items.map((a) => a.id).join("+")} sheet={s} priority={i < 2} />)}
    </div>
  );
}
