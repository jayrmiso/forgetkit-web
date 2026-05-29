import * as React from "react";
import { cn } from "@/lib/utils";

export function Tooltip({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function TooltipTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) {
  if (!asChild) return <span>{children}</span>;
  return <>{children}</>;
}

export function TooltipContent({ className, hidden, children, ...props }: React.ComponentProps<"div"> & { hidden?: boolean }) {
  if (hidden) return null;
  return (
    <div className={cn("z-50 rounded bg-slate-900 px-2 py-1 text-xs text-white", className)} {...props}>
      {children}
    </div>
  );
}
