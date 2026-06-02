import type { ReactNode } from "react";

import { WorkspaceDock } from "./WorkspaceDock";
import { WorkspaceHeader } from "./WorkspaceHeader";

type WorkspaceShellProps = {
  children: ReactNode;
};

export function WorkspaceShell({ children }: WorkspaceShellProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-app-bg text-app">
      <WorkspaceHeader />
      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-hidden">{children}</div>
      </div>
      <footer className="sticky bottom-0 z-50 flex shrink-0 justify-center px-3 pb-3 pt-2">
        <WorkspaceDock />
      </footer>
    </div>
  );
}
