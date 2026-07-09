
import { motion } from "framer-motion";
import { Download, FolderGit2, Mail, Sparkles, ArrowRight } from "lucide-react";
import { siteConfig } from "@/constants/site";
import { socials } from "@/data/socials";
import { scrollToId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Typewriter } from "@/components/ui/typewriter";
import { ParticleBackground } from "@/components/layout/particle-background";

const roles = [
  "Software Engineer",
  "Full-Stack Web Developer",
  "AI Developer",
  "UI/UX Designer",
  "Student Innovator",
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      {/* Background layers */}
      <ParticleBackground className="absolute inset-0 -z-10 h-full w-full opacity-70" />
      <div className="absolute inset-0 -z-10 bg-grid-pattern bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)] opacity-40" />
      <div className="absolute left-1/4 top-1/4 -z-10 h-72 w-72 rounded-full bg-primary/25 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-72 w-72 rounded-full bg-accent/25 blur-[120px]" />

      {/* Floating shapes */}
      <motion.div
        aria-hidden
        className="absolute left-[8%] top-[22%] -z-10 h-16 w-16 rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur-sm"
        animate={{ y: [0, -24, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[10%] top-[30%] -z-10 h-12 w-12 rounded-full border border-accent/30 bg-accent/5"
        animate={{ y: [0, 20, 0], x: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[18%] left-[16%] -z-10 h-10 w-10 rotate-45 border border-secondary/40 bg-secondary/5"
        animate={{ y: [0, -18, 0], rotate: [45, 90, 45] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-wide grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            Available for freelance & opportunities
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg font-medium text-muted-foreground"
          >
            <span className="inline-block animate-float">👋</span> Hi there, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            <span className="gradient-text animate-gradient-x">
              {siteConfig.name}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 flex min-h-[2.5rem] items-center text-2xl font-semibold sm:text-3xl"
          >
            <Typewriter words={roles} className="text-foreground" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground text-balance"
          >
            {siteConfig.tagline} Based in {siteConfig.location}, I craft
            elegant, high-performance web & AI experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button variant="glow" size="lg" asChild>
              <a href={siteConfig.cv} download>
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToId("projects")}
            >
              <FolderGit2 className="h-4 w-4" />
              View Projects
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToId("contact")}
            >
              <Mail className="h-4 w-4" />
              Hire Me
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 flex items-center gap-4"
          >
            <span className="text-sm text-muted-foreground">Find me on</span>
            <div className="flex gap-3">
              {socials.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    },
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Profile visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="group relative aspect-square">
            <motion.div
              className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary via-accent to-secondary opacity-80 blur-xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <div className="glass-card relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2rem]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-primary via-accent to-secondary text-6xl font-bold text-white shadow-glow">
                {siteConfig.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>

            {/* Floating tech badges */}
            <motion.div
              className="glass-card absolute -left-6 top-10 rounded-xl px-3 py-2 text-xs font-medium shadow-soft"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              ⚛️ React
            </motion.div>
            <motion.div
              className="glass-card absolute -right-4 top-1/3 rounded-xl px-3 py-2 text-xs font-medium shadow-soft"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              ▲ Next.js
            </motion.div>
            <motion.div
              className="glass-card absolute -bottom-4 left-1/4 rounded-xl px-3 py-2 text-xs font-medium shadow-soft"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity }}
            >
              🤖 AI
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollToId("about")}
        aria-label="Scroll to about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground md:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs">Scroll</span>
        <ArrowRight className="h-4 w-4 rotate-90" />
      </motion.button>
    </section>
  );
}
