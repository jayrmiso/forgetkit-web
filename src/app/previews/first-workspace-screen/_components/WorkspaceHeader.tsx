import { Bell, ChevronsUpDown, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
    <header className="sticky top-0 z-20 border-b border-zinc-800/70 bg-zinc-950/95 backdrop-blur">
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 md:px-6">
        <SidebarTrigger className="text-zinc-300 hover:bg-zinc-800 hover:text-white" />
        <div className="relative min-w-[12rem] flex-1 sm:max-w-sm">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
          <Input
            className="border-zinc-700 bg-zinc-800/80 pl-9 text-zinc-100 placeholder:text-zinc-500 shadow-[0_8px_20px_-16px_rgba(0,0,0,0.95)]"
            placeholder="Search concepts, assets, notes"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Badge className="bg-zinc-200 text-black" variant="secondary">
            Sprint 05
          </Badge>
          <Button variant="outline" className="border-zinc-700 bg-zinc-800/70 text-zinc-100 shadow-[0_8px_20px_-16px_rgba(0,0,0,0.9)]">
            Quick Capture
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Open notifications"
            className="text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <Bell className="size-4" />
          </Button>
          <Separator orientation="vertical" className="hidden h-8 bg-zinc-700 sm:block" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 text-zinc-200 shadow-[0_8px_18px_-16px_rgba(0,0,0,0.9)] hover:bg-zinc-800">
                <Avatar className="size-7">
                  <AvatarFallback className="bg-zinc-700 text-xs">KR</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">Kai Rivera</span>
                <ChevronsUpDown className="size-3.5 text-zinc-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
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
