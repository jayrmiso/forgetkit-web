import * as React from "react";
import { cn } from "@/lib/utils";

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function DropdownMenuTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) {
  if (!asChild) return <button type="button">{children}</button>;
  return <>{children}</>;
}

export function DropdownMenuContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { align?: "start" | "center" | "end" }) {
  return (
    <div className={cn("mt-1 rounded-md border bg-white p-1 shadow", className)} {...props}>
      {children}
    </div>
  );
}

export function DropdownMenuItem({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center gap-2 rounded px-2 py-1.5 text-sm", className)} {...props}>
      {children}
    </div>
  );
}
