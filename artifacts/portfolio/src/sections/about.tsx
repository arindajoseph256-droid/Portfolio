
import { motion } from "framer-motion";
import { Target, Eye, Check } from "lucide-react";
import {
  bio,
  mission,
  vision,
  values,
  careerGoals,
  stats,
} from "@/data/about";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { staggerContainer, fadeInUp } from "@/animations/variants";

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container-wide">
        <SectionHeading
          eyebrow="About Me"
          title="Turning ideas into intelligent software"
          description="A passionate engineer blending design sensibility with technical depth."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Bio */}
          <Reveal className="glass-card rounded-2xl p-8">
            <p className="text-lg leading-relaxed text-foreground">
              {bio.intro}
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {bio.body}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-muted/40 p-5">
                <Target className="h-6 w-6 text-primary" />
                <h3 className="mt-3 font-semibold">Mission</h3>
                <p className="mt-1 text-sm text-muted-foreground">{mission}</p>
              </div>
              <div className="rounded-xl border border-border bg-muted/40 p-5">
                <Eye className="h-6 w-6 text-accent" />
                <h3 className="mt-3 font-semibold">Vision</h3>
                <p className="mt-1 text-sm text-muted-foreground">{vision}</p>
              </div>
            </div>
          </Reveal>

          {/* Career goals + values */}
          <div className="flex flex-col gap-8">
            <Reveal className="glass-card rounded-2xl p-8" delay={0.1}>
              <h3 className="font-display text-xl font-semibold">
                Career Goals
              </h3>
              <ul className="mt-4 space-y-3">
                {careerGoals.map((goal) => (
                  <li key={goal} className="flex gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary" />
                    <span className="text-muted-foreground">{goal}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  className="glow-border rounded-2xl border border-border bg-card/60 p-5"
                >
                  <h4 className="font-semibold text-primary">{value.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <stat.icon className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-3 font-display text-4xl font-bold gradient-text">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
