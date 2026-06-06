"use client";

import type { WorkspaceRecord } from "../api/workspaceApi";

function WorkspaceSwitcherIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="m10 6-5 6 5 6" />
      <path d="m14 6 5 6-5 6" />
    </svg>
  );
}

function WorkspaceStatusBadge({ selected, current }: Readonly<{ selected?: boolean; current?: boolean }>) {
  if (!selected && !current) {
    return null;
  }

  return (
    <span
      className={
        selected
          ? "rounded-full border border-app-primary/20 bg-app-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-app-primary"
          : "rounded-full border border-app/70 bg-app-raised px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-app-muted"
      }
    >
      {current ? "Current" : "Selected"}
    </span>
  );
}

function formatWorkspaceSubtitle(workspace: WorkspaceRecord) {
  const parts = [workspace.status, workspace.engineTarget === "godot" ? "Godot" : "Unknown engine"];

  if (workspace.activeMilestone) {
    parts.push(workspace.activeMilestone);
  }

  return parts.join(" / ");
}

type WorkspaceSwitcherItemProps = Readonly<{
  workspace: WorkspaceRecord;
  selected?: boolean;
  current?: boolean;
  onSelect: () => void;
}>;

export function WorkspaceSwitcherItem({ workspace, selected = false, current = false, onSelect }: WorkspaceSwitcherItemProps) {
  return (
    <button
      aria-current={selected ? "page" : undefined}
      className={
        selected
          ? "group flex w-full cursor-pointer items-start gap-3 rounded-xl border border-app-primary/20 bg-app-primary/10 px-3 py-2 text-left text-sm text-app shadow-[0_8px_22px_-16px_rgba(183,121,31,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-app-primary/12 hover:shadow-[0_14px_30px_-22px_rgba(183,121,31,0.55)]"
          : "group flex w-full cursor-pointer items-start gap-3 rounded-xl px-3 py-2 text-left text-sm text-app transition-all duration-200 hover:-translate-y-0.5 hover:bg-app-raised"
      }
      type="button"
      onClick={onSelect}
    >
      <span
        className={
          selected
            ? "mt-0.5 flex size-8 items-center justify-center rounded-lg border border-app-primary/20 bg-app-surface text-app-primary transition-transform duration-200 group-hover:scale-105"
            : "mt-0.5 flex size-8 items-center justify-center rounded-lg border border-app bg-app-raised text-app-primary transition-transform duration-200 group-hover:scale-105"
        }
      >
        <WorkspaceSwitcherIcon />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="block truncate font-medium">{workspace.name}</span>
          <WorkspaceStatusBadge selected={selected} current={current} />
        </span>
        <span className="block text-xs text-app-muted">{formatWorkspaceSubtitle(workspace)}</span>
      </span>
    </button>
  );
}
