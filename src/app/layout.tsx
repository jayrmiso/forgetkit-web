import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { WorkspaceHeader } from "@/features/workspace/components/WorkspaceHeader";
import { WorkspaceSidebar } from "@/features/workspace/components/WorkspaceSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ForgetKit",
  description: "Game development preparation workspace",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="h-dvh overflow-hidden bg-[linear-gradient(180deg,#eef3f9_0%,#f7f9fc_28%,#f5f7fb_100%)] text-slate-900 antialiased font-sans">
          <SidebarProvider defaultOpen className="min-h-dvh w-full">
            <WorkspaceSidebar />
            <SidebarInset className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <WorkspaceHeader />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
