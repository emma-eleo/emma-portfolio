"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Workspace from "@/components/Workspace";
import Hobbies from "@/components/Hobbies";
import Projects from "@/components/Projects";
import AboutMe from "@/components/AboutMe";
import Contact from "@/components/Contact";
import type { SectionId } from "@/data/workspace";

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.4, ease: "easeInOut" as const } };

export default function Home() {
  const [section, setSection] = useState<SectionId | null>(null);
  const back = () => setSection(null);
  return (
    <AnimatePresence mode="wait">
      {section === "hobbies" ? (
        <motion.div key="hobbies" {...fade}><Hobbies onBack={back} /></motion.div>
      ) : section === "projects" ? (
        <motion.div key="projects" {...fade}><Projects onBack={back} /></motion.div>
      ) : section === "about" ? (
        <motion.div key="about" {...fade}><AboutMe onBack={back} /></motion.div>
      ) : section === "contact" ? (
        <motion.div key="contact" {...fade}><Contact onBack={back} /></motion.div>
      ) : (
        <motion.div key="workspace" {...fade}><Workspace onNavigate={setSection} /></motion.div>
      )}
    </AnimatePresence>
  );
}
