import { Chip } from "@heroui/react";

import { WorkspaceCard } from "@/features/workspace/components/WorkspaceCard";
import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
import { godotExportChecks } from "@/features/workspace/data/mockData";

const toneClass = {
  neutral: "border-app bg-app-raised text-app",
  positive: "border-app bg-app-success/20 text-app-success",
  warning: "border-app bg-app-warning/20 text-app-warning",
  danger: "border-app bg-app-danger/20 text-app-danger",
  primary: "border-app bg-app-primary/15 text-app-primary",
};

export default function GodotExportReadinessPage() {
  return (
    <WorkspacePageFrame
      eyebrow="Integration readiness"
      title="Godot export preparation"
      description="Track texture formats, scene metadata, and export blockers before engine handoff."
      status="Engine handoff plan"
    >
      <section className="grid gap-4 lg:grid-cols-3">
        {godotExportChecks.map((check) => (
          <WorkspaceCard key={check.label} title={check.label} description={check.detail}>
            <Chip className={toneClass[check.tone]} size="sm" variant="soft">
              {check.state}
            </Chip>
          </WorkspaceCard>
        ))}
      </section>
    </WorkspacePageFrame>
  );
}
