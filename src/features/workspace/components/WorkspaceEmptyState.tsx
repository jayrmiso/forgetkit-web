import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type WorkspaceEmptyStateProps = Readonly<{
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}>;

export function WorkspaceEmptyState({ title, description, action, className }: WorkspaceEmptyStateProps) {
  return (
    <div className={cn("rounded-2xl border border-dashed border-app/70 bg-app-raised/30 px-4 py-5", className)}>
      <p className="text-sm font-medium text-app">{title}</p>
      <p className="mt-2 text-sm leading-6 text-app-muted">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}