export function workspacePath(workspaceId: string, path: string) {
  if (path === "/" || path === "") {
    return `/w/${workspaceId}`;
  }

  return `/w/${workspaceId}${path.startsWith("/") ? path : `/${path}`}`;
}

