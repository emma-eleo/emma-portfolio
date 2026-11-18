import { ASSETS } from "@/lib/assets";
import type { ShadowSpec } from "@/lib/units";
import { grounded } from "@/lib/lighting";

export type SectionId = "hobbies" | "projects" | "about";
export type Shadow = ShadowSpec;

/** One image placed on the table. */
export interface ObjectLayer {
  src: string;
  source: { w: number; h: number };
  /** visible (non-transparent) area inside the source PNG, in source pixels: [x0, y0, x1, y1] */
  bbox: [number, number, number, number];
  /** where the middle of that visible area sits in the 1440 × 932 frame (design px) */
  center: [number, number];
  /** rendered size ÷ source size */
  scale: number;
  rotate: number;
  /** Drop shadow(s) in design px. An array stacks several (see lib/lighting.ts → grounded()). */
  shadow?: Shadow | Shadow[];
}

/**
 * All coordinates are in the Figma frame's design pixels (frame = 1440 × 932).
 * An object is one image, or — when `layers` is set — several images stacked bottom → top
 * that share one hit area, hover state and click action.
 */
export interface WorkspaceObjectData extends ObjectLayer {
  id: "cinnamon" | "coffee" | "notebook" | "player";
  action: SectionId | "music";
  alt: string;
  layers?: ObjectLayer[];
  label: { text: string; altText?: string; center: [number, number]; rotate: number; size: number };
}

export const TABLE = {
  src: ASSETS.workspace.table, size: 842, center: [720, 464] as [number, number],
  shadow: grounded(30),
};

const DIARY: ObjectLayer = {
  src: ASSETS.workspace.diary, source: { w: 843, h: 1264 }, bbox: [108, 207, 759, 1001],
  center: [803.9, 583.4], scale: 0.526, rotate: 17.3,
  shadow: grounded(24), // diary is ~24px thick
};

const POLAROID: ObjectLayer = {
  src: ASSETS.workspace.polaroid, source: { w: 1125, h: 2000 }, bbox: [55, 235, 1079, 1852],
  center: [840.2, 710.6], scale: 0.0962, rotate: 17.3,
  shadow: grounded(5), // photo lying on the diary cover
};

export const WORKSPACE_OBJECTS: WorkspaceObjectData[] = [
  {
    id: "cinnamon", action: "hobbies", src: ASSETS.workspace.cinnamon, alt: "Cinnamon roll on a plate — open My Hobbies",
    source: { w: 480, h: 600 }, bbox: [64, 181, 455, 486], center: [617.3, 273.6], scale: 0.825, rotate: 0, shadow: grounded(14), // flat plate
    label: { text: "My hobbies", center: [369.5, 176], rotate: -4, size: 35 },
  },
  {
    id: "coffee", action: "projects", src: ASSETS.workspace.coffee, alt: "Cup of coffee — open My Projects",
    source: { w: 500, h: 500 }, bbox: [40, 55, 441, 453], center: [504.6, 555.9], scale: 0.455, rotate: 7, shadow: grounded(26), // cup stands tallest
    label: { text: "My projects", center: [297, 502], rotate: -3, size: 35 },
  },
  {
    // Leather diary with the polaroid on top of it. Both layers carry their own rotation, so the wrapper itself is unrotated.
    ...DIARY, rotate: 0, shadow: undefined,
    id: "notebook", action: "about", alt: "Leather diary with a photo — open About Me",
    layers: [DIARY, POLAROID],
    label: { text: "About me", center: [1080, 614], rotate: -4, size: 35 },
  },
  {
    id: "player", action: "music", src: ASSETS.workspace.player, alt: "Cassette tape — play or pause music",
    source: { w: 375, h: 666 }, bbox: [66, 255, 309, 410], center: [962.2, 340.8], scale: 0.634, rotate: 30.8, shadow: grounded(9), // cassette is thin
    label: { text: "Play song", altText: "Pause song", center: [1088, 262], rotate: -5, size: 35 },
  },
];
