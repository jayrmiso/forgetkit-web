import { Bell, ChevronsUpDown, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function WorkspaceHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 shadow-sm ring-1 ring-slate-950/5 backdrop-blur">
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 md:px-6">
        <SidebarTrigger className="h-9 w-9 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900" />

        <div className="min-w-[10rem]">
          <p className="text-sm font-semibold text-slate-900">Workspace</p>
          <p className="text-xs text-slate-500">Sprint 08 · v0.1</p>
        </div>

        <div className="relative min-w-[12rem] flex-1 sm:max-w-sm">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            className="h-9 rounded-lg border-slate-200/80 bg-white pl-9 text-slate-800 shadow-sm ring-1 ring-slate-950/5 placeholder:text-slate-400"
            placeholder="Search assets, narratives, versions"
          />
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 shadow-sm ring-1 ring-slate-950/5">
          <span className="font-medium text-slate-700">Connected:</span> Supabase
          <span className="mx-1.5 text-slate-300">|</span>
          <span className="font-medium text-slate-700">Readiness:</span> Synced
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            className="h-9 rounded-lg border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
          >
            New Generation Job
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Open notifications"
            className="h-9 w-9 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            <Bell className="size-4" />
          </Button>
          <Separator orientation="vertical" className="hidden h-8 bg-slate-200 sm:block" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 rounded-lg gap-2 text-slate-700 hover:bg-slate-100">
                <Avatar className="size-7">
                  <AvatarFallback className="bg-blue-100 text-xs text-blue-800">KR</AvatarFallback>
                </Avatar>
                <span>Kai Rivera</span>
                <ChevronsUpDown className="size-3.5 text-slate-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 border-slate-200 bg-white">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Workspace settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
