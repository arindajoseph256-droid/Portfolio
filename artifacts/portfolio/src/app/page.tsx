import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Skills } from "@/sections/skills";
import { Projects } from "@/sections/projects";
import { Experience } from "@/sections/experience";
import { Education } from "@/sections/education";
import { Certifications } from "@/sections/certifications";
import { Achievements } from "@/sections/achievements";
import { Services } from "@/sections/services";
import { Testimonials } from "@/sections/testimonials";
import { Blog } from "@/sections/blog";
import { Gallery } from "@/sections/gallery";
import { Contact } from "@/sections/contact";
import { TechMarquee } from "@/components/layout/tech-marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <TechMarquee />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Achievements />
      <Services />
      <Testimonials />
      <Blog />
      <Gallery />
      <Contact />
    </>
  );
}
