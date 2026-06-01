import { Button, Input } from "@heroui/react";
import { ThemeToggle } from "./ThemeToggle";

type DashboardHeaderProps = {
  title: string;
};

export function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <header className="fixed top-3 left-1/2 z-50 w-[min(1280px,calc(100vw-24px))] -translate-x-1/2 rounded-2xl border border-app bg-app-surface/92 px-3 py-2 shadow-sm backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs text-app-muted">Workspace / Sprint 08 / {title}</p>
        </div>
        <div className="ml-auto flex min-w-0 items-center gap-2">
          <Input
            className="w-[260px] max-w-[38vw]"
            placeholder="Search assets, narratives, versions"
          />
          <ThemeToggle />
          <Button className="hidden border border-app bg-app-primary text-white sm:inline-flex" size="sm" variant="primary">
            New Job
          </Button>
          <Button className="border border-app bg-app-raised text-app" size="sm" variant="secondary">
            Kai Rivera
          </Button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-app bg-app-raised text-xs font-medium text-app">
            KR
          </div>
        </div>
      </div>
    </header>
  );
}
