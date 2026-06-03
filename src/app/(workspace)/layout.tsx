import type { ReactNode } from "react";

import { WorkspaceShell } from "@/features/workspace/components/WorkspaceShell";

type WorkspaceLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  return <WorkspaceShell>{children}</WorkspaceShell>;
}
