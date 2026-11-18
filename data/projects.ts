export interface Project {
  id: string;
  name: string;
  description?: string;
  /** Website / interface screenshot. Drop the PNG at this path (see scripts/capture-previews.mjs). */
  preview?: { src: string; alt: string };
  technologies?: string[];
  /** Live site. Adds a "View Demo" button; also used as a live fallback preview until a screenshot exists. */
  demo?: string;
  /** Repository. Adds a "View on GitHub" button. */
  github?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "alphamath",
    name: "AlphaMath",
    description:
      "An online math-learning platform designed to make exam preparation more accessible by bringing Mongolian university entrance exam (EYES) and SAT Math resources together. The project explores how thoughtful digital learning experiences can help students navigate different curricula, strengthen their problem-solving skills, and prepare more effectively for high-stakes exams.",
    preview: { src: "/assets/projects/alphamath.png", alt: "Screenshot of the AlphaMath website" },
    demo: "https://alphamath-v1.vercel.app/",
  },
  {
    id: "noux",
    name: "N.O.U.X",
    description:
      "An experimental fashion website designed to showcase original clothing designs created by my teammate, with the vision of evolving into an online shop. The project explores fashion presentation, brand identity, and e-commerce design; shopping functionality is still in development.",
    preview: { src: "/assets/projects/noux.png", alt: "Screenshot of the N.O.U.X fashion website" },
    demo: "https://noax-beryl.vercel.app/",
  },
  {
    id: "roan",
    name: "ROAN",
    description:
      "A concept website for ROAN, a fictional Korean fine-dining restaurant inspired by the intersection of Mongolian heritage and contemporary Korean cuisine. Designed to create an immersive digital experience through editorial storytelling, refined visual presentation, and an elegant dining concept.",
    preview: { src: "/assets/projects/roan.png", alt: "Screenshot of the ROAN restaurant website" },
    demo: "https://roa-nv3.vercel.app/",
  },
  {
    id: "sat-seat-tracker",
    name: "SAT Seat Tracker",
    description:
      "A Python-based automation tool that monitors SAT test-center availability and sends real-time Telegram alerts when seats open. Built to solve the challenge of repeatedly checking fully booked test centers, it helped me secure a seat just 11 hours before registration closed.",
    preview: { src: "/assets/projects/sat-seat-tracker.png", alt: "Screenshot of the SAT Seat Tracker" },
    // No live demo — GitHub only.
    github: "https://github.com/emma-eleo/sat-seat-tracker",
  },
];
