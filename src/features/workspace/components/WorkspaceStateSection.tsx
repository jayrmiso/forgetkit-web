import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type WorkspaceStateSectionProps = Readonly<{
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}>;

export function WorkspaceStateSection({ eyebrow, title, description, action, children, className }: WorkspaceStateSectionProps) {
  return (
    <section className={cn("border-t border-app/70 pt-5", className)}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-app-muted">{eyebrow}</p> : null}
          <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-app">{title}</h2>
          {description ? <p className="mt-2 text-sm leading-6 text-app-muted">{description}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}