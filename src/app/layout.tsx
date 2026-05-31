import type { Metadata } from "next";
import type { ReactNode } from "react";
import { WorkspaceHeader } from "@/features/workspace/components/WorkspaceHeader";
import { WorkspaceSidebar } from "@/features/workspace/components/WorkspaceSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
  title: "ForgetKit",
  description: "Game development preparation workspace",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <div className="h-dvh overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#f4f6f8_32%,#eef2f6_100%)] text-slate-900 antialiased font-sans">
            <SidebarProvider defaultOpen className="min-h-dvh w-full">
              <WorkspaceSidebar />
              <SidebarInset className="flex min-h-0 flex-1 flex-col overflow-hidden">
                <WorkspaceHeader />
                {children}
              </SidebarInset>
            </SidebarProvider>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
