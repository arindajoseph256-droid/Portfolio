"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, siteConfig } from "@/constants/site";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useActiveSection } from "@/hooks/use-active-section";
import { scrollToId, cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CommandPalette } from "@/components/layout/command-palette";
import { Button } from "@/components/ui/button";

const sectionIds = navItems.map((item) => item.href.replace("#", ""));

export function Navbar() {
  const { scrolled } = useScrollProgress(30);
  const active = useActiveSection(sectionIds);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    scrollToId(href.replace("#", ""));
  };

  const initials = siteConfig.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4"
    >
      <nav
        className={cn(
          "mt-4 flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 transition-all duration-300",
          scrolled
            ? "glass py-2 shadow-soft"
            : "border border-transparent bg-transparent py-3",
        )}
      >
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollToId("home")}
          className="group flex items-center gap-2"
          aria-label="Go to home"
        >
          <motion.span
            whileHover={{ rotate: 12, scale: 1.05 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-accent to-secondary text-sm font-bold text-white shadow-glow"
          >
            {initials}
          </motion.span>
          <span className="hidden text-sm font-semibold sm:block">
            {siteConfig.name}
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() => handleNav(item.href)}
                  className={cn(
                    "relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <CommandPalette />
          <ThemeToggle />
          <Button
            size="sm"
            className="hidden lg:inline-flex"
            onClick={() => scrollToId("contact")}
          >
            Hire Me
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 xl:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute inset-x-4 top-20 z-40 max-h-[70vh] overflow-y-auto rounded-2xl border border-border bg-card p-4 shadow-2xl xl:hidden"
          >
            <ul className="grid grid-cols-2 gap-1">
              {navItems.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = active === id;
                return (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => handleNav(item.href)}
                      className={cn(
                        "w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
            <Button
              className="mt-3 w-full"
              onClick={() => handleNav("#contact")}
            >
              Hire Me
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
