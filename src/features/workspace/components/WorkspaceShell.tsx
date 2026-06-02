import type { ReactNode } from "react";

import { WorkspaceDock } from "./WorkspaceDock";
import { WorkspaceHeader } from "./WorkspaceHeader";

type WorkspaceShellProps = {
  children: ReactNode;
};

export function WorkspaceShell({ children }: WorkspaceShellProps) {
  return (
    <div className="min-h-screen bg-app-bg text-app">
      <WorkspaceHeader />
      <div className="min-h-[calc(100vh-65px)]">{children}</div>
      <WorkspaceDock />
    </div>
  );
}
