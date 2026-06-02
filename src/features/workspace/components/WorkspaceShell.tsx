import type { ReactNode } from "react";

import { WorkspaceDock } from "./WorkspaceDock";
import { WorkspaceHeader } from "./WorkspaceHeader";

type WorkspaceShellProps = {
  children: ReactNode;
};

export function WorkspaceShell({ children }: WorkspaceShellProps) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-app-bg text-app">
      <WorkspaceHeader />
      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-hidden pb-48">{children}</div>
      </div>
      <footer
        className="pointer-events-none absolute inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-3 pt-10"
        style={{
          background:
            "linear-gradient(to top, color-mix(in srgb, var(--bg) 96%, transparent) 0%, color-mix(in srgb, var(--bg) 82%, transparent) 55%, transparent 100%)",
        }}
      >
        <WorkspaceDock />
      </footer>
    </div>
  );
}
