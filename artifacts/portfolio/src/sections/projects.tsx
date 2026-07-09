
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/cards/project-card";
import { staggerFast } from "@/animations/variants";
import { cn } from "@/lib/utils";

export function Projects() {
  const categories = useMemo(
    () => ["All", "Featured", ...Array.from(new Set(projects.map((p) => p.category)))],
    [],
  );
  const [filter, setFilter] = useState("All");

  const filtered = projects.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Featured") return p.featured;
    return p.category === filter;
  });

  return (
    <section id="projects" className="section-padding">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work & products"
          description="A collection of applications, platforms and tools I've designed and engineered."
        />

        {/* Filters */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                filter === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          key={filter}
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
