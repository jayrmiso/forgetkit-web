export const ACTIVE_WORKSPACE_COOKIE = "forgetkit-active-workspace-id";

const ACTIVE_WORKSPACE_MAX_AGE = 60 * 60 * 24 * 30;

export function persistActiveWorkspaceId(workspaceId: string) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${ACTIVE_WORKSPACE_COOKIE}=${encodeURIComponent(workspaceId)}; path=/; max-age=${ACTIVE_WORKSPACE_MAX_AGE}; samesite=lax`;
}

export function clearActiveWorkspaceId() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${ACTIVE_WORKSPACE_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

