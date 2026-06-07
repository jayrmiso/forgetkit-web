import type { WorkspaceRecord } from "./workspaceApi";

export function resolveWorkspaceBootstrap(
  workspaces: WorkspaceRecord[],
  preferredWorkspaceId?: string | null,
  routeWorkspaceId?: string | null,
): Readonly<{
  currentWorkspace: WorkspaceRecord | null;
  redirectWorkspaceId: string | null;
}> {
  const routeWorkspace = routeWorkspaceId ? workspaces.find((workspace) => workspace.id === routeWorkspaceId) ?? null : null;
  const preferredWorkspace = preferredWorkspaceId ? workspaces.find((workspace) => workspace.id === preferredWorkspaceId) ?? null : null;
  const currentWorkspace = routeWorkspace ?? preferredWorkspace ?? workspaces[0] ?? null;

  return {
    currentWorkspace,
    redirectWorkspaceId: currentWorkspace?.id ?? null,
  };
}
