import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Education } from "@/components/sections/education";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { SectionTransition } from "@/components/section-transition";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SectionTransition>
          <About />
        </SectionTransition>
        <SectionTransition delay={0.05}>
          <Skills />
        </SectionTransition>
        <SectionTransition delay={0.05}>
          <Experience />
        </SectionTransition>
        <SectionTransition delay={0.05}>
          <Projects />
        </SectionTransition>
        <SectionTransition delay={0.05}>
          <Education />
        </SectionTransition>
        <SectionTransition delay={0.05}>
          <Certifications />
        </SectionTransition>
        <SectionTransition delay={0.05}>
          <Contact />
        </SectionTransition>
      </main>
      <Footer />
    </div>
  );
}
