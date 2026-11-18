import { ASSETS } from "@/lib/assets";

export interface Shadow { x: number; y: number; blur: number }
export type SectionId = "hobbies" | "projects" | "about";

/**
 * All coordinates are in the Figma frame's design pixels (frame = 1440 × 932).
 * `bbox` = visible (non-transparent) area inside the source PNG, in source pixels.
 * `center` = where the middle of that visible area sits in the frame.
 * `scale` = rendered size ÷ source size.
 */
export interface WorkspaceObjectData {
  id: "cinnamon" | "coffee" | "notebook" | "player";
  action: SectionId | "music";
  src: string;
  alt: string;
  source: { w: number; h: number };
  bbox: [number, number, number, number];
  center: [number, number];
  scale: number;
  rotate: number;
  /** Figma drop shadow in design px (colour is Figma's default, black 25%). */
  shadow?: Shadow;
  label: { text: string; altText?: string; center: [number, number]; rotate: number; size: number };
}

export const TABLE = {
  src: ASSETS.workspace.table, size: 842, center: [720, 464] as [number, number],
  shadow: { x: 5, y: 28, blur: 14 } as Shadow,
};

export const WORKSPACE_OBJECTS: WorkspaceObjectData[] = [
  {
    id: "cinnamon", action: "hobbies", src: ASSETS.workspace.cinnamon, alt: "Cinnamon roll on a plate — open My Hobbies",
    source: { w: 480, h: 600 }, bbox: [64, 181, 455, 486], center: [617.3, 273.6], scale: 0.825, rotate: 0, shadow: { x: 4, y: 37, blur: 17 },
    label: { text: "My hobbies", center: [369.5, 176], rotate: -4, size: 35 },
  },
  {
    id: "coffee", action: "projects", src: ASSETS.workspace.coffee, alt: "Cup of coffee — open My Projects",
    source: { w: 500, h: 500 }, bbox: [40, 55, 441, 453], center: [504.6, 555.9], scale: 0.455, rotate: 7, shadow: { x: 12, y: 25, blur: 20 },
    label: { text: "My projects", center: [297, 502], rotate: -3, size: 35 },
  },
  {
    id: "notebook", action: "about", src: ASSETS.workspace.notebook, alt: "Leather notebook — open About Me",
    source: { w: 529, h: 538 }, bbox: [61, 47, 460, 497], center: [816.2, 607.4], scale: 1.126, rotate: 0,
    label: { text: "About me", center: [1080, 614], rotate: -4, size: 35 },
  },
  {
    id: "player", action: "music", src: ASSETS.workspace.player, alt: "Cassette tape — play or pause music",
    source: { w: 375, h: 666 }, bbox: [66, 255, 309, 410], center: [962.2, 340.8], scale: 0.634, rotate: 30.8, shadow: { x: 8, y: 17, blur: 24 },
    label: { text: "Play song", altText: "Pause song", center: [1088, 262], rotate: -5, size: 35 },
  },
];
