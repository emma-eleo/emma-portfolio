export interface Project {
  id: string;
  name: string;
  /** e.g. "Exam Preparation Platform" — shown under the name */
  category?: string;
  /** e.g. "2025–2026" — shown on the right of the name */
  period?: string;
  description: string;
  /** shown as one quiet line, joined with " · " */
  technologies?: string[];
  /** the single action button; always opens in a new tab */
  action: { type: "demo" | "github"; label: string; href: string };
}

export const PROJECTS: Project[] = [
  {
    id: "alphamath",
    name: "AlphaMath",
    category: "Exam Preparation Platform",
    period: "2025–2026",
    description:
      "An online math-learning platform designed to make exam preparation more accessible and efficient by bringing Mongolian university entrance exam (EYES) and SAT Math resources together.",
    technologies: ["HTML", "CSS", "JavaScript", "LaTeX"],
    action: { type: "demo", label: "View Demo", href: "https://alphamath-v1.vercel.app/" },
  },
  {
    id: "noux",
    name: "N.O.U.X",
    category: "Clothing Brand Website",
    period: "Jun-Aug 2026",
    description:
      "An experimental fashion website showcasing original clothing designs by my teammate, with the vision of evolving into an online shop.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    action: { type: "demo", label: "View Demo", href: "https://noax-beryl.vercel.app/" },
  },
  {
    id: "roan",
    name: "ROAN",
    category: "Restaurant Website (Agency Project)",
    period: "May-Jul 2026",
    description:
      "A concept website for a fictional Korean fine-dining restaurant inspired by the intersection of Mongolian heritage and contemporary Korean cuisine.",
    technologies: ["React", "JavaScript", "Tailwind CSS", "GSAP", "Framer Motion", "Vercel"],
    action: { type: "demo", label: "View Demo", href: "https://roa-nv3.vercel.app/" },
  },
  {
    id: "sat-seat-tracker",
    name: "SAT Seat Tracker",
    period: "Oct-Nov 2026",
    description:
      "A Python automation tool that monitors SAT test-center availability and sends near-real-time Telegram or Discord alerts when seats open.",
    technologies: ["Python", "Playwright", "Telegram Bot API", "Discord webhooks", "PyYAML", "python-dotenv"],
    action: { type: "github", label: "View GitHub", href: "https://github.com/emma-eleo/sat-seat-tracker" },
  },
];
