"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { WorkspaceContent } from "./_components/WorkspaceContent";
import { WorkspaceHeader } from "./_components/WorkspaceHeader";
import { WorkspaceSidebar } from "./_components/WorkspaceSidebar";

export function FirstWorkspaceScreen() {
  return (
    <div className="first-workspace-screen min-h-screen bg-black text-zinc-100 antialiased font-sans">
      <div className="mx-auto max-w-7xl rounded-3xl border border-zinc-800/90 bg-zinc-950 shadow-[0_20px_55px_-28px_rgba(0,0,0,0.7)]">
        <SidebarProvider defaultOpen>
          <WorkspaceSidebar />
          <SidebarInset className="min-h-screen bg-transparent">
            <WorkspaceHeader />
            <WorkspaceContent />
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
