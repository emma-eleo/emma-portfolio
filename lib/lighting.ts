import type { ShadowSpec } from "./units";

/**
 * One light for the whole table: in front of, to the left of, and above the scene.
 * Seen from above, that throws shadows away from the viewer (up the screen) and to the right.
 * Change LIGHT to move the light — every object follows.
 */
export const LIGHT = { x: 0.45, y: -0.89 }; // unit-ish direction a shadow travels, in screen space (+x right, +y down)

/**
 * Two-part shadow for something resting on the table, `height` design-px thick:
 *  1. contact shadow — tight, dark, hugging the base (grounds the object)
 *  2. cast shadow — softer, longer, stretched away from the light
 */
export const grounded = (height: number): ShadowSpec[] => [
  { x: +(LIGHT.x * height * 0.12).toFixed(2), y: +(LIGHT.y * height * 0.12).toFixed(2), blur: +(1.5 + height * 0.2).toFixed(2), a: 0.95 },
  { x: +(LIGHT.x * height * 1.35).toFixed(2), y: +(LIGHT.y * height * 1.35).toFixed(2), blur: +(4 + height * 0.65).toFixed(2), a: 0.8 },
];
