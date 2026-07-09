
import { motion } from "framer-motion";
import { achievements } from "@/data/achievements";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, fadeInUp } from "@/animations/variants";

export function Achievements() {
  return (
    <section id="achievements" className="section-padding">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Achievements"
          title="Milestones & recognition"
          description="Competitions, hackathons, awards and moments that mark my journey."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {achievements.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="glow-border glass-card group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                    {item.year}
                  </span>
                </div>
                <span className="mt-4 inline-block rounded-full bg-secondary/15 px-2.5 py-0.5 text-[11px] font-medium text-secondary">
                  {item.category}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
