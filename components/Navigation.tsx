"use client";
import { u } from "@/lib/units";

const script = { fontFamily: "var(--font-script)" } as const;

/** Small handwritten title in the top-left corner (shared by every screen). */
export function SiteTitle() {
  return (
    <span className="absolute z-20 select-none" style={{ ...script, left: `max(16px, ${u(30)})`, top: `max(14px, ${u(36)})`, fontSize: `max(14px, ${u(27)})`, color: "rgba(241,232,214,.55)" }}>
      E&apos;s Essentials
    </span>
  );
}

/** Clear way back to the workspace (top-right). */
export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button" onClick={onClick} aria-label="Back to the workspace"
      className="absolute z-20 cursor-pointer bg-transparent p-0 outline-none transition-colors hover:text-[#fff8e8] focus-visible:text-[#fff8e8] focus-visible:underline"
      style={{ ...script, right: `max(16px, ${u(40)})`, top: `max(12px, ${u(34)})`, fontSize: `max(17px, ${u(30)})`, color: "rgba(241,232,214,.8)" }}
    >
      Back
    </button>
  );
}
