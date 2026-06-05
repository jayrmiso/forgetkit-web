import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
import { WorkspaceStateRow } from "@/features/workspace/components/WorkspaceStateRow";
import { WorkspaceStateSection } from "@/features/workspace/components/WorkspaceStateSection";
import { consistencyControls } from "@/features/workspace/data/mockData";

export default function ConsistencyControlsPage() {
  return (
    <WorkspacePageFrame
      eyebrow="Consistency controls"
      title="Preset, seed, palette, and style governance"
      description="A static control surface for keeping generation output aligned across assets, narrative, and review."
      status="Controls locked"
    >
      <WorkspaceStateSection title="Governance state" description="The current locks that keep output consistent across the workspace.">
        {consistencyControls.map((control) => (
          <WorkspaceStateRow
            key={control.label}
            label={control.label}
            value={control.value}
            detail={control.detail}
            tone={control.state === "Locked" ? "positive" : control.state === "Watch" ? "warning" : "primary"}
            tag={control.state}
          />
        ))}
      </WorkspaceStateSection>

      <WorkspaceStateSection title="Operational summary" description="What the control surface is actively protecting.">
        <WorkspaceStateRow label="Prompt preset" value="Locked and reusable" detail="The base prompt preset is fixed so generation remains comparable." tone="positive" tag="Stable" />
        <WorkspaceStateRow label="Seed and palette" value="Enabled" detail="These constraints keep concepts, icons, and spritesheets aligned." tone="positive" tag="Locked" />
      </WorkspaceStateSection>
    </WorkspacePageFrame>
  );
}