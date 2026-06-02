"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { workspaceRouteGroups, workspaceRoutes } from "../data/navigation";

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function WorkspaceDock() {
  const pathname = usePathname();
  const coreRoutes = workspaceRoutes.filter((route) => route.group === workspaceRouteGroups[0]);
  const integrationRoutes = workspaceRoutes.filter((route) => route.group === workspaceRouteGroups[1]);
  const dockRoutes = [...coreRoutes, ...integrationRoutes];

  return (
    <nav aria-label="Workspace routes" className="fixed inset-x-0 bottom-3 z-50 flex justify-center px-3">
      <div className="flex max-w-[calc(100vw-24px)] items-center gap-1.5 overflow-x-auto rounded-[1.4rem] border border-app bg-app-surface/94 p-1.5 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-md">
        {dockRoutes.map((route, index) => {
          const active = isActiveRoute(pathname, route.href);
          const Icon = route.icon;
          const showSeparator = index === coreRoutes.length;

          return (
            <div key={route.href} className="flex items-center gap-1.5">
              {showSeparator ? <span aria-hidden="true" className="mx-1 h-6 w-px bg-app-border/80" /> : null}
              <Link
                href={route.href}
                aria-current={active ? "page" : undefined}
                aria-label={route.label}
                className={
                  active
                    ? "group inline-flex size-10 items-center justify-center rounded-2xl border border-app bg-app-primary text-white shadow-sm transition hover:-translate-y-px hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-primary/40"
                    : "group inline-flex size-10 items-center justify-center rounded-2xl border border-transparent bg-app-raised text-app-muted transition hover:-translate-y-px hover:border-app hover:bg-app-surface hover:text-app focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-primary/30"
                }
                title={`${route.label} · ${route.description}`}
              >
                <Icon aria-hidden="true" className="size-5 shrink-0" strokeWidth={2} />
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
