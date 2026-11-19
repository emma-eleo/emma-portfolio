import type { ShadowSpec } from "./units";

/**
 * One light for the whole table: from the north-west (top-left of the screen), above the scene.
 * Every cast shadow therefore extends south-east (down and to the right).
 * Change LIGHT to move the light — every object follows.
 */
export const LIGHT = { x: 0.7, y: 0.7 }; // direction a shadow travels on screen (+x right, +y down) → south-east

/**
 * Two-part shadow for something resting on the table, `height` design-px thick:
 *  1. contact shadow — tight, dark, hugging the base (grounds the object)
 *  2. cast shadow — softer, longer, stretched away from the light
 */
export const grounded = (height: number): ShadowSpec[] => [
  { x: +(LIGHT.x * height * 0.12).toFixed(2), y: +(LIGHT.y * height * 0.12).toFixed(2), blur: +(1.5 + height * 0.2).toFixed(2), a: 0.95 },
  { x: +(LIGHT.x * height * 1.35).toFixed(2), y: +(LIGHT.y * height * 1.35).toFixed(2), blur: +(4 + height * 0.65).toFixed(2), a: 0.8 },
];
