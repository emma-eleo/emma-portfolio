/** Centralised asset paths. Everything lives under /public/assets. */
export const ASSETS = {
  workspace: {
    table: "/assets/workspace/table.png",
    cinnamon: "/assets/workspace/cinnamon.png",
    coffee: "/assets/workspace/coffee.png",
    notebook: "/assets/workspace/Group 1.png",
    player: "/assets/workspace/player.png",
  },
} as const;

/**
 * MUSIC PLAYER AUDIO SOURCE
 * Drop an audio file you own the rights to into /public/assets/audio/ and set the path here,
 * e.g. "/assets/audio/my-song.mp3". Leave as "" until then (no music is selected for you).
 */
export const AUDIO_SRC = "";

/**
 * RESUME PDF
 * Put your final resume at /public/assets/resume/Emma-Resume.pdf (or change the path here).
 * Until the file exists, the Resume tab shows "Resume coming soon" and the download button is disabled.
 */
export const RESUME_SRC = "/assets/resume/Emma-Resume.pdf";

export const ABOUT_ASSETS = {
  notebook: "/assets/about/Firefly.png",
  photo: "/assets/about/emmababy.png",
} as const;
