
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/section-heading";
import { scrollToId } from "@/lib/utils";
import { staggerContainer, fadeInUp } from "@/animations/variants";

export function Services() {
  return (
    <section id="services" className="section-padding bg-muted/30">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Services"
          title="How I can help you"
          description="From idea to launch, I deliver end-to-end product design and engineering."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.button
              key={service.title}
              type="button"
              onClick={() => scrollToId("contact")}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="glow-border group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-7 text-left shadow-soft"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary transition-transform group-hover:scale-110">
                  <service.icon className="h-7 w-7" />
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {service.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {service.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[11px] text-muted-foreground"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
