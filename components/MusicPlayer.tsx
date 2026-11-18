"use client";
import { useEffect, useRef, useState } from "react";
import { AUDIO_SRC } from "@/lib/assets";
import WorkspaceObject from "./WorkspaceObject";
import type { WorkspaceObjectData } from "@/data/workspace";

/** The cassette on the table. Toggles playback; never autoplays. Audio file is set in lib/assets.ts. */
export default function MusicPlayer({ data, delay }: { data: WorkspaceObjectData; delay?: number }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    if (playing) a.play().catch(() => setPlaying(false));
    else a.pause();
  }, [playing]);

  return (
    <>
      {AUDIO_SRC && <audio ref={audio} src={AUDIO_SRC} loop preload="none" />}
      <WorkspaceObject
        data={data}
        delay={delay}
        pressed={playing}
        active={playing}
        labelText={playing ? data.label.altText : data.label.text}
        onActivate={() => setPlaying((p) => !p)}
      />
    </>
  );
}
