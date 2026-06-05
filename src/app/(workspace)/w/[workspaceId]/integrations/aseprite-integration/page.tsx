import { Chip } from "@heroui/react";

import { WorkspaceCard } from "@/features/workspace/components/WorkspaceCard";
import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
import { asepriteChecks } from "@/features/workspace/data/mockData";

const toneClass = {
  neutral: "border-app bg-app-raised text-app",
  positive: "border-app bg-app-success/20 text-app-success",
  warning: "border-app bg-app-warning/20 text-app-warning",
  danger: "border-app bg-app-danger/20 text-app-danger",
  primary: "border-app bg-app-primary/15 text-app-primary",
};

export default function AsepriteIntegrationPage() {
  return (
    <WorkspacePageFrame
      eyebrow="Integration readiness"
      title="Aseprite handoff preparation"
      description="Plan slice naming, palette parity, and plugin sync readiness for pixel-art production."
      status="Sync pending"
    >
      <section className="grid gap-4 lg:grid-cols-3">
        {asepriteChecks.map((check) => (
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
