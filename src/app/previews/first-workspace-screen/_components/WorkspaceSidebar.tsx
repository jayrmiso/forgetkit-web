import { Check, ChevronDown, ChevronRight } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarPrimaryItems, sidebarSecondaryItems } from "./mockData";

export function WorkspaceSidebar() {
  return (
    <Sidebar className="border-r border-zinc-800/80" collapsible="offcanvas">
      <SidebarHeader className="border-b border-zinc-800/70 bg-zinc-950 px-4 py-4">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold tracking-wide text-zinc-500 uppercase">Select workspace</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-8 w-full justify-between rounded-md border-zinc-700/80 bg-zinc-900 px-2.5 text-xs font-medium text-zinc-100 shadow-[0_8px_20px_-16px_rgba(0,0,0,0.9)] hover:bg-zinc-800 hover:text-zinc-100"
              >
                <span className="truncate">Project Eclipse</span>
                <ChevronDown className="size-3.5 text-zinc-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="border-zinc-700 !bg-zinc-900 text-zinc-100"
            >
              <DropdownMenuItem className="focus:bg-zinc-800 focus:text-zinc-100">
                <Check className="size-4 text-zinc-300" />
                Project Eclipse
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-zinc-800 focus:text-zinc-100">
                Luma Shift
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-zinc-800 focus:text-zinc-100">
                Atelier Grayline
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-zinc-950/95 px-2 py-3">
        <SidebarGroup>
          <p className="px-2 pb-2 text-[11px] font-semibold tracking-wide text-zinc-500 uppercase">Workflow</p>
          <SidebarMenu>
            {sidebarPrimaryItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  isActive={item.isActive}
                  className="text-zinc-300 data-[active=true]:bg-zinc-800 data-[active=true]:text-white"
                >
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <p className="px-2 pb-2 text-[11px] font-semibold tracking-wide text-zinc-500 uppercase">Resources</p>
          <SidebarMenu>
            {sidebarSecondaryItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton className="text-zinc-300 hover:text-white">
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-zinc-800/70 bg-zinc-950/90 p-3">
        <div className="flex items-center justify-between rounded-xl bg-zinc-800/80 p-3 shadow-[0_10px_24px_-20px_rgba(0,0,0,0.95)]">
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarFallback className="bg-zinc-700 text-xs text-zinc-100">KR</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs font-medium text-zinc-100">Kai Rivera</p>
              <p className="text-[11px] text-zinc-400">Creative Director</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-zinc-200 text-black">
            Live
          </Badge>
        </div>
        <button className="mt-2 flex w-full items-center justify-between rounded-lg border border-zinc-700/80 px-3 py-2 text-xs text-zinc-300 shadow-[0_8px_18px_-16px_rgba(0,0,0,0.9)] hover:bg-zinc-800/80">
          Launch standup notes
          <ChevronRight className="size-3.5" />
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
