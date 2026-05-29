"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { WorkspaceContent } from "./_components/WorkspaceContent";
import { WorkspaceHeader } from "./_components/WorkspaceHeader";
import { WorkspaceSidebar } from "./_components/WorkspaceSidebar";

export function FirstWorkspaceScreen() {
  return (
    <div className="first-workspace-screen min-h-screen bg-slate-50 text-slate-900 antialiased font-sans">
      <div className="mx-auto max-w-7xl border border-slate-200/80 bg-white shadow-md ring-1 ring-slate-950/5">
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
