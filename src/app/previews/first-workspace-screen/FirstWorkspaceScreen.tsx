"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { WorkspaceContent } from "./_components/WorkspaceContent";
import { WorkspaceHeader } from "./_components/WorkspaceHeader";
import { WorkspaceSidebar } from "./_components/WorkspaceSidebar";

export function FirstWorkspaceScreen() {
  return (
    <div className="first-workspace-screen min-h-screen bg-slate-50 text-slate-900 antialiased font-sans">
      <div className="mx-auto max-w-7xl border border-slate-200 bg-white shadow-[0_24px_50px_-32px_rgba(30,64,175,0.3)]">
        <SidebarProvider defaultOpen>
          <WorkspaceSidebar />
          <SidebarInset className="min-h-screen bg-slate-50">
            <WorkspaceHeader />
            <WorkspaceContent />
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
