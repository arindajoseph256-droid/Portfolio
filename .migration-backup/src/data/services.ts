import {
  Globe,
  BrainCircuit,
  LayoutTemplate,
  Server,
  Plug,
  Database,
  Smartphone,
  Gauge,
  Palette,
} from "lucide-react";
import type { Service } from "@/types";

export const services: Service[] = [
  {
    title: "Web Development",
    description:
      "End-to-end web applications built with modern, scalable and maintainable architectures.",
    icon: Globe,
    features: ["Next.js & React", "Scalable architecture", "Production-ready"],
  },
  {
    title: "AI Development",
    description:
      "Intelligent features powered by LLMs and machine learning integrated into real products.",
    icon: BrainCircuit,
    features: ["LLM integration", "AI workflows", "Smart automation"],
  },
  {
    title: "Frontend Development",
    description:
      "Pixel-perfect, accessible and animated interfaces that users love to interact with.",
    icon: LayoutTemplate,
    features: ["Responsive UI", "Animations", "Accessibility"],
  },
  {
    title: "Backend Development",
    description:
      "Robust, secure server-side systems and business logic that scale with your users.",
    icon: Server,
    features: ["Node & Python", "Auth & security", "Scalable services"],
  },
  {
    title: "API Development",
    description:
      "Well-documented REST APIs designed for performance, reliability and easy integration.",
    icon: Plug,
    features: ["REST APIs", "Documentation", "Integrations"],
  },
  {
    title: "Database Design",
    description:
      "Efficient, normalized data models and queries for relational and NoSQL databases.",
    icon: Database,
    features: ["Schema design", "Optimization", "SQL & NoSQL"],
  },
  {
    title: "Responsive Website Design",
    description:
      "Mobile-first websites that look and perform beautifully on every screen size.",
    icon: Smartphone,
    features: ["Mobile-first", "Cross-device", "Modern design"],
  },
  {
    title: "Website Optimization",
    description:
      "Performance, SEO and Core Web Vitals tuning for lightning-fast, discoverable sites.",
    icon: Gauge,
    features: ["Performance", "SEO", "Core Web Vitals"],
  },
  {
    title: "UI/UX Design",
    description:
      "Thoughtful, research-driven interface design from wireframes to polished prototypes.",
    icon: Palette,
    features: ["Wireframing", "Prototyping", "Design systems"],
  },
];
