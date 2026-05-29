import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "ghost" | "secondary";
type Size = "default" | "sm" | "lg" | "icon" | "icon-sm";

function variantClasses(variant: Variant = "default") {
  if (variant === "outline") return "border border-slate-200 bg-white hover:bg-slate-50";
  if (variant === "ghost") return "hover:bg-slate-100";
  if (variant === "secondary") return "bg-slate-100 text-slate-900 hover:bg-slate-200";
  return "bg-slate-900 text-white hover:bg-slate-800";
}

function sizeClasses(size: Size = "default") {
  if (size === "sm") return "h-8 px-3";
  if (size === "lg") return "h-10 px-6";
  if (size === "icon") return "h-9 w-9";
  if (size === "icon-sm") return "h-8 w-8";
  return "h-9 px-4 py-2";
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
        variantClasses(variant),
        sizeClasses(size),
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
