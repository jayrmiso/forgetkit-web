import type { ReactNode } from "react";

import type { AuthSession } from "@/features/auth/authSession";

import { WorkspaceDock } from "./WorkspaceDock";
import { WorkspaceHeader } from "./WorkspaceHeader";

type WorkspaceShellProps = {
  children: ReactNode;
  session: AuthSession;
};

export function WorkspaceShell({ children, session }: WorkspaceShellProps) {
  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-app-bg text-app">
      <WorkspaceHeader session={session} />
      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto overflow-x-hidden pb-48">{children}</div>
      </div>
      <footer
        className="pointer-events-none absolute inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-3 pt-12"
        style={{
          background:
            "linear-gradient(to top, color-mix(in srgb, var(--bg) 98%, transparent) 0%, color-mix(in srgb, var(--bg) 90%, transparent) 28%, color-mix(in srgb, var(--bg) 74%, transparent) 68%, transparent 100%)",
          boxShadow: "0 -24px 60px color-mix(in srgb, var(--bg) 18%, transparent)",
        }}
      >
        <WorkspaceDock />
      </footer>
    </div>
  );
}
