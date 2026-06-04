import { notFound } from "next/navigation";

import { WorkspaceSettingsDetails } from "@/features/workspace-settings/components/WorkspaceSettingsDetails";
import { WorkspaceSettingsHeader } from "@/features/workspace-settings/components/WorkspaceSettingsHeader";
import { WorkspaceSettingsNavigation } from "@/features/workspace-settings/components/WorkspaceSettingsNavigation";
import { WorkspaceSettingsSectionContent } from "@/features/workspace-settings/components/WorkspaceSettingsSectionContent";

type WorkspaceSectionPageProps = Readonly<{
  params: Promise<{
    section: string;
  }>;
}>;

const workspaceSections: Record<string, { title: string; description: string; points: string[] }> = {
  presets: {
    title: "Generation presets",
    description: "Prompt, seed, palette, and style lock controls.",
    points: ["Prompt presets", "Seed locking", "Palette governance"],
  },
  exports: {
    title: "Export targets",
    description: "Godot-compatible output settings and handoff behavior.",
    points: ["Target format mapping", "Filename conventions", "Export location rules"],
  },
  integrations: {
    title: "Integrations",
    description: "External tool connections and sync health.",
    points: ["Supabase storage", "Godot handoff", "Aseprite sync"],
  },
};

export default async function WorkspaceSettingsSectionPage({ params }: WorkspaceSectionPageProps) {
  const resolvedParams = await params;
  const section = workspaceSections[resolvedParams.section];

  if (!section) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-[1560px] px-3 py-5 md:px-4 lg:px-6">
      <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
        <WorkspaceSettingsNavigation />

        <div className="space-y-5">
          <WorkspaceSettingsHeader />
          <WorkspaceSettingsSectionContent title={section.title} description={section.description} points={section.points} />
          <WorkspaceSettingsDetails />
        </div>
      </div>
    </main>
  );
}
