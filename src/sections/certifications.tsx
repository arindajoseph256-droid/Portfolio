"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X, BadgeCheck, Calendar } from "lucide-react";
import { certifications } from "@/data/certifications";
import type { Certification } from "@/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function Certifications() {
  const [selected, setSelected] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="section-padding bg-muted/30">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials & continuous learning"
          description="Professional certifications that back my expertise across the stack."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <motion.button
              key={cert.title}
              type="button"
              onClick={() => setSelected(cert)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="glass-card group overflow-hidden rounded-2xl p-6 text-left"
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white",
                  cert.gradient,
                )}
              >
                <Award className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {cert.title}
              </h3>
              <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {cert.skills.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[11px] text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {cert.date}
                <span className="ml-auto font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  View →
                </span>
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur transition-colors hover:bg-black/40"
              >
                <X className="h-4 w-4" />
              </button>
              {/* Certificate visual */}
              <div
                className={cn(
                  "flex h-52 flex-col items-center justify-center bg-gradient-to-br text-white",
                  selected.gradient,
                )}
              >
                <BadgeCheck className="h-16 w-16" />
                <p className="mt-3 text-sm font-medium uppercase tracking-widest opacity-90">
                  Certificate of Completion
                </p>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold">
                  {selected.title}
                </h3>
                <p className="mt-1 text-muted-foreground">{selected.issuer}</p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">
                      Issued
                    </p>
                    <p className="font-medium">{selected.date}</p>
                  </div>
                  {selected.credentialId && (
                    <div>
                      <p className="text-xs uppercase text-muted-foreground">
                        Credential ID
                      </p>
                      <p className="font-mono text-xs font-medium">
                        {selected.credentialId}
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-xs uppercase text-muted-foreground">
                    Skills
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selected.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-muted/60 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
