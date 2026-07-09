import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";
import { navItems, siteConfig } from "@/constants/site";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CommandPalette } from "@/components/layout/command-palette";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Primary nav items shown in the desktop bar
const PRIMARY = ["/", "/about", "/projects", "/experience", "/contact"];
// Everything else goes in the "More" dropdown
const primaryItems = navItems.filter((i) => PRIMARY.includes(i.href));
const moreItems    = navItems.filter((i) => !PRIMARY.includes(i.href));

export function Navbar() {
  const { scrolled } = useScrollProgress(30);
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

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
          "mt-4 flex w-full max-w-6xl items-center justify-between rounded-2xl px-5 transition-all duration-300",
          scrolled
            ? "glass py-2 shadow-soft"
            : "border border-transparent bg-transparent py-3",
        )}
      >
        {/* ── Logo ── */}
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Home">
          <motion.span
            whileHover={{ rotate: 12, scale: 1.05 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-accent to-secondary text-sm font-bold text-white shadow-glow"
          >
            {initials}
          </motion.span>
          <span className="hidden text-sm font-semibold sm:block">{siteConfig.name}</span>
        </Link>

        {/* ── Desktop nav ── */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {primaryItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}

          {/* ── More dropdown ── */}
          <li className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
              className={cn(
                "flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                moreItems.some((i) => isActive(i.href))
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              More
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform", moreOpen && "rotate-180")}
              />
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 top-full z-50 mt-2 w-48 -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
                >
                  {moreItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMoreOpen(false)}
                          className={cn(
                            "block px-4 py-2.5 text-sm transition-colors",
                            active
                              ? "bg-primary/10 font-medium text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* ── Right cluster ── */}
        <div className="flex items-center gap-2">
          <CommandPalette />
          <ThemeToggle />
          <Button size="sm" className="hidden lg:inline-flex" asChild>
            <Link href="/contact">Hire Me</Link>
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute inset-x-4 top-20 z-40 max-h-[70vh] overflow-y-auto rounded-2xl border border-border bg-card p-4 shadow-2xl lg:hidden"
          >
            <ul className="grid grid-cols-2 gap-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Button className="mt-3 w-full" asChild>
              <Link href="/contact" onClick={() => setMobileOpen(false)}>
                Hire Me
              </Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
