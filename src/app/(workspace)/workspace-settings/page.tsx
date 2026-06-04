import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
import { WorkspaceSettingsPanel } from "@/features/workspace-settings/components/WorkspaceSettingsPanel";

export default function WorkspaceSettingsPage() {
  return (
    <WorkspacePageFrame
      eyebrow="Workspace settings"
      title="Workspace configuration"
      description="Review the active workspace and the configuration surface reserved for later workspace-state work."
      status="Workspace ready"
    >
      <WorkspaceSettingsPanel />
    </WorkspacePageFrame>
  );
}
