import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Minimal Slot implementation: merges its props onto its single child element
 * so components can render `asChild` (e.g. wrap an anchor with button styles).
 */
export const Slot = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }
>(({ children, className, ...props }, ref) => {
  if (React.isValidElement(children)) {
    const child = children as React.ReactElement<
      Record<string, unknown> & { className?: string }
    >;
    return React.cloneElement(child, {
      ...props,
      ...child.props,
      ref,
      className: cn(className, child.props.className),
    });
  }
  return null;
});
Slot.displayName = "Slot";
