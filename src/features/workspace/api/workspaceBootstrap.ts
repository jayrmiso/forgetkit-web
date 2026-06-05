import type { WorkspaceRecord } from "./workspaceApi";

export function resolveWorkspaceBootstrap(
  workspaces: WorkspaceRecord[],
  preferredWorkspaceId?: string | null,
): Readonly<{
  currentWorkspace: WorkspaceRecord | null;
  redirectWorkspaceId: string | null;
}> {
  const preferredWorkspace = preferredWorkspaceId ? workspaces.find((workspace) => workspace.id === preferredWorkspaceId) ?? null : null;
  const currentWorkspace = preferredWorkspace ?? workspaces[0] ?? null;

  return {
    currentWorkspace,
    redirectWorkspaceId: currentWorkspace?.id ?? null,
  };
}

