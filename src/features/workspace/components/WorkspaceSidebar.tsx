import { Check, ChevronDown, ChevronRight, Lock } from "@/lib/icons";

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
import { sidebarPrimaryItems, sidebarSecondaryItems } from "../data/mockData";

function UnavailableOverlay({ label = "Soon" }: { label?: string }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-md bg-white/58 ring-1 ring-inset ring-slate-200/70 backdrop-blur-[1px]"
    >
      <span className="absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 rounded-md border border-slate-300/70 bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-slate-600 shadow-sm">
        <Lock className="size-3" />
        {label}
      </span>
    </span>
  );
}

export function WorkspaceSidebar() {
  return (
    <Sidebar className="border-r border-slate-200/80 bg-white shadow-md ring-1 ring-slate-950/5" collapsible="icon">
      <SidebarHeader className="border-b border-slate-100 bg-white px-2 py-3 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:py-2">
        <div className="flex w-full flex-col space-y-2 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:space-y-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 group-data-[collapsible=icon]:hidden">Active project</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-8 w-full justify-between rounded-md border-slate-200/80 bg-white px-2 text-xs font-medium text-slate-800 shadow-sm ring-1 ring-slate-950/5 hover:bg-slate-50 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:shadow-none group-data-[collapsible=icon]:hover:bg-slate-100"
              >
                <span className="inline-flex items-center gap-2 group-data-[collapsible=icon]:gap-0">
                  <span className="inline-flex size-3.5 items-center justify-center rounded-sm border border-slate-300 text-[10px] font-semibold text-slate-500 group-data-[collapsible=icon]:size-4 group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:text-slate-700">
                    PE
                  </span>
                  <span className="truncate group-data-[collapsible=icon]:hidden">Project Eclipse</span>
                </span>
                <ChevronDown className="size-3.5 text-slate-500 group-data-[collapsible=icon]:hidden" />
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

      <SidebarContent className="bg-white px-2 py-3 group-data-[collapsible=icon]:overflow-hidden group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:py-2">
        <SidebarGroup>
          <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500 group-data-[collapsible=icon]:hidden">Core surfaces</p>
          <SidebarMenu>
            {sidebarPrimaryItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  isActive={item.isActive}
                  disabled={item.isUnavailable}
                  className="relative overflow-hidden text-slate-700 hover:text-slate-900 data-[active=true]:bg-blue-600 data-[active=true]:text-white data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-75 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:gap-0"
                  tooltip={item.label}
                >
                  <item.icon className="size-4" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  {item.isUnavailable ? (
                    <span className="group-data-[collapsible=icon]:hidden">
                      <UnavailableOverlay label={item.availabilityLabel ?? "Soon"} />
                    </span>
                  ) : null}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500 group-data-[collapsible=icon]:hidden">Integrations</p>
          <SidebarMenu>
            {sidebarSecondaryItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  disabled={item.isUnavailable}
                  className="relative overflow-hidden text-slate-700 hover:text-slate-900 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-75 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:gap-0"
                  tooltip={item.label}
                >
                  <item.icon className="size-4" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  {item.isUnavailable ? (
                    <span className="group-data-[collapsible=icon]:hidden">
                      <UnavailableOverlay label={item.availabilityLabel ?? "Soon"} />
                    </span>
                  ) : null}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-100 bg-white p-2 group-data-[collapsible=icon]:p-1">
        <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-2 shadow-sm ring-1 ring-slate-950/5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-lg group-data-[collapsible=icon]:p-1.5">
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarFallback className="bg-blue-100 text-xs text-blue-800">KR</AvatarFallback>
            </Avatar>
            <div className="group-data-[collapsible=icon]:hidden">
              <p className="text-xs font-medium text-slate-800">Kai Rivera</p>
              <p className="text-[11px] text-slate-500">Solo Dev Workspace</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 group-data-[collapsible=icon]:hidden">
            Synced
          </Badge>
        </div>
        <button className="mt-2 flex w-full items-center justify-between rounded-lg border border-slate-200/80 bg-white px-2 py-2 text-xs text-slate-700 shadow-sm ring-1 ring-slate-950/5 hover:bg-slate-50 group-data-[collapsible=icon]:hidden">
          Open generation presets
          <ChevronRight className="size-3.5" />
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
