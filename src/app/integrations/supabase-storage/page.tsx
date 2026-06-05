import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
import { WorkspaceStateRow } from "@/features/workspace/components/WorkspaceStateRow";
import { WorkspaceStateSection } from "@/features/workspace/components/WorkspaceStateSection";
import { WorkspaceEmptyState } from "@/features/workspace/components/WorkspaceEmptyState";
import { supabaseStorageChecks } from "@/features/workspace/data/mockData";

export default function SupabaseStoragePage() {
  return (
    <WorkspacePageFrame
      eyebrow="Integration readiness"
      title="Supabase Storage planning surface"
      description="Frontend-only storage readiness documentation for buckets, metadata, and binary handoff without clients or environment variables."
      status="No API calls"
    >
      <WorkspaceStateSection title="Storage state" description="How the storage surface is currently planned and what remains pending.">
        {supabaseStorageChecks.map((check) => (
          <WorkspaceStateRow
            key={check.label}
            label={check.label}
            value={check.state}
            detail={check.detail}
            tone={check.tone === "positive" ? "positive" : check.tone === "warning" ? "warning" : check.tone === "danger" ? "danger" : "primary"}
            tag={check.state}
          />
        ))}
      </WorkspaceStateSection>

      <WorkspaceStateSection title="Binary handoff" description="What is still intentionally out of scope for the frontend-only layer.">
        <WorkspaceEmptyState
          title="No upload client is wired"
          description="This page is documenting the intended storage model only. Actual bucket writes and metadata persistence belong in the backend pass."
        />
      </WorkspaceStateSection>
    </WorkspacePageFrame>
  );
}