import type { ReactNode } from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_SESSION_COOKIE, parseAuthSession } from "@/features/auth/authSession";
import { listWorkspaces } from "@/features/workspace/api/workspaceApi";
import { resolveWorkspaceBootstrap } from "@/features/workspace/api/workspaceBootstrap";
import { WorkspaceShell } from "@/features/workspace/components/WorkspaceShell";
import { ACTIVE_WORKSPACE_COOKIE } from "@/features/workspace/workspaceSession";

type WorkspaceRouteLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{
    workspaceId: string;
  }>;
}>;

export default async function WorkspaceRouteLayout({ children, params }: WorkspaceRouteLayoutProps) {
  const resolvedParams = await params;
  const cookieStore = await cookies();
  const session = parseAuthSession(cookieStore.get(AUTH_SESSION_COOKIE)?.value);

  if (!session || !session.accessToken) {
    redirect("/login");
  }

  const workspaces = await listWorkspaces(session.accessToken);

  if (workspaces.length === 0) {
    redirect("/");
  }

  const preferredWorkspaceId = cookieStore.get(ACTIVE_WORKSPACE_COOKIE)?.value ?? null;
  const { currentWorkspace, redirectWorkspaceId } = resolveWorkspaceBootstrap(workspaces, preferredWorkspaceId);

  if (!currentWorkspace || !redirectWorkspaceId) {
    redirect("/");
  }

  if (resolvedParams.workspaceId !== redirectWorkspaceId) {
    redirect(`/w/${redirectWorkspaceId}`);
  }

  return (
    <WorkspaceShell currentWorkspace={currentWorkspace} session={session} workspaces={workspaces} workspaceId={resolvedParams.workspaceId}>
      {children}
    </WorkspaceShell>
  );
}

