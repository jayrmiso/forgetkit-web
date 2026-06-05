"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/templates/dashboard/components/ThemeToggle";

import { workspaceRouteGroups, workspaceRoutes } from "../data/navigation";
import { workspacePath } from "../workspacePath";

type WorkspaceDockProps = Readonly<{
  workspaceId: string;
}>;

function isActiveRoute(pathname: string, href: string, workspaceId: string) {
  const workspaceHref = workspacePath(workspaceId, href);

  return pathname === workspaceHref || pathname.startsWith(`${workspaceHref}/`);
}

export function WorkspaceDock({ workspaceId }: WorkspaceDockProps) {
  const pathname = usePathname();
  const coreRoutes = workspaceRoutes.filter((route) => route.group === workspaceRouteGroups[0]);
  const integrationRoutes = workspaceRoutes.filter((route) => route.group === workspaceRouteGroups[1]);
  const dockRoutes = [...coreRoutes, ...integrationRoutes];

  return (
    <nav aria-label="Workspace routes" className="pointer-events-auto flex w-fit max-w-full items-center justify-center">
      <div className="flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-[1.4rem] border border-app bg-app-surface/94 p-1.5 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-md">
        {dockRoutes.map((route, index) => {
          const active = isActiveRoute(pathname, route.href, workspaceId);
          const Icon = route.icon;
          const showSeparator = index === coreRoutes.length;

          return (
            <div key={route.href} className="group relative flex items-center gap-1.5">
              {showSeparator ? <span aria-hidden="true" className="mx-1 h-6 w-px bg-app-border/80" /> : null}
              <Link
                href={workspacePath(workspaceId, route.href)}
                aria-current={active ? "page" : undefined}
                aria-label={route.label}
                className={
                  active
                    ? "inline-flex size-10 items-center justify-center rounded-2xl border border-app bg-app-primary text-white shadow-sm transition duration-200 ease-out hover:scale-110 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-primary/40"
                    : "inline-flex size-10 items-center justify-center rounded-2xl border border-transparent bg-app-raised text-app-muted transition duration-200 ease-out hover:scale-110 hover:-translate-y-1 hover:border-app hover:bg-app-surface hover:text-app hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-primary/30"
                }
                title={route.label}
              >
                <Icon aria-hidden="true" className="size-5 shrink-0" strokeWidth={2} />
              </Link>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[calc(100%+0.6rem)] left-1/2 z-50 -translate-x-1/2 translate-y-1 scale-95 whitespace-nowrap rounded-full border border-app bg-app-surface px-3 py-1 text-xs font-medium text-app opacity-0 shadow-lg transition duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100"
              >
                {route.label}
              </span>
            </div>
          );
        })}
        <span aria-hidden="true" className="mx-1 h-6 w-px bg-app-border/80" />
        <ThemeToggle />
      </div>
    </nav>
  );
}

