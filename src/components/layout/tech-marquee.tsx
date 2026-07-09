"use client";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiFramer,
  SiFigma,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiFirebase,
  SiVercel,
  SiGit,
  SiOpenai,
} from "react-icons/si";
import type { IconType } from "react-icons";

const logos: { name: string; icon: IconType }[] = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Python", icon: SiPython },
  { name: "Framer", icon: SiFramer },
  { name: "Figma", icon: SiFigma },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Docker", icon: SiDocker },
  { name: "Firebase", icon: SiFirebase },
  { name: "Vercel", icon: SiVercel },
  { name: "Git", icon: SiGit },
  { name: "OpenAI", icon: SiOpenai },
];

export function TechMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-border bg-muted/20 py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-marquee gap-12">
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <logo.icon className="h-8 w-8" />
            <span className="text-sm font-medium">{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
