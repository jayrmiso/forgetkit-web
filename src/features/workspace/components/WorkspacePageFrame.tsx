import type { ReactNode } from "react";

import { Chip } from "@heroui/react";

import { cn } from "@/lib/utils";

type WorkspacePageFrameProps = {
  eyebrow: string;
  title: string;
  description: string;
  status?: string;
  children: ReactNode;
  className?: string;
};

export function WorkspacePageFrame({ eyebrow, title, description, status, children, className }: WorkspacePageFrameProps) {
  return (
    <main className={cn("mx-auto flex w-full max-w-[1480px] flex-col gap-5 px-4 py-5 pb-36 md:px-6 lg:px-8", className)}>
      <section className="rounded-3xl border border-app bg-app-surface p-5 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-app-primary">{eyebrow}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-app md:text-4xl">{title}</h1>
            <p className="mt-3 text-sm leading-6 text-app-muted md:text-base">{description}</p>
          </div>
          {status ? (
            <Chip className="w-fit border border-app bg-app-raised text-app" size="sm" variant="soft">
              {status}
            </Chip>
          ) : null}
        </div>
      </section>
      {children}
    </main>
  );
}
