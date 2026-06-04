import { Chip } from "@heroui/react";

import { activeWorkspace } from "@/features/workspace/data/workspaceOptions";
import { WorkspaceCard } from "@/features/workspace/components/WorkspaceCard";

function SettingRow({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-app/70 py-3 last:border-b-0 last:pb-0 first:pt-0">
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-app-muted">{label}</dt>
      <dd className="max-w-[18rem] text-right text-sm font-medium text-app">{value}</dd>
    </div>
  );
}

export function WorkspaceSettingsPanel() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
      <WorkspaceCard title="Active workspace" description="Current selection used by the header and workspace surface.">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-app bg-app-raised px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-app">{activeWorkspace.label}</p>
              <p className="text-xs text-app-muted">{activeWorkspace.note}</p>
            </div>
            <Chip className="border border-app bg-app-primary/15 text-app-primary" size="sm" variant="soft">
              Active
            </Chip>
          </div>

          <dl className="rounded-2xl border border-app bg-app-surface px-4">
            <SettingRow label="Workspace name" value={activeWorkspace.label} />
            <SettingRow label="Project focus" value="Daily production planning" />
            <SettingRow label="Engine target" value="Godot" />
          </dl>
        </div>
      </WorkspaceCard>

      <WorkspaceCard title="Future settings" description="Reserved for workspace-level configuration once states are real.">
        <div className="space-y-3 text-sm leading-6 text-app-muted">
          <p>Workspace states, export presets, and collaboration controls will live here later.</p>
          <p>For now this page confirms which workspace is active and keeps the settings entry point available.</p>
        </div>
      </WorkspaceCard>
    </div>
  );
}
