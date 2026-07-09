
import { motion } from "framer-motion";
import { GraduationCap, Target } from "lucide-react";
import { education, futureGoals } from "@/data/education";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Education() {
  return (
    <section id="education" className="section-padding">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Education"
          title="Learning never stops"
          description="My academic path and the self-directed journey that shaped me as an engineer."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Education timeline */}
          <div className="space-y-6">
            {education.map((item, i) => (
              <motion.div
                key={item.institution}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card group rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                    <GraduationCap className="h-6 w-6" />
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold">
                        {item.institution}
                      </h3>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-accent">
                      {item.qualification}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {item.highlights.map((h) => (
                        <li
                          key={h}
                          className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Future goals */}
          <Reveal className="glass-card h-fit rounded-2xl p-8" delay={0.15}>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                <Target className="h-6 w-6" />
              </span>
              <h3 className="font-display text-xl font-semibold">
                Future Goals
              </h3>
            </div>
            <ul className="mt-6 space-y-4">
              {futureGoals.map((goal, i) => (
                <li key={goal} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">{goal}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
