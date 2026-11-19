"use client";
import { useEffect, useRef, useState } from "react";
import { SPOTIFY_TRACK_URL } from "@/lib/assets";
import WorkspaceObject from "./WorkspaceObject";
import type { WorkspaceObjectData } from "@/data/workspace";

/** Minimal typing for Spotify's iFrame API (https://developer.spotify.com/documentation/embeds/references/iframe-api). */
interface SpotifyController {
  togglePlay(): void;
  pause(): void;
  destroy(): void;
  addListener(event: string, cb: (e: { data: { isPaused: boolean; position: number } }) => void): void;
}
interface SpotifyIFrameAPI {
  createController(el: HTMLElement, opts: { uri: string; width: string | number; height: number }, cb: (c: SpotifyController) => void): void;
}
declare global {
  interface Window { onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void }
}

const trackId = SPOTIFY_TRACK_URL.match(/track[/:]([A-Za-z0-9]+)/)?.[1] ?? "";

/**
 * The cassette on the table, backed by a Spotify embed. Never autoplays: the embed is created on the first click
 * and Spotify starts playing from that same click. The small Spotify player then appears so visitors can log in
 * for the full song (without logging in, Spotify only allows a ~30 s preview).
 */
export default function MusicPlayer({ data, delay }: { data: WorkspaceObjectData; delay?: number }) {
  const host = useRef<HTMLDivElement>(null);
  const ctrl = useRef<SpotifyController | null>(null);
  const api = useRef<SpotifyIFrameAPI | null>(null);
  const wantPlay = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [shown, setShown] = useState(false); // Spotify tray visible
  const [notice, setNotice] = useState(false);

  // Load Spotify's API script only once the visitor has interacted (no third-party requests before that).
  const ensureController = () => {
    if (ctrl.current || !trackId || !host.current) return;
    const make = (a: SpotifyIFrameAPI) => {
      api.current = a;
      a.createController(host.current!, { uri: `spotify:track:${trackId}`, width: "100%", height: 80 }, (c) => {
        ctrl.current = c;
        c.addListener("playback_update", (e) => setPlaying(!e.data.isPaused));
        if (wantPlay.current) c.togglePlay();
      });
    };
    if (api.current) return make(api.current);
    window.onSpotifyIframeApiReady = make;
    if (!document.getElementById("spotify-iframe-api")) {
      const s = document.createElement("script");
      s.id = "spotify-iframe-api"; s.src = "https://open.spotify.com/embed/iframe-api/v1"; s.async = true;
      document.body.appendChild(s);
    }
  };

  useEffect(() => () => { ctrl.current?.destroy(); }, []);

  const toggle = () => {
    if (!trackId) {
      setNotice(true);
      window.setTimeout(() => setNotice(false), 2600);
      return;
    }
    setShown(true);
    if (!ctrl.current) {
      wantPlay.current = true; // play as soon as the embed is ready
      ensureController();
    } else ctrl.current.togglePlay();
  };

  const label = notice ? "Song coming soon" : playing ? data.label.altText : data.label.text;

  return (
    <>
      <div className={`spotify-tray${shown ? " is-open" : ""}`} aria-hidden={!shown}>
        <div ref={host} />
      </div>
      <WorkspaceObject data={data} delay={delay} pressed={playing} active={playing} labelText={label} onActivate={toggle} />
    </>
  );
}
