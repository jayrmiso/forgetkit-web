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

  return (
    <nav aria-label="Workspace routes" className="fixed inset-x-0 bottom-3 z-50 flex justify-center px-3">
      <div className="flex max-w-[calc(100vw-24px)] gap-2 overflow-x-auto rounded-2xl border border-app bg-app-surface/94 p-1.5 shadow-lg backdrop-blur-md">
        {workspaceRouteGroups.map((group) => (
          <div key={group} className="flex items-center gap-1 border-app pr-2 last:pr-0 [&:not(:last-child)]:border-r">
            {workspaceRoutes
              .filter((route) => route.group === group)
              .map((route) => {
                const active = isActiveRoute(pathname, route.href);
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    aria-current={active ? "page" : undefined}
                    className={
                      active
                        ? "inline-flex h-10 min-w-10 items-center justify-center gap-2 rounded-xl border border-app bg-app-primary px-3 text-sm font-medium text-white"
                        : "inline-flex h-10 min-w-10 items-center justify-center gap-2 rounded-xl border border-transparent bg-app-raised px-3 text-sm font-medium text-app hover:border-app hover:bg-app-surface"
                    }
                    title={route.description}
                  >
                    <span className="inline-flex size-4 items-center justify-center text-xs font-semibold" aria-hidden="true">{route.icon}</span>
                    <span className="hidden whitespace-nowrap xl:inline">{route.label}</span>
                  </Link>
                );
              })}
          </div>
        ))}
      </div>
    </nav>
  );
}
