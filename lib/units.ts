/** 1 design pixel of the 1440×932 Figma frame, expressed as a CSS length (see --u in globals.css). */
export const u = (n: number) => `calc(${n} * var(--u))`;

export interface ShadowSpec { x: number; y: number; blur: number; /** opacity of the black, default .25 */ a?: number }

/**
 * CSS drop-shadow(s) for Figma shadow value(s) (black, 25% unless `a` is set). Offsets are signed exactly as given
 * (negative x = left, negative y = up). Pass an array for a layered shadow.
 * `rotate` counter-rotates the offset so it stays screen-aligned when the element itself is rotated.
 */
export const dropShadow = (shadow?: ShadowSpec | ShadowSpec[], rotate = 0) => {
  if (!shadow) return "none";
  const r = (-rotate * Math.PI) / 180;
  return (Array.isArray(shadow) ? shadow : [shadow])
    .map((s) => {
      const x = s.x * Math.cos(r) - s.y * Math.sin(r);
      const y = s.x * Math.sin(r) + s.y * Math.cos(r);
      return `drop-shadow(${u(+x.toFixed(2))} ${u(+y.toFixed(2))} ${u(s.blur)} rgba(0,0,0,${s.a ?? 0.25}))`;
    })
    .join(" ");
};
