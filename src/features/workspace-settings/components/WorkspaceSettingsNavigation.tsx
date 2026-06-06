"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { workspacePath } from "@/features/workspace/workspacePath";

type WorkspaceNavItem = Readonly<{
  label: string;
  href: string;
  description: string;
}>;

const workspaceNavItems: WorkspaceNavItem[] = [
  { label: "Workspace overview", href: "/workspace-settings", description: "Identity and active project" },
  { label: "Generation presets", href: "/workspace-settings/presets", description: "Prompt, seed, and palette locks" },
  { label: "Export targets", href: "/workspace-settings/exports", description: "Godot-ready output settings" },
  { label: "Integrations", href: "/workspace-settings/integrations", description: "External tool connections" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

type WorkspaceSettingsNavigationProps = Readonly<{
  workspaceId: string;
}>;

export function WorkspaceSettingsNavigation({ workspaceId }: WorkspaceSettingsNavigationProps) {
  const pathname = usePathname();

  return (
    <aside className="lg:sticky lg:top-4">
      <div className="border-b border-app pb-3 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-3">
        <div className="px-2 py-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-app-muted">Workspace</p>
        </div>

        <nav aria-label="Workspace settings navigation" className="space-y-1">
          {workspaceNavItems.map((item) => {
            const href = workspacePath(workspaceId, item.href);
            const active = isActive(pathname, href);

            return (
              <Link
                key={item.href}
                className={cn(
                  "group flex flex-col border-l-2 px-3 py-2.5 text-left transition-colors duration-200",
                  active
                    ? "border-app-primary bg-app-primary/10 text-app"
                    : "border-transparent text-app-muted hover:border-app-primary/40 hover:bg-app-raised/70 hover:text-app",
                )}
                href={href}
                aria-current={active ? "page" : undefined}
              >
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-xs leading-5 text-app-muted group-hover:text-app-muted/90">{item.description}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
