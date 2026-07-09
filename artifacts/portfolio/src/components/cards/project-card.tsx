
import { motion } from "framer-motion";
import { Github, ExternalLink, FileText, Star } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="glow-border group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/70 shadow-soft"
    >
      {/* Visual placeholder */}
      <div
        className={cn(
          "relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br",
          project.gradient,
        )}
      >
        <div className="absolute inset-0 bg-grid-pattern bg-[size:24px_24px] opacity-20" />
        {/* Browser mockup */}
        <div className="relative w-4/5 rounded-lg bg-black/20 p-2 backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
          <div className="mb-2 flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/60" />
            <span className="h-2 w-2 rounded-full bg-white/60" />
            <span className="h-2 w-2 rounded-full bg-white/60" />
          </div>
          <div className="flex h-20 items-center justify-center rounded bg-white/10">
            <span className="px-4 text-center text-lg font-bold text-white drop-shadow">
              {project.title}
            </span>
          </div>
        </div>
        {project.featured && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-xl font-semibold">{project.title}</h3>
        </div>
        <p className="mt-1 text-sm font-medium text-primary">
          {project.tagline}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {project.description}
        </p>

        {/* Features */}
        <ul className="mt-4 space-y-1.5">
          {project.features.slice(0, 3).map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-xs text-muted-foreground"
            >
              <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-secondary" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Stack */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary hover:text-primary"
            >
              <Github className="h-3.5 w-3.5" />
              Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </a>
          )}
          {project.caseStudy && (
            <a
              href={project.caseStudy}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-accent hover:text-accent"
            >
              <FileText className="h-3.5 w-3.5" />
              Case Study
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
