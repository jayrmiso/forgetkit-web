import { Chip } from "@heroui/react";

import type { WorkspaceRecord } from "@/features/workspace/api/workspaceApi";

type WorkspaceSettingsHeaderProps = Readonly<{
  workspace: WorkspaceRecord;
}>;

export function WorkspaceSettingsHeader({ workspace }: WorkspaceSettingsHeaderProps) {
  return (
    <section className="rounded-2xl border border-app bg-app-surface p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-app-muted">Workspace settings</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-app">Workspace configuration</h1>
          <p className="mt-1 text-sm text-app-muted">
            Review the active workspace and reserve space for future workspace-state controls.
          </p>
        </div>
        <Chip className="w-fit border border-app bg-app-primary/15 text-app-primary" size="sm" variant="soft">
          {workspace.name}
        </Chip>
      </div>
    </section>
  );
}
