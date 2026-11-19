/** Centralised asset paths. Everything lives under /public/assets. */
export const ASSETS = {
  workspace: {
    table: "/assets/workspace/table.png",
    cinnamon: "/assets/workspace/cinnamon.png",
    coffee: "/assets/workspace/coffee.png",
    notebook: "/assets/workspace/Group 1.png", // legacy single-image notebook (no longer used on the table)
    diary: "/assets/workspace/firefly.png", // leather diary, used on the table
    polaroid: "/assets/workspace/polaroid.png", // photo laid on top of the diary
    player: "/assets/workspace/player.png",
  },
} as const;


export const SPOTIFY_TRACK_URL = "https://open.spotify.com/track/2wo8xxzFHcB7WorvcIBkfD?si=14f805ac1ac0477e";

export const RESUME_SRC = "/assets/resume/Emma-Resume.pdf";

export const ABOUT_ASSETS = {
  notebook: "/assets/about/Firefly.png",
  photo: "/assets/about/emmababy.png",
} as const;
