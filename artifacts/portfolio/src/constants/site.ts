import type { NavItem } from "@/types";

export const siteConfig = {
  name: "Arinda Joseph",
  title:
    "Arinda Joseph | Software Engineer, Full-Stack & AI Developer",
  shortName: "Arinda Joseph",
  role: "Software Engineer | Full-Stack Web Developer | AI Developer | UI/UX Designer | Student Innovator",
  location: "Uganda",
  tagline: "Building intelligent software that solves real-world problems.",
  description:
    "Arinda Joseph is a software engineer and full-stack web & AI developer from Uganda, building intelligent, production-ready software that solves real-world problems.",
  url: import.meta.env.VITE_SITE_URL ?? "https://arindajoseph.vercel.app",
  email: "arindajoseph256@gmail.com",
  phone: "+256 700 000 000",
  cv: "/arinda-joseph-cv.pdf",
  ogImage: "/og-image.png",
  keywords: [
    "Arinda Joseph",
    "Software Engineer",
    "Full-Stack Developer",
    "AI Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "UI/UX Designer",
    "Uganda Developer",
    "Web Developer Portfolio",
  ],
  socials: {
    github: "https://github.com/arindajoseph256-droid",
    linkedin: "https://www.linkedin.com/in/arinda-joseph",
    twitter: "https://twitter.com/arindajoseph",
    email: "mailto:arindajoseph256@gmail.com",
  },
} as const;

export const navItems: NavItem[] = [
  { label: "Home",           href: "/" },
  { label: "About",          href: "/about" },
  { label: "Skills",         href: "/skills" },
  { label: "Projects",       href: "/projects" },
  { label: "Experience",     href: "/experience" },
  { label: "Education",      href: "/education" },
  { label: "Certifications", href: "/certifications" },
  { label: "Achievements",   href: "/achievements" },
  { label: "Services",       href: "/services" },
  { label: "Testimonials",   href: "/testimonials" },
  { label: "Blog",           href: "/blog" },
  { label: "Gallery",        href: "/gallery" },
  { label: "Contact",        href: "/contact" },
];
