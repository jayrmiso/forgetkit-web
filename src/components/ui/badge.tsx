import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & { variant?: "default" | "secondary" | "outline" }) {
  return (
    <span
      className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium", className)}
      {...props}
    />
  );
}
