import * as React from "react";
import { cn } from "@/lib/utils";

export function Avatar({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("inline-flex items-center justify-center rounded-full overflow-hidden", className)} {...props} />;
}

export function AvatarFallback({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("inline-flex size-full items-center justify-center", className)} {...props} />;
}
