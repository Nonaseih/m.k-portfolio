import React, { useState } from "react";
import "./thin-tech.css";
import "./mobile-menu.css";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const sections = [
  { label: "HOME", file: "HOME.TXT" },
  { label: "ABOUT", file: "ABOUT.TXT" },
  { label: "EXPERIENCE", file: "EXPERIENCE.TXT" },
  { label: "PROJECTS", file: "PROJECTS.TXT" },
  { label: "CONTACT", file: "CONTACT.TXT" },
];

function App() {
  const [currentSection, setCurrentSection] = useState("ABOUT");

  return (
    <div
      className="min-h-screen text-white font-mono thin-tech relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #080e1f 0%, #0b1628 60%, #0e1f38 100%)" }}
    >
      {/* Grid background overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(90deg,rgba(96,165,250,0.04)_1px,transparent_1px),linear-gradient(rgba(96,165,250,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      {/* Background Watermark Text */}
      <div className="fixed inset-0 flex justify-center items-center z-0 pointer-events-none select-none">
        <span className="text-[10vw] font-thin text-blue-950 opacity-30 tracking-widest" style={{ fontFamily: "Share Tech Mono, monospace" }}>
          MOSES KOLAWOLE
        </span>
      </div>

      <Navbar sections={sections} currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
