"use client";
import { useState } from "react";
import ArtGallery from "./ArtGallery";
import CookingGallery from "./CookingGallery";
import Folder, { type FolderTab } from "./Folder";

const TABS: FolderTab<"arts" | "cooking">[] = [
  { id: "arts", label: "Visual Arts" },
  { id: "cooking", label: "Culinary Arts" },
];

export default function Hobbies({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<"arts" | "cooking">("arts");
  return (
    <Folder label="My hobbies" tabs={TABS} active={tab} onChange={setTab} onBack={onBack} contentKey={tab}>
      {tab === "arts" ? <ArtGallery /> : <CookingGallery />}
    </Folder>
  );
}
