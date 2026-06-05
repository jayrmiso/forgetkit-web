import type { ReactNode } from "react";

import { Chip } from "@heroui/react";

import { cn } from "@/lib/utils";

type WorkspaceStateBannerProps = Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  status?: string;
  metadata?: ReactNode;
  className?: string;
}>;

export function WorkspaceStateBanner({ eyebrow, title, description, status, metadata, className }: WorkspaceStateBannerProps) {
  return (
    <section className={cn("border-b border-app/70 pb-5", className)}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-app-primary">{eyebrow}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-app md:text-4xl">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-app-muted md:text-base">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {metadata ? <div className="text-xs text-app-muted">{metadata}</div> : null}
          {status ? (
            <Chip className="w-fit border border-app bg-app-raised text-app" size="sm" variant="soft">
              {status}
            </Chip>
          ) : null}
        </div>
      </div>
    </section>
  );
}