import type { ReactNode } from "react";

import { Card } from "@heroui/react";

import { cn } from "@/lib/utils";

type WorkspaceCardProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function WorkspaceCard({ title, description, action, children, className }: WorkspaceCardProps) {
  return (
    <Card className={cn("rounded-2xl border border-app bg-app-surface shadow-sm", className)}>
      {title || description || action ? (
        <div className="flex items-start justify-between gap-4 px-4 pt-4 pb-0">
          <div className="min-w-0">
            {title ? <h2 className="text-sm font-semibold text-app">{title}</h2> : null}
            {description ? <p className="mt-1 text-xs leading-5 text-app-muted">{description}</p> : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}
      <div className="p-4">{children}</div>
    </Card>
  );
}
