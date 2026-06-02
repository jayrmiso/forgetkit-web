import { Avatar, Button, Input } from "@heroui/react";

import { ThemeToggle } from "@/templates/dashboard/components/ThemeToggle";

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  );
}

export function WorkspaceHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-app bg-app-surface/92 px-4 py-3 shadow-sm backdrop-blur-md md:px-6">
      <div className="mx-auto flex max-w-[1480px] flex-wrap items-center gap-3">
        <div className="min-w-[10rem]">
          <p className="text-sm font-semibold text-app">ForgetKit Workspace</p>
          <p className="text-xs text-app-muted">Sprint 08 / Project Eclipse</p>
        </div>

        <div className="relative min-w-[14rem] flex-1 sm:max-w-md">
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-app-muted">
            <SearchIcon />
          </span>
          <Input
            aria-label="Search workspace"
            className="border border-app bg-app-raised pl-9 text-app"
            placeholder="Search assets, narratives, versions"
          />
        </div>

        <div className="hidden rounded-xl border border-app bg-app-raised px-3 py-2 text-xs text-app-muted lg:block">
          <span className="font-medium text-app">Storage:</span> planned
          <span className="mx-2 text-app-muted">/</span>
          <span className="font-medium text-app">Export:</span> review-ready
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button className="hidden border border-app bg-app-primary text-white sm:inline-flex" size="sm" variant="primary">
            New Job
          </Button>
          <Button aria-label="Open notifications" className="border border-app bg-app-raised text-app" isIconOnly size="sm" variant="secondary">
            <BellIcon />
          </Button>
          <ThemeToggle />
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-app bg-app-raised text-xs font-medium text-app" aria-label="Kai Rivera">KR</div>
        </div>
      </div>
    </header>
  );
}
