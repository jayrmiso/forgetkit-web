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
    <Sidebar className="border-r border-slate-200 bg-white" collapsible="offcanvas">
      <SidebarHeader className="border-b border-slate-200 bg-white px-4 py-4">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Select workspace</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-8 w-full justify-between rounded-md border-slate-300 bg-slate-50 px-2.5 text-xs font-medium text-slate-800 hover:bg-slate-100"
              >
                <span className="truncate">Project Eclipse</span>
                <ChevronDown className="size-3.5 text-slate-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="border-slate-200 bg-white text-slate-800">
              <DropdownMenuItem className="focus:bg-slate-100 focus:text-slate-900">
                <Check className="size-4 text-blue-600" />
                Project Eclipse
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-slate-100 focus:text-slate-900">Luma Shift</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-slate-100 focus:text-slate-900">Atelier Grayline</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white px-2 py-3">
        <SidebarGroup>
          <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Workflow</p>
          <SidebarMenu>
            {sidebarPrimaryItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  isActive={item.isActive}
                  className="text-slate-700 hover:text-slate-900 data-[active=true]:bg-blue-600 data-[active=true]:text-white"
                >
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Resources</p>
          <SidebarMenu>
            {sidebarSecondaryItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton className="text-slate-700 hover:text-slate-900">
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200 bg-white p-3">
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarFallback className="bg-blue-100 text-xs text-blue-800">KR</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs font-medium text-slate-800">Kai Rivera</p>
              <p className="text-[11px] text-slate-500">Creative Director</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-zinc-200 text-black">
            Live
          </Badge>
        </div>
        <button className="mt-2 flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-700 hover:bg-slate-50">
          Launch standup notes
          <ChevronRight className="size-3.5" />
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
