import { Chip } from "@heroui/react";

import { WorkspaceCard } from "@/features/workspace/components/WorkspaceCard";
import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
import { supabaseStorageChecks } from "@/features/workspace/data/mockData";

const toneClass = {
  neutral: "border-app bg-app-raised text-app",
  positive: "border-app bg-app-success/20 text-app-success",
  warning: "border-app bg-app-warning/20 text-app-warning",
  danger: "border-app bg-app-danger/20 text-app-danger",
  primary: "border-app bg-app-primary/15 text-app-primary",
};

export default function SupabaseStoragePage() {
  return (
    <WorkspacePageFrame
      eyebrow="Integration readiness"
      title="Supabase Storage planning surface"
      description="Frontend-only storage readiness documentation for buckets, metadata, and binary handoff without clients or environment variables."
      status="No API calls"
    >
      <section className="grid gap-4 lg:grid-cols-3">
        {supabaseStorageChecks.map((check) => (
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
