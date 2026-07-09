
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  Copy,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { siteConfig } from "@/constants/site";
import { socials } from "@/data/socials";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "success" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const web3formsKey = import.meta.env.VITE_WEB3FORMS_KEY;

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      next.message = "Message must be at least 10 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");

    try {
      if (!web3formsKey) throw new Error("No key");
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio enquiry from ${form.name}`,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error("Submission failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactCards = [
    { icon: Mail, label: "Email", value: siteConfig.email, href: siteConfig.socials.email },
    { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
    { icon: MapPin, label: "Location", value: siteConfig.location, href: undefined },
  ];

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something great"
          description="Have a project in mind or just want to say hi? My inbox is always open."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: info */}
          <div className="flex flex-col gap-6">
            <Reveal className="flex flex-col gap-4">
              {contactCards.map((card) => (
                <div
                  key={card.label}
                  className="glass-card flex items-center gap-4 rounded-2xl p-5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                    <card.icon className="h-6 w-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {card.label}
                    </p>
                    {card.href ? (
                      <a
                        href={card.href}
                        className="block truncate font-medium transition-colors hover:text-primary"
                      >
                        {card.value}
                      </a>
                    ) : (
                      <p className="font-medium">{card.value}</p>
                    )}
                  </div>
                  {card.label === "Email" && (
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label="Copy email"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-secondary" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
              ))}
            </Reveal>

            {/* Socials */}
            <Reveal className="glass-card rounded-2xl p-5" delay={0.1}>
              <p className="text-sm font-medium">Connect with me</p>
              <div className="mt-3 flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary hover:text-primary"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Map placeholder */}
            <Reveal
              className="glass-card relative flex h-48 items-center justify-center overflow-hidden rounded-2xl"
              delay={0.15}
            >
              <div className="absolute inset-0 bg-grid-pattern bg-[size:28px_28px] opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
              <div className="relative flex flex-col items-center gap-2 text-center">
                <span className="flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-primary text-white">
                  <MapPin className="h-6 w-6" />
                </span>
                <p className="font-medium">{siteConfig.location}</p>
                <p className="text-xs text-muted-foreground">
                  Available worldwide · Remote friendly
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal className="glass-card rounded-2xl p-8" delay={0.1}>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="mt-1.5 h-12 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="mt-1.5 h-12 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="you@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="mt-1.5 w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="glow"
                size="lg"
                className="w-full"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>

              <AnimatePresence>
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-secondary/15 px-4 py-3 text-sm text-secondary"
                  >
                    <Check className="h-4 w-4" />
                    Thanks! Your message has been sent successfully.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-500"
                  >
                    <AlertCircle className="h-4 w-4" />
                    Something went wrong. Please try again or email me directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
