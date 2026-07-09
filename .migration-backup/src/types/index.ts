import type React from "react";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
}

export interface TimelineItem {
  title: string;
  organization: string;
  period: string;
  location?: string;
  description: string;
  highlights: string[];
  type?: string;
}

export type IconComponent = React.ComponentType<{ className?: string }>;

export interface Skill {
  name: string;
  level: number;
  description: string;
  icon: IconComponent;
}

export interface SkillCategory {
  category: string;
  icon: LucideIcon;
  skills: Skill[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  stack: string[];
  category: string;
  featured: boolean;
  image: string;
  gradient: string;
  github?: string;
  demo?: string;
  caseStudy?: string;
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  skills: string[];
  gradient: string;
}

export interface Achievement {
  title: string;
  description: string;
  year: string;
  category: string;
  icon: LucideIcon;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  image: string;
  gradient: string;
}

export interface GalleryItem {
  title: string;
  category: string;
  gradient: string;
  span: string;
}

export interface EducationItem {
  institution: string;
  qualification: string;
  period: string;
  description: string;
  highlights: string[];
}
