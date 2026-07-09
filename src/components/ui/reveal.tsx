"use client";

import { motion, type Variants } from "framer-motion";
import { fadeInUp } from "@/animations/variants";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "article";
}

export function Reveal({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
