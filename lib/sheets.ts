import type { Artwork } from "@/data/artworks";

export interface Sheet { kind: "landscape" | "portrait"; items: Artwork[] }

/**
 * Lays the artworks out on paper sheets without changing their order:
 * landscape → alone on a sheet, portraits → two per sheet; a lone portrait sits on the left page.
 */
export function buildSheets(arts: Artwork[]): Sheet[] {
  const sheets: Sheet[] = [];
  for (let i = 0; i < arts.length; i++) {
    const a = arts[i];
    if (a.w >= a.h) sheets.push({ kind: "landscape", items: [a] });
    else if (arts[i + 1] && arts[i + 1].h > arts[i + 1].w) { sheets.push({ kind: "portrait", items: [a, arts[++i]] }); }
    else sheets.push({ kind: "portrait", items: [a] });
  }
  return sheets;
}
