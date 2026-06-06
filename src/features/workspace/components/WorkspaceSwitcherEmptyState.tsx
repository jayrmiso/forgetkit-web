"use client";

export function WorkspaceSwitcherEmptyState({ description }: Readonly<{ description: string }>) {
  return (
    <div className="rounded-xl border border-dashed border-app bg-app-bg px-3 py-4 text-sm text-app-muted">
      {description}
    </div>
  );
}
