import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  CornerDownLeft,
  Command as CommandIcon,
  FileDown,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";
import { useLocation } from "wouter";
import { navItems, siteConfig } from "@/constants/site";

interface CommandItem {
  label: string;
  hint: string;
  action: () => void;
  keywords?: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [, navigate] = useLocation();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) setQuery("");
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    navigate(href);
  };

  const items: CommandItem[] = useMemo(() => {
    const navCommands: CommandItem[] = navItems.map((item) => ({
      label: `Go to ${item.label}`,
      hint: "Navigation",
      action: () => go(item.href),
      keywords: item.label,
    }));

    const actions: CommandItem[] = [
      {
        label: "Download CV",
        hint: "Action",
        action: () => { window.open(siteConfig.cv, "_blank"); setOpen(false); },
        keywords: "resume cv download",
      },
      {
        label: "Email me",
        hint: "Contact",
        action: () => { window.location.href = siteConfig.socials.email; setOpen(false); },
        keywords: "email contact mail",
      },
      {
        label: "Open GitHub",
        hint: "Social",
        action: () => { window.open(siteConfig.socials.github, "_blank"); setOpen(false); },
        keywords: "github code",
      },
      {
        label: "Open LinkedIn",
        hint: "Social",
        action: () => { window.open(siteConfig.socials.linkedin, "_blank"); setOpen(false); },
        keywords: "linkedin",
      },
    ];

    return [...actions, ...navCommands];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = items.filter((item) =>
    `${item.label} ${item.keywords ?? ""}`.toLowerCase().includes(query.toLowerCase()),
  );

  const iconFor = (label: string) => {
    if (label.includes("CV"))       return <FileDown className="h-4 w-4" />;
    if (label.includes("Email"))    return <Mail className="h-4 w-4" />;
    if (label.includes("GitHub"))   return <Github className="h-4 w-4" />;
    if (label.includes("LinkedIn")) return <Linkedin className="h-4 w-4" />;
    return <CornerDownLeft className="h-4 w-4" />;
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="hidden items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted md:inline-flex"
      >
        <Search className="h-4 w-4" />
        <span>Search</span>
        <kbd className="ml-2 flex items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium">
          <CommandIcon className="h-3 w-3" />K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-start justify-center bg-black/50 p-4 pt-[15vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-border px-4">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages and actions..."
                  className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px]">ESC</kbd>
              </div>
              <ul className="max-h-80 overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                    No results found.
                  </li>
                )}
                {filtered.map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={item.action}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted"
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-muted-foreground">{iconFor(item.label)}</span>
                        {item.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{item.hint}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
