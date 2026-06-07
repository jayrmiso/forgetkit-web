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

function formatValue(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "Not set";
}

function formatEngineTarget(value: WorkspaceRecord["engineTarget"]) {
  return value === "godot" ? "Godot" : "Not set";
}

function formatVisibility(value?: WorkspaceRecord["visibility"]) {
  const labels = {
    private: "Private",
    unlisted: "Unlisted",
    public: "Public",
  } satisfies Record<NonNullable<WorkspaceRecord["visibility"]>, string>;

  return labels[value ?? "private"];
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

type WorkspaceSettingsDetailsProps = Readonly<{
  workspace: WorkspaceRecord;
}>;

export function WorkspaceSettingsDetails({ workspace }: WorkspaceSettingsDetailsProps) {
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
        eyebrow="Publishing"
        title="Visibility"
        description="This is the only publishing setting currently wired into workspace creation. Public profile URLs, comments, and asset publishing stay in the future plan until the backend supports them."
      >
        <dl className="divide-y divide-app/70">
          <FieldRow label="Visibility" value={formatVisibility(workspace.visibility)} />
        </dl>
      </SettingsSection>
    </div>
  );
}
