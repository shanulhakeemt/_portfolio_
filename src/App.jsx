import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import HeroSection from "./components/Sections/HeroSection";
import SkillsSection from "./components/Sections/SkillsSection";
import WorkSection from "./components/Sections/WorkSection";
import AboutSection from "./components/Sections/AboutSection";
import ContactSection from "./components/Sections/ContactSection";

function App() {
  return (
    <ThemeProvider>
      <div>
        <Navbar />
        <HeroSection />
        <SkillsSection />
        <WorkSection />
        <AboutSection />
        <ContactSection />
      </div>
    </ThemeProvider>
  );
}

export default App;
