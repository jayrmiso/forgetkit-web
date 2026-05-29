import * as React from "react";
import { cn } from "@/lib/utils";

export function Sheet({ open = false, children }: { open?: boolean; onOpenChange?: (open: boolean) => void; children: React.ReactNode }) {
  if (!open) return null;
  return <>{children}</>;
}

export function SheetContent({ className, children, ...props }: React.ComponentProps<"div"> & { side?: "left" | "right" }) {
  return (
    <div className={cn("fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-xl", className)} {...props}>
      {children}
    </div>
  );
}

export function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-2", className)} {...props} />;
}

export function SheetTitle(props: React.ComponentProps<"h2">) {
  return <h2 {...props} />;
}

export function SheetDescription(props: React.ComponentProps<"p">) {
  return <p {...props} />;
}
