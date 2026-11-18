export interface Artwork { id: string; src: string; alt: string; w: number; h: number }

/** Order matters: a1 → a6. w/h are the real pixel dimensions of each file (orientation is derived from them). */
export const ARTWORKS: Artwork[] = [
  { id: "a1", src: "/assets/hobbies/a1.jpg", alt: "Original artwork 1 of 6", w: 2000, h: 1429 },
  { id: "a2", src: "/assets/hobbies/a2.jpg", alt: "Original artwork 2 of 6", w: 686, h: 960 },
  { id: "a3", src: "/assets/hobbies/a3.jpg", alt: "Original artwork 3 of 6", w: 1429, h: 2000 },
  { id: "a4", src: "/assets/hobbies/a4.jpg", alt: "Original artwork 4 of 6", w: 2000, h: 1429 },
  { id: "a5", src: "/assets/hobbies/a5.jpg", alt: "Original artwork 5 of 6", w: 514, h: 720 },
  { id: "a6", src: "/assets/hobbies/a6.jpg", alt: "Original artwork 6 of 6", w: 1257, h: 1670 },
];

export const PAPER_SRC = "/assets/hobbies/paper.png";
