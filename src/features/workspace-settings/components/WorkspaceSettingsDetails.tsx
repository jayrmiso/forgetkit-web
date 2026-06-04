import { Chip } from "@heroui/react";

import { activeWorkspace } from "@/features/workspace/data/workspaceOptions";
import { WorkspaceCard } from "@/features/workspace/components/WorkspaceCard";

function SettingRow({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="grid gap-1 border-b border-app/70 py-4 last:border-b-0 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-6">
      <dt className="text-sm font-medium text-app-muted">{label}</dt>
      <dd className="text-sm text-app">{value}</dd>
    </div>
  );
}

export function WorkspaceSettingsDetails() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <WorkspaceCard title="Workspace overview" description="Active workspace and current focus details.">
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

          <dl className="divide-y divide-app/70">
            <SettingRow label="Workspace name" value={activeWorkspace.label} />
            <SettingRow label="Project focus" value="Daily production planning" />
            <SettingRow label="Engine target" value="Godot" />
            <SettingRow label="Export target" value="Godot-compatible content packages" />
          </dl>
        </div>
      </WorkspaceCard>

      <WorkspaceCard title="Future controls" description="Placeholder sections for the workspace-state work that comes later.">
        <div className="space-y-4 text-sm leading-6 text-app-muted">
          <p>GitHub-style settings layouts keep the eventual state controls organized by section.</p>
          <div className="rounded-2xl border border-dashed border-app px-4 py-4">
            <p className="text-sm font-medium text-app">Planned sections</p>
            <ul className="mt-3 space-y-2">
              <li>Preset lock and seed lock</li>
              <li>Palette governance</li>
              <li>Export path definitions</li>
              <li>Integration health and sync</li>
            </ul>
          </div>
        </div>
      </WorkspaceCard>
    </div>
  );
}
