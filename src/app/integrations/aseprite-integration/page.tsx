import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
import { WorkspaceStateRow } from "@/features/workspace/components/WorkspaceStateRow";
import { WorkspaceStateSection } from "@/features/workspace/components/WorkspaceStateSection";
import { asepriteChecks } from "@/features/workspace/data/mockData";

export default function AsepriteIntegrationPage() {
  return (
    <WorkspacePageFrame
      eyebrow="Integration readiness"
      title="Aseprite handoff readiness"
      description="Planned slice naming, palette parity, and plugin sync state for pixel-art handoff."
      status="No API calls"
    >
      <WorkspaceStateSection title="Aseprite state" description="The current readiness of the pixel-art handoff surface.">
        {asepriteChecks.map((check) => (
          <WorkspaceStateRow
            key={check.label}
            label={check.label}
            value={check.state}
            detail={check.detail}
            tone={check.tone === "positive" ? "positive" : check.tone === "warning" ? "warning" : "neutral"}
            tag={check.state}
          />
        ))}
      </WorkspaceStateSection>
    </WorkspacePageFrame>
  );
}