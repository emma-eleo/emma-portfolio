"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { u } from "@/lib/units";
import type { WorkspaceObjectData } from "@/data/workspace";
import { dropShadow } from "@/lib/units";

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

/** A single object lying on the table: the picture, its handwritten label, and a shared hover state. */
export default function WorkspaceObject({ data, onActivate, labelText, pressed, active, delay = 0 }: Props) {
  const [hover, setHover] = useState(false);
  const { source: s, bbox: [x0, y0, x1, y1], center, scale, rotate, label } = data;
  const w = (x1 - x0) * scale;
  const h = (y1 - y0) * scale;
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
        style={{
          left: u(center[0] - w / 2), top: u(center[1] - h / 2), width: u(w), height: u(h),
          transform: `rotate(${rotate}deg)`, WebkitTapHighlightColor: "transparent",
        }}
      >
        <motion.span
          className="absolute inset-0 block"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0, scale: hover ? 1.035 : 1 }}
          transition={{ opacity: { duration: 0.7, delay }, y: { duration: 0.7, delay }, scale: { duration: 0.35, ease: "easeOut" } }}
          style={{
            filter: `${dropShadow(data.shadow, rotate)}${hover || active ? " brightness(1.07)" : ""}`,
            transition: "filter .35s ease",
          }}
        >
          <Image
            src={data.src} alt="" width={s.w} height={s.h} priority draggable={false}
            sizes="(max-width: 900px) 60vw, 30vw"
            style={{
              position: "absolute", maxWidth: "none", pointerEvents: "none", userSelect: "none",
              width: u(s.w * scale), height: u(s.h * scale), left: u(-x0 * scale), top: u(-y0 * scale),
            }}
          />
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
          color: hover || active ? "#fff8e8" : "rgba(241,232,214,.92)",
          textShadow: hover || active ? "0 0 12px rgba(255,226,170,.35)" : "none",
          transition: "color .35s ease, text-shadow .35s ease",
        }}
      >
        {labelText ?? label.text}
      </button>
    </>
  );
}
