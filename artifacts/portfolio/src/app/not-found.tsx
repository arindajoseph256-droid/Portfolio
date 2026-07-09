import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="absolute left-1/4 top-1/3 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 -z-10 h-72 w-72 rounded-full bg-accent/20 blur-[120px]" />
      <p className="font-display text-8xl font-bold gradient-text sm:text-9xl">
        404
      </p>
      <h1 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild variant="glow" size="lg">
          <a href="/">
            <Home className="h-4 w-4" />
            Back to Home
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="/#contact">
            <ArrowLeft className="h-4 w-4" />
            Contact Me
          </a>
        </Button>
      </div>
    </div>
  );
}
