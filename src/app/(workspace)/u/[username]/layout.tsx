import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_SESSION_COOKIE, parseAuthSession, SESSION_EXPIRED_LOGIN_PATH } from "@/features/auth/authSession";
import { listWorkspaces, WorkspaceApiError } from "@/features/workspace/api/workspaceApi";
import { resolveWorkspaceBootstrap } from "@/features/workspace/api/workspaceBootstrap";
import { WorkspaceShell } from "@/features/workspace/components/WorkspaceShell";
import { ACTIVE_WORKSPACE_COOKIE } from "@/features/workspace/workspaceSession";

type PublicWorkspaceAppLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default async function PublicWorkspaceAppLayout({ children }: PublicWorkspaceAppLayoutProps) {
  const cookieStore = await cookies();
  const session = parseAuthSession(cookieStore.get(AUTH_SESSION_COOKIE)?.value);

  if (!session || !session.accessToken) {
    redirect("/login");
  }

  let workspaces;

  try {
    workspaces = await listWorkspaces(session.accessToken);
  } catch (error) {
    if (error instanceof WorkspaceApiError && error.status === 401) {
      redirect(SESSION_EXPIRED_LOGIN_PATH);
    }

    throw error;
  }

  if (workspaces.length === 0) {
    redirect("/");
  }

  const preferredWorkspaceId = cookieStore.get(ACTIVE_WORKSPACE_COOKIE)?.value ?? null;
  const { currentWorkspace, redirectWorkspaceId } = resolveWorkspaceBootstrap(workspaces, preferredWorkspaceId);

  if (!currentWorkspace || !redirectWorkspaceId) {
    redirect("/");
  }

  return (
    <WorkspaceShell currentWorkspace={currentWorkspace} session={session} workspaces={workspaces} workspaceId={redirectWorkspaceId}>
      {children}
    </WorkspaceShell>
  );
}
