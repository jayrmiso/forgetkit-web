import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { AUTH_SESSION_COOKIE, parseAuthSession } from "@/features/auth/authSession";
import { getWorkspace } from "@/features/workspace/api/workspaceApi";
import { WorkspaceSettingsDetails } from "@/features/workspace-settings/components/WorkspaceSettingsDetails";
import { WorkspaceSettingsHeader } from "@/features/workspace-settings/components/WorkspaceSettingsHeader";
import { WorkspaceSettingsNavigation } from "@/features/workspace-settings/components/WorkspaceSettingsNavigation";
import { WorkspaceSettingsSectionContent } from "@/features/workspace-settings/components/WorkspaceSettingsSectionContent";

type WorkspaceSectionPageProps = Readonly<{
  params: Promise<{
    workspaceId: string;
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
  const cookieStore = await cookies();
  const session = parseAuthSession(cookieStore.get(AUTH_SESSION_COOKIE)?.value);

  if (!session || !session.accessToken) {
    redirect("/login");
  }

  const section = workspaceSections[resolvedParams.section];

  if (!section) {
    notFound();
  }

  const workspace = await getWorkspace(session.accessToken, resolvedParams.workspaceId);

  return (
    <main className="mx-auto w-full max-w-[1560px] px-3 py-5 md:px-4 lg:px-6">
      <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
        <WorkspaceSettingsNavigation workspaceId={resolvedParams.workspaceId} />

        <div className="space-y-5">
          <WorkspaceSettingsHeader workspace={workspace} />
          <WorkspaceSettingsSectionContent title={section.title} description={section.description} points={section.points} />
          <WorkspaceSettingsDetails workspace={workspace} />
        </div>
      </div>
    </main>
  );
}

