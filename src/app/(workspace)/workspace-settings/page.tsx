import { WorkspaceSettingsDetails } from "@/features/workspace-settings/components/WorkspaceSettingsDetails";
import { WorkspaceSettingsHeader } from "@/features/workspace-settings/components/WorkspaceSettingsHeader";
import { WorkspaceSettingsNavigation } from "@/features/workspace-settings/components/WorkspaceSettingsNavigation";

export default function WorkspaceSettingsPage() {
  return (
    <main className="mx-auto w-full max-w-[1560px] px-3 py-5 md:px-4 lg:px-6">
      <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
        <WorkspaceSettingsNavigation />

        <div className="space-y-5">
          <WorkspaceSettingsHeader />
          <WorkspaceSettingsDetails />
        </div>
      </div>
    </main>
  );
}
