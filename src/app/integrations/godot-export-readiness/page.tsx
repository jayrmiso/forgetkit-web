import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
import { WorkspaceStateRow } from "@/features/workspace/components/WorkspaceStateRow";
import { WorkspaceStateSection } from "@/features/workspace/components/WorkspaceStateSection";
import { godotExportChecks } from "@/features/workspace/data/mockData";

export default function GodotExportReadinessPage() {
  return (
    <WorkspacePageFrame
      eyebrow="Integration readiness"
      title="Godot export readiness"
      description="Frontend planning surface for export format mapping, filenames, and Godot handoff metadata."
      status="No API calls"
    >
      <WorkspaceStateSection title="Export state" description="Where the Godot handoff is currently ready, pending, or blocked.">
        {godotExportChecks.map((check) => (
          <WorkspaceStateRow
            key={check.label}
            label={check.label}
            value={check.state}
            detail={check.detail}
            tone={check.tone === "positive" ? "positive" : check.tone === "warning" ? "warning" : "primary"}
            tag={check.state}
          />
        ))}
      </WorkspaceStateSection>
    </WorkspacePageFrame>
  );
}