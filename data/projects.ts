export interface Project {
  id: string;
  name: string;
  /** Everything below is optional — add it and the detail view shows it automatically. */
  description?: string;
  screenshots?: { src: string; alt: string }[];
  technologies?: string[];
  github?: string;
  demo?: string;
}

export const PROJECTS: Project[] = [
  { id: "alphamath", name: "Alphamath" },
  { id: "noax", name: "Noax" },
  { id: "roan", name: "Roan" },
  { id: "sat-tracker", name: "SAT Tracker" },
];
