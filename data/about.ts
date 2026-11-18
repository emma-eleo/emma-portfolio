/** The handwritten introduction. Each string is one paragraph; `left` is the left page, `right` the right page. */
export const ABOUT_TEXT = {
  left: ["Hey, I'm Emma!", "I'm a curious mind and an enthusiastic maker. I love building things, from AI-powered applications and software experiments to little creative projects."],
  right: [
    "I'm fascinated by how technology, engineering, and design intersect, and I'm always eager to learn something new.",
    "When I'm not coding, I'm probably painting, baking, or finding another excuse to make something with my hands.",
  ],
};

/**
 * Geometry in Figma design px (1440 × 932 frame), fitted to the prototype.
 * Notebook: centre of the visible area of Firefly.png (988×666 of 1024²). Photo: emmababy.png (640×960, polaroid).
 */
export const ABOUT_LAYOUT = {
  notebook: { src: { w: 1024, h: 1024 }, bbox: [19, 171, 1007, 837] as const, center: [720.2, 497.6] as const, scale: 1.082 },
  photo: { src: { w: 640, h: 960 }, bbox: [0, 0, 640, 927] as const, center: [474.4, 339.4] as const, scale: 0.2834, rotate: 8.44 },
  /** Ruled-line pitch and the y of ruled line 0, in design px (measured from the notebook image). */
  rule: { pitch: 28.45, firstY: 195.7 },
  left: { x: 303, width: 392, row: 11 },
  right: { x: 783, width: 392, row: 2 },
};
