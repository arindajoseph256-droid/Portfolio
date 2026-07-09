"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paginate]);

  const current = testimonials[index];

  return (
    <section id="testimonials" className="section-padding">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Testimonials"
          title="What people say"
          description="Feedback from clients and collaborators I've had the pleasure to work with."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="relative min-h-[300px] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-3xl p-8 md:p-12"
              >
                <Quote className="h-10 w-10 text-primary/40" />
                <p className="mt-6 text-lg leading-relaxed text-foreground md:text-xl">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-lg font-bold text-white">
                    {current.avatar}
                  </span>
                  <div>
                    <p className="font-semibold">{current.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {current.role} · {current.company}
                    </p>
                    <div className="mt-1 flex gap-0.5">
                      {Array.from({ length: current.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => paginate(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === index
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60",
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => paginate(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
