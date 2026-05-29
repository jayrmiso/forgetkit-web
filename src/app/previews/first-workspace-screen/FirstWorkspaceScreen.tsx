"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { WorkspaceContent } from "./_components/WorkspaceContent";
import { WorkspaceHeader } from "./_components/WorkspaceHeader";
import { WorkspaceSidebar } from "./_components/WorkspaceSidebar";

export function FirstWorkspaceScreen() {
  return (
    <div className="first-workspace-screen h-dvh overflow-hidden bg-[linear-gradient(180deg,#eef3f9_0%,#f7f9fc_28%,#f5f7fb_100%)] text-slate-900 antialiased font-sans">
      <SidebarProvider defaultOpen className="min-h-dvh w-full">
        <WorkspaceSidebar />
        <SidebarInset className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <WorkspaceHeader />
          <WorkspaceContent />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
