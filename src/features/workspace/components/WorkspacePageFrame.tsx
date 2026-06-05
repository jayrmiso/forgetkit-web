import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { WorkspaceStateBanner } from "./WorkspaceStateBanner";

type WorkspacePageFrameProps = {
  eyebrow: string;
  title: string;
  description: string;
  status?: string;
  children: ReactNode;
  className?: string;
};

export function WorkspacePageFrame({ eyebrow, title, description, status, children, className }: WorkspacePageFrameProps) {
  return (
    <main className={cn("mx-auto flex w-full max-w-[1480px] flex-1 flex-col gap-5 px-4 py-5 pb-28 md:px-6 lg:px-8", className)}>
      <WorkspaceStateBanner eyebrow={eyebrow} title={title} description={description} status={status} />
      {children}
    </main>
  );
}