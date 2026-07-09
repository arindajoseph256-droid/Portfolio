
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

function levelLabel(level: number) {
  if (level >= 90) return "Expert";
  if (level >= 80) return "Advanced";
  if (level >= 70) return "Proficient";
  return "Intermediate";
}

export function Skills() {
  const [active, setActive] = useState(0);
  const category = skillCategories[active];

  return (
    <section id="skills" className="section-padding bg-muted/30">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Skills"
          title="My technical toolbox"
          description="A broad, battle-tested stack spanning frontend, backend, AI, and everything in between."
        />

        {/* Category tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {skillCategories.map((cat, i) => (
            <button
              key={cat.category}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                active === i
                  ? "border-primary bg-primary text-primary-foreground shadow-soft"
                  : "border-border bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              <cat.icon className="h-4 w-4" />
              {cat.category}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {category.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card group rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-primary transition-transform group-hover:scale-110">
                      <skill.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{skill.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {levelLabel(skill.level)}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {skill.level}%
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {skill.description}
                </p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.05 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
