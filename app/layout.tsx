import type { Metadata, Viewport } from "next";
import "@fontsource/dawning-of-a-new-day";
import "@fontsource/gentium-book-basic/latin-400.css";
import "@fontsource/carattere";
import "@fontsource/caveat";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emma's Workspace",
  description: "Emma's personal portfolio — an interactive workspace.",
};
export const viewport: Viewport = { themeColor: "#1C0909", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
