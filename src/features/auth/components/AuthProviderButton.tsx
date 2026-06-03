import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type AuthProviderButtonProps = Readonly<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: ReactNode;
    label: string;
  }
>;

export function AuthProviderButton({ className, icon, label, ...props }: AuthProviderButtonProps) {
  return (
    <button
      className={cn(
        "flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-app bg-app-surface px-4 text-sm font-medium text-app shadow-[0_10px_24px_-18px_rgba(15,23,42,0.22)] transition-colors hover:border-[color-mix(in_oklch,var(--primary),white_24%)] hover:bg-app-raised focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklch,var(--primary),white_18%)] focus:ring-offset-2 focus:ring-offset-[var(--surface)]",
        className
      )}
      type="button"
      {...props}
    >
      <span className="flex size-4 items-center justify-center">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
