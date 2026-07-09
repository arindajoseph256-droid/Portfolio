"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ImageIcon, ZoomIn } from "lucide-react";
import { galleryItems } from "@/data/gallery";
import type { GalleryItem } from "@/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="section-padding">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Gallery"
          title="A visual showcase"
          description="Snapshots of interfaces, products and prototypes I've crafted."
        />

        <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
          {galleryItems.map((item, i) => (
            <motion.button
              key={item.title}
              type="button"
              onClick={() => setSelected(item)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-gradient-to-br text-left",
                item.gradient,
                item.span,
              )}
            >
              <div className="absolute inset-0 bg-grid-pattern bg-[size:22px_22px] opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center opacity-40 transition-opacity group-hover:opacity-70">
                <ImageIcon className="h-10 w-10 text-white" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-xs font-medium uppercase tracking-wider text-white/70">
                  {item.category}
                </span>
                <span className="flex items-center gap-2 font-semibold text-white">
                  {item.title}
                  <ZoomIn className="h-4 w-4" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
              >
                <X className="h-5 w-5" />
              </button>
              <div
                className={cn(
                  "flex aspect-video items-center justify-center bg-gradient-to-br",
                  selected.gradient,
                )}
              >
                <div className="absolute inset-0 bg-grid-pattern bg-[size:28px_28px] opacity-20" />
                <ImageIcon className="h-20 w-20 text-white/70" />
              </div>
              <div className="bg-card p-6">
                <span className="text-xs font-medium uppercase tracking-wider text-primary">
                  {selected.category}
                </span>
                <h3 className="mt-1 font-display text-xl font-semibold">
                  {selected.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
