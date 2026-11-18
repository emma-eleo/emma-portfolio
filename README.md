# Emma's Portfolio (E's Essentials)

Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion

## Run
    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

Requires Node 18.18+ (Node 20/22 recommended). Fonts (Carattere, Dawning of a New Day, Gentium Book Basic, Caveat)
are installed from npm (@fontsource/*) — no internet font loading.

## Where to edit
- `data/projects.ts` — project descriptions, screenshots, tech, GitHub/demo links
- `data/foods.ts`, `data/artworks.ts`, `data/about.ts` — gallery and About content
- `data/workspace.ts` — position/scale/shadow of each object on the table
- `lib/assets.ts` — music file (`AUDIO_SRC`) and resume PDF path (`RESUME_SRC`)
- `public/assets/` — all images; put the resume at `public/assets/resume/Emma-Resume.pdf`
- `source-originals/` — original HEIC photos (not used by the site)
- `fonts/` — copies of the font files (the site itself loads them from the @fontsource npm packages)
