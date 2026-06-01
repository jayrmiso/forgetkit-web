import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownPopover, DropdownTrigger } from "@heroui/react";
import type { ReactNode } from "react";

type SidebarItem = {
  label: string;
  isActive?: boolean;
  isSoon?: boolean;
};

type DashboardSidebarProps = {
  coreItems: SidebarItem[];
  integrationItems: SidebarItem[];
};

function DockIcon({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center text-current" aria-hidden="true">
      {children}
    </span>
  );
}

function iconFor(label: string) {
  const icons: Record<string, ReactNode> = {
    Dashboard: (
      <DockIcon>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <rect x="3" y="3" width="8" height="8" rx="1.5" />
          <rect x="13" y="3" width="8" height="5" rx="1.5" />
          <rect x="13" y="10" width="8" height="11" rx="1.5" />
          <rect x="3" y="13" width="8" height="8" rx="1.5" />
        </svg>
      </DockIcon>
    ),
    "Generation Workbench": (
      <DockIcon>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M12 3v18M3 12h18" />
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      </DockIcon>
    ),
    "Asset Library": (
      <DockIcon>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 10h18M9 4v16M15 4v16" />
        </svg>
      </DockIcon>
    ),
    "Narrative Library": (
      <DockIcon>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M5 5h10a3 3 0 0 1 3 3v11H8a3 3 0 0 0-3 3z" />
          <path d="M8 8h6M8 12h8M8 16h5" />
        </svg>
      </DockIcon>
    ),
    "Review & Compare": (
      <DockIcon>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M7 7h10M7 17h10M7 7l3-3M7 7l3 3M17 17l-3-3M17 17l-3 3" />
        </svg>
      </DockIcon>
    ),
    "Version History": (
      <DockIcon>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" />
        </svg>
      </DockIcon>
    ),
    "Supabase Storage": (
      <DockIcon>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v9c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
        </svg>
      </DockIcon>
    ),
    "Godot Export Readiness": (
      <DockIcon>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M7 17 17 7M9 7h8v8" />
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
      </DockIcon>
    ),
    "Aseprite Integration": (
      <DockIcon>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M4 12h16M12 4v16" />
        </svg>
      </DockIcon>
    ),
    "Consistency Controls": (
      <DockIcon>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1 1 0 0 1 0 1.4l-1.3 1.3a1 1 0 0 1-1.4 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1 1 0 0 1-1.4 0L4.3 17.9a1 1 0 0 1 0-1.4l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H3.5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1 1 0 0 1 0-1.4L5.7 4.3a1 1 0 0 1 1.4 0l.1.1a1 1 0 0 0 1.1.2h.1a1 1 0 0 0 .6-.9V3.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v.2a1 1 0 0 0 .6.9h.1a1 1 0 0 0 1.1-.2l.1-.1a1 1 0 0 1 1.4 0l1.3 1.3a1 1 0 0 1 0 1.4l-.1.1a1 1 0 0 0-.2 1.1v.1a1 1 0 0 0 .9.6h.2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-.2a1 1 0 0 0-.9.6z" />
        </svg>
      </DockIcon>
    ),
  };

  return icons[label] ?? (
    <DockIcon>
      <svg className="h-4 w-4" viewBox="0 0 12 12" fill="currentColor">
        <circle cx="6" cy="6" r="2.5" />
      </svg>
    </DockIcon>
  );
}

export function DashboardSidebar({ coreItems, integrationItems }: DashboardSidebarProps) {
  const primaryCore = coreItems.filter((item) =>
    ["Dashboard", "Generation Workbench", "Asset Library", "Narrative Library"].includes(item.label)
  );
  const secondaryCore = coreItems.filter(
    (item) => !["Dashboard", "Generation Workbench", "Asset Library", "Narrative Library"].includes(item.label)
  );

  return (
    <aside className="pointer-events-none fixed inset-x-0 bottom-3 z-50 flex justify-center px-2">
      <div className="pointer-events-auto w-auto rounded-xl border border-app bg-app-surface/92 p-1 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-1">
          {primaryCore.map((item) => (
            <div key={item.label} title={item.label}>
              <Button
                aria-label={item.label}
                className={
                  item.isActive
                    ? "h-9 w-9 min-w-0 justify-center rounded-lg border border-app bg-app-primary p-0 text-white"
                    : "h-9 w-9 min-w-0 justify-center rounded-lg border border-app bg-app-raised p-0 text-app hover:bg-app-surface"
                }
                size="sm"
                variant="secondary"
              >
                {iconFor(item.label)}
              </Button>
            </div>
          ))}

          <div className="h-6 w-px bg-app-raised" />

          <Dropdown>
            <DropdownTrigger>
              <Button
                aria-label="More core surfaces"
                className="h-9 w-9 min-w-0 justify-center rounded-lg border border-app bg-app-raised p-0 text-app hover:bg-app-surface"
                size="sm"
                variant="secondary"
              >
                <DockIcon>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="5" cy="12" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="19" cy="12" r="2" />
                  </svg>
                </DockIcon>
              </Button>
            </DropdownTrigger>
            <DropdownPopover className="border border-app bg-app-surface text-app" placement="top">
              <DropdownMenu
                aria-label="Core Surfaces"
              >
                {secondaryCore.map((item) => (
                  <DropdownItem key={item.label} className="text-app" textValue={item.label}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2">
                        {iconFor(item.label)}
                        <span>{item.label}</span>
                      </span>
                      {item.isSoon ? <Chip className="border border-app bg-app-warning/20 text-app-warning" size="sm" variant="secondary">Soon</Chip> : null}
                    </div>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </DropdownPopover>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button
                aria-label="Integrations"
                className="h-9 w-9 min-w-0 justify-center rounded-lg border border-app bg-app-raised p-0 text-app hover:bg-app-surface"
                size="sm"
                variant="secondary"
              >
                {iconFor("Consistency Controls")}
              </Button>
            </DropdownTrigger>
            <DropdownPopover className="border border-app bg-app-surface text-app" placement="top">
              <DropdownMenu
                aria-label="Integrations"
              >
                {integrationItems.map((item) => (
                  <DropdownItem key={item.label} className="text-app" textValue={item.label}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2">
                        {iconFor(item.label)}
                        <span>{item.label}</span>
                      </span>
                      {item.isSoon ? <Chip className="border border-app bg-app-warning/20 text-app-warning" size="sm" variant="secondary">Soon</Chip> : null}
                    </div>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </DropdownPopover>
          </Dropdown>
        </div>
      </div>
    </aside>
  );
}
