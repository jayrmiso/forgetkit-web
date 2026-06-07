import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_SESSION_COOKIE, parseAuthSession, SESSION_EXPIRED_LOGIN_PATH } from "@/features/auth/authSession";
import { getWorkspace, WorkspaceApiError } from "@/features/workspace/api/workspaceApi";
import { WorkspaceSettingsDetails } from "@/features/workspace-settings/components/WorkspaceSettingsDetails";
import { WorkspaceSettingsHeader } from "@/features/workspace-settings/components/WorkspaceSettingsHeader";
import { WorkspaceSettingsNavigation } from "@/features/workspace-settings/components/WorkspaceSettingsNavigation";

type WorkspaceSettingsPageProps = Readonly<{
  params: Promise<{
    workspaceId: string;
  }>;
}>;

export default async function WorkspaceSettingsPage({ params }: WorkspaceSettingsPageProps) {
  const resolvedParams = await params;
  const cookieStore = await cookies();
  const session = parseAuthSession(cookieStore.get(AUTH_SESSION_COOKIE)?.value);

  if (!session || !session.accessToken) {
    redirect("/login");
  }

  let workspace;

  try {
    workspace = await getWorkspace(session.accessToken, resolvedParams.workspaceId);
  } catch (error) {
    if (error instanceof WorkspaceApiError && error.status === 401) {
      redirect(SESSION_EXPIRED_LOGIN_PATH);
    }

    throw error;
  }

  return (
    <main className="mx-auto w-full max-w-[1560px] px-3 py-5 md:px-4 lg:px-6">
      <div className="grid gap-7 lg:grid-cols-[240px_minmax(0,1fr)]">
        <WorkspaceSettingsNavigation workspaceId={resolvedParams.workspaceId} />

        <div className="space-y-8">
          <WorkspaceSettingsHeader workspace={workspace} />
          <WorkspaceSettingsDetails workspace={workspace} />
        </div>
      </div>
    </main>
  );
}
