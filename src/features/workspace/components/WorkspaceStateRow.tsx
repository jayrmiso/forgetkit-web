import { Chip } from "@heroui/react";

import { cn } from "@/lib/utils";

const toneClass = {
  neutral: "border-app bg-app-raised text-app",
  positive: "border-app bg-app-success/20 text-app-success",
  warning: "border-app bg-app-warning/20 text-app-warning",
  danger: "border-app bg-app-danger/20 text-app-danger",
  primary: "border-app bg-app-primary/15 text-app-primary",
} as const;

type WorkspaceStateRowProps = Readonly<{
  label: string;
  value: string;
  detail?: string;
  tone?: keyof typeof toneClass;
  tag?: string;
  className?: string;
}>;

export function WorkspaceStateRow({ label, value, detail, tone = "neutral", tag, className }: WorkspaceStateRowProps) {
  return (
    <div className={cn("flex flex-col gap-2 border-b border-app/60 py-3 last:border-b-0 sm:flex-row sm:items-start sm:justify-between", className)}>
      <div className="min-w-0">
        <p className="text-sm font-medium text-app">{label}</p>
        {detail ? <p className="mt-1 text-xs leading-5 text-app-muted">{detail}</p> : null}
      </div>
      <div className="flex items-center gap-2 text-sm text-app">
        <span className="font-medium">{value}</span>
        {tag ? (
          <Chip className={toneClass[tone]} size="sm" variant="soft">
            {tag}
          </Chip>
        ) : null}
      </div>
    </div>
  );
}