import { Code2, Rocket, Trophy, Cpu } from "lucide-react";
import type { Stat } from "@/types";

export const bio = {
  intro:
    "I'm Arinda Joseph, a software engineer and full-stack developer from Uganda who loves turning ambitious ideas into elegant, dependable products. My work spans modern web platforms, AI-powered tools, and thoughtful user experiences.",
  body: "As a student innovator, I combine strong engineering fundamentals with a designer's eye for detail. I build with the modern web stack — Next.js, React, TypeScript and Tailwind CSS — and I'm deeply interested in applied AI, developer experience, and building software that genuinely helps people learn, create and grow.",
};

export const mission =
  "To build intelligent, accessible software that solves real-world problems and empowers communities — especially across Africa — through technology.";

export const vision =
  "To become a world-class engineer and founder, shipping products used by millions and mentoring the next generation of African developers.";

export const values = [
  {
    title: "Craftsmanship",
    description:
      "Every detail matters — from pixel-perfect UI to clean, maintainable architecture.",
  },
  {
    title: "Impact",
    description:
      "I build things that solve real problems and create measurable value for people.",
  },
  {
    title: "Curiosity",
    description:
      "I'm relentlessly learning — new tools, new ideas, and better ways to build.",
  },
  {
    title: "Integrity",
    description:
      "Honest work, accessible products, and code I'm proud to put my name on.",
  },
];

export const careerGoals = [
  "Ship AI-driven products that reach and empower thousands of learners.",
  "Contribute to open-source and the global developer community.",
  "Lead engineering teams that build with excellence and empathy.",
  "Mentor upcoming African innovators and student developers.",
];

export const stats: Stat[] = [
  { label: "Years of Learning", value: 4, suffix: "+", icon: Rocket },
  { label: "Projects Completed", value: 25, suffix: "+", icon: Code2 },
  { label: "Technologies Mastered", value: 30, suffix: "+", icon: Cpu },
  { label: "Achievements & Awards", value: 8, suffix: "+", icon: Trophy },
];
