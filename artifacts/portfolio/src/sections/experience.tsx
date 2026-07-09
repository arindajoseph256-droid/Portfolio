
import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/section-heading";

export function Experience() {
  return (
    <section id="experience" className="section-padding bg-muted/30">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Experience"
          title="My professional journey"
          description="From internships and freelance work to founding products and leading teams."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary via-accent to-secondary md:left-1/2" />

          <div className="space-y-10">
            {experience.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className={`relative pl-12 md:w-1/2 md:pl-0 ${
                  i % 2 === 0
                    ? "md:pr-12 md:text-right"
                    : "md:ml-auto md:pl-12"
                }`}
              >
                {/* Dot */}
                <span
                  className={`absolute left-2.5 top-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background md:left-auto ${
                    i % 2 === 0 ? "md:-right-2" : "md:-left-2"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>

                <div className="glass-card rounded-2xl p-6 text-left">
                  <div
                    className={`flex items-center gap-2 ${
                      i % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {item.period}
                    </span>
                    {item.type && (
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        {item.type}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 flex items-center gap-2 font-display text-lg font-semibold">
                    <Briefcase className="h-4 w-4 text-primary" />
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-accent">
                    {item.organization}
                  </p>
                  {item.location && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </p>
                  )}
                  <p className="mt-3 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {item.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-secondary" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
