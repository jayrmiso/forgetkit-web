import { Chip } from "@heroui/react";

import type { WorkspaceRecord } from "@/features/workspace/api/workspaceApi";

type WorkspaceSettingsHeaderProps = Readonly<{
  workspace: WorkspaceRecord;
}>;

export function WorkspaceSettingsHeader({ workspace }: WorkspaceSettingsHeaderProps) {
  return (
    <section className="border-b border-app pb-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-app-muted">Workspace settings</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-[-0.05em] text-app">Workspace setup</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-app-muted">
            Define the shared project state that assets, narrative, generation presets, review, storage, and Godot exports will use.
          </p>
        </div>
        <Chip className="w-fit border border-app bg-app-primary/15 text-app-primary" size="sm" variant="soft">
          {workspace.status} / {workspace.name}
        </Chip>
      </div>
    </section>
  );
}
