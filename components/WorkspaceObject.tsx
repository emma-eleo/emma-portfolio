"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { u, dropShadow } from "@/lib/units";
import type { ObjectLayer, WorkspaceObjectData } from "@/data/workspace";

interface Props {
  data: WorkspaceObjectData;
  onActivate: () => void;
  /** Overrides the label text (used by the player to show Play / Pause). */
  labelText?: string;
  pressed?: boolean;
  /** Optional soft indication layered on the object (e.g. playback state). */
  active?: boolean;
  delay?: number;
}

/** Size of a layer's visible area, and the box that encloses it once rotated (design px). */
function extent(l: ObjectLayer) {
  const w = (l.bbox[2] - l.bbox[0]) * l.scale;
  const h = (l.bbox[3] - l.bbox[1]) * l.scale;
  const a = (l.rotate * Math.PI) / 180;
  const bw = Math.abs(w * Math.cos(a)) + Math.abs(h * Math.sin(a));
  const bh = Math.abs(w * Math.sin(a)) + Math.abs(h * Math.cos(a));
  return { w, h, box: [l.center[0] - bw / 2, l.center[1] - bh / 2, l.center[0] + bw / 2, l.center[1] + bh / 2] as const };
}

/** One image, positioned by the centre of its visible area, rotated about that centre. `origin` is the wrapper's top-left. */
function Layer({ layer, origin, filter, priority = true }: { layer: ObjectLayer; origin: [number, number]; filter: string; priority?: boolean }) {
  const { source: s, bbox: [x0, y0], scale } = layer;
  const { w, h } = extent(layer);
  return (
    <div
      className="absolute"
      style={{
        left: u(layer.center[0] - origin[0] - w / 2), top: u(layer.center[1] - origin[1] - h / 2), width: u(w), height: u(h),
        transform: `rotate(${layer.rotate}deg)`, filter,
        transition: "filter .35s ease",
      }}
    >
      <Image
        src={layer.src} alt="" width={s.w} height={s.h} priority={priority} draggable={false}
        sizes="(max-width: 900px) 60vw, 30vw"
        style={{
          position: "absolute", maxWidth: "none", pointerEvents: "none", userSelect: "none",
          width: u(s.w * scale), height: u(s.h * scale), left: u(-x0 * scale), top: u(-y0 * scale),
        }}
      />
    </div>
  );
}

/** A single object lying on the table: the picture(s), its handwritten label, and a shared hover state. */
export default function WorkspaceObject({ data, onActivate, labelText, pressed, active, delay = 0 }: Props) {
  const [hover, setHover] = useState(false);
  const { center, rotate, label } = data;
  const layers = data.layers;
  const lit = hover || active;
  const brighten = lit ? " brightness(1.07)" : "";

  // Wrapper = hit area. Single image: its visible area, rotated with the image. Layered: the union of every layer's rotated box.
  let left: number, top: number, w: number, h: number, wrapRotate: number;
  if (layers) {
    const boxes = layers.map((l) => extent(l).box);
    left = Math.min(...boxes.map((b) => b[0])); top = Math.min(...boxes.map((b) => b[1]));
    w = Math.max(...boxes.map((b) => b[2])) - left; h = Math.max(...boxes.map((b) => b[3])) - top; wrapRotate = 0;
  } else {
    ({ w, h } = extent(data)); left = center[0] - w / 2; top = center[1] - h / 2; wrapRotate = rotate;
  }

  const events = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onFocus: () => setHover(true),
    onBlur: () => setHover(false),
  };

  return (
    <>
      <button
        type="button"
        aria-label={data.alt}
        aria-pressed={pressed}
        onClick={onActivate}
        {...events}
        className="absolute cursor-pointer rounded-sm bg-transparent p-0 outline-none focus-visible:ring-1 focus-visible:ring-[#f1e8d6]/50"
        style={{ left: u(left), top: u(top), width: u(w), height: u(h), transform: `rotate(${wrapRotate}deg)`, WebkitTapHighlightColor: "transparent" }}
      >
        <motion.span
          className="absolute inset-0 block"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0, scale: hover ? 1.035 : 1 }}
          transition={{ opacity: { duration: 0.7, delay }, y: { duration: 0.7, delay }, scale: { duration: 0.35, ease: "easeOut" } }}
        >
          {layers ? (
            layers.map((l) => (
              <Layer key={l.src} layer={l} origin={[left, top]} filter={`${dropShadow(l.shadow, l.rotate)}${brighten}`} />
            ))
          ) : (
            <Layer layer={{ ...data, rotate: 0 }} origin={[left, top]} filter={`${dropShadow(data.shadow, rotate)}${brighten}`} />
          )}
        </motion.span>
      </button>

      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onActivate}
        {...events}
        className="absolute cursor-pointer whitespace-nowrap bg-transparent p-0 leading-none outline-none"
        style={{
          left: u(label.center[0]), top: u(label.center[1]),
          transform: `translate(-50%,-50%) rotate(${label.rotate}deg)`,
          fontFamily: "var(--font-script)",
          fontSize: `max(13px, ${u(label.size)})`,
          color: lit ? "#fff8e8" : "rgba(241,232,214,.92)",
          textShadow: lit ? "0 0 12px rgba(255,226,170,.35)" : "none",
          transition: "color .35s ease, text-shadow .35s ease",
        }}
      >
        {labelText ?? label.text}
      </button>
    </>
  );
}
