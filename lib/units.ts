/** 1 design pixel of the 1440×932 Figma frame, expressed as a CSS length (see --u in globals.css). */
export const u = (n: number) => `calc(${n} * var(--u))`;

/**
 * CSS drop-shadow for a Figma shadow (black 25%). `rotate` counter-rotates the offset so it stays
 * screen-aligned when the element itself is rotated, as Figma does.
 */
export const dropShadow = (s?: { x: number; y: number; blur: number }, rotate = 0) => {
  if (!s) return "none";
  const r = (-rotate * Math.PI) / 180;
  const x = s.x * Math.cos(r) - s.y * Math.sin(r);
  const y = s.x * Math.sin(r) + s.y * Math.cos(r);
  return `drop-shadow(${u(+x.toFixed(2))} ${u(+y.toFixed(2))} ${u(s.blur)} rgba(0,0,0,.25))`;
};
