import { Chip } from "@heroui/react";
import type { ReactNode } from "react";

import type { WorkspaceRecord } from "@/features/workspace/api/workspaceApi";

type FieldRowProps = Readonly<{
  label: string;
  value?: string | null;
  detail?: string;
}>;

type SettingsSectionProps = Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}>;

type ChecklistItem = Readonly<{
  label: string;
  complete: boolean;
  detail: string;
}>;

function formatValue(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "Not set";
}

function formatEngineTarget(value: WorkspaceRecord["engineTarget"]) {
  return value === "godot" ? "Godot" : "Not set";
}

function formatCameraView(value?: WorkspaceRecord["cameraView"] | null) {
  const labels = {
    unknown: "Not set",
    top_down: "Top-down",
    side_scroller: "Side-scroller",
    isometric: "Isometric",
    first_person: "First-person",
    third_person: "Third-person",
  } satisfies Record<NonNullable<WorkspaceRecord["cameraView"]>, string>;

  return value ? labels[value] : "Not set";
}

function FieldRow({ label, value, detail }: FieldRowProps) {
  const displayValue = formatValue(value);
  const isMissing = displayValue === "Not set";

  return (
    <div className="grid gap-2 border-b border-app/70 py-4 last:border-b-0 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6">
      <dt className="text-sm font-medium text-app-muted">{label}</dt>
      <dd>
        <p className={isMissing ? "text-sm text-app-muted" : "text-sm font-medium text-app"}>{displayValue}</p>
        {detail ? <p className="mt-1 text-xs leading-5 text-app-muted">{detail}</p> : null}
      </dd>
    </div>
  );
}

function SettingsSection({ eyebrow, title, description, children }: SettingsSectionProps) {
  return (
    <section className="border-b border-app pb-7 last:border-b-0">
      <div className="mb-4 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-app-primary">{eyebrow}</p>
        <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-app">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-app-muted">{description}</p>
      </div>
      {children}
    </section>
  );
}

function SetupChecklist({ items }: Readonly<{ items: ChecklistItem[] }>) {
  const completeCount = items.filter((item) => item.complete).length;

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 border-b border-app pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-app">Setup completeness</p>
          <p className="mt-1 text-xs leading-5 text-app-muted">
            Complete these fields before assets, narrative, generation presets, and exports depend on workspace state.
          </p>
        </div>
        <Chip className="w-fit border border-app bg-app-primary/15 text-app-primary" size="sm" variant="soft">
          {completeCount} / {items.length} ready
        </Chip>
      </div>

      <div className="divide-y divide-app/70">
        {items.map((item) => (
          <div key={item.label} className="flex gap-3 py-3">
            <span
              className={
                item.complete
                  ? "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-app-success text-[11px] font-bold text-white"
                  : "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-app text-[11px] font-bold text-app-muted"
              }
            >
              {item.complete ? "OK" : ""}
            </span>
            <div>
              <p className="text-sm font-medium text-app">{item.label}</p>
              <p className="mt-1 text-xs leading-5 text-app-muted">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type WorkspaceSettingsDetailsProps = Readonly<{
  workspace: WorkspaceRecord;
}>;

export function WorkspaceSettingsDetails({ workspace }: WorkspaceSettingsDetailsProps) {
  const setupItems: ChecklistItem[] = [
    {
      label: "Workspace identity",
      complete: Boolean(workspace.name && workspace.engineTarget !== "unknown"),
      detail: "Name and engine target are needed before routes and exports can be interpreted.",
    },
    {
      label: "Game direction",
      complete: Boolean(workspace.gameTitle || workspace.genre || workspace.artDirection),
      detail: "Game title, genre, and art direction anchor asset and narrative decisions.",
    },
    {
      label: "Production focus",
      complete: Boolean(workspace.currentFocus || workspace.nextMilestone || workspace.activeMilestone),
      detail: "Current focus and milestones make the dashboard useful for daily planning.",
    },
    {
      label: "Storage and export paths",
      complete: Boolean(workspace.storageRootPath || workspace.godotProjectPath || workspace.namingConvention),
      detail: "Paths and naming rules are needed before Supabase Storage and Godot export workflows become real.",
    },
  ];

  return (
    <div className="space-y-8">
      <SettingsSection
        eyebrow="Overview"
        title="Workspace identity"
        description="The root state for this scoped workspace. Every future asset, document, review item, and export should belong to this context."
      >
        <dl className="divide-y divide-app/70">
          <FieldRow label="Workspace name" value={workspace.name} />
          <FieldRow label="Status" value={workspace.status} />
          <FieldRow label="Engine target" value={formatEngineTarget(workspace.engineTarget)} />
          <FieldRow label="Active milestone" value={workspace.activeMilestone} />
          <FieldRow label="Role" value={workspace.role} />
        </dl>
      </SettingsSection>

      <SettingsSection
        eyebrow="Game setup"
        title="Project direction"
        description="These fields define the creative constraints that asset generation, narrative writing, tagging, and review should respect."
      >
        <dl className="divide-y divide-app/70">
          <FieldRow label="Game title" value={workspace.gameTitle} />
          <FieldRow label="Genre" value={workspace.genre} />
          <FieldRow label="Camera view" value={formatCameraView(workspace.cameraView)} />
          <FieldRow label="Art direction" value={workspace.artDirection} />
          <FieldRow label="Target resolution" value={workspace.targetResolution} />
          <FieldRow label="Default biome" value={workspace.defaultBiome} />
          <FieldRow label="Default style" value={workspace.defaultStyle} />
        </dl>
      </SettingsSection>

      <SettingsSection
        eyebrow="Planning"
        title="Daily workspace state"
        description="The dashboard should eventually read from this section instead of static placeholder cards."
      >
        <dl className="divide-y divide-app/70">
          <FieldRow label="Current focus" value={workspace.currentFocus} />
          <FieldRow label="Next milestone" value={workspace.nextMilestone} />
          <FieldRow label="Blockers" value={workspace.blockers} />
        </dl>
      </SettingsSection>

      <SettingsSection
        eyebrow="Storage"
        title="Export and storage assumptions"
        description="These values prepare the workspace for Supabase Storage organization and Godot-compatible output later."
      >
        <dl className="divide-y divide-app/70">
          <FieldRow label="Storage root path" value={workspace.storageRootPath} detail="Expected root for future workspace assets and narrative exports." />
          <FieldRow label="Godot project path" value={workspace.godotProjectPath} detail="Local or project-relative target for Godot export readiness." />
          <FieldRow label="Naming convention" value={workspace.namingConvention} detail="Reserved for Godot-friendly asset and document names." />
        </dl>
      </SettingsSection>

      <SettingsSection
        eyebrow="Readiness"
        title="Setup checklist"
        description="This is intentionally read-only until the backend exposes a workspace settings update endpoint."
      >
        <SetupChecklist items={setupItems} />
      </SettingsSection>
    </div>
  );
}
