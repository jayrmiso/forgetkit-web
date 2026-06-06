"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { WorkspaceRecord } from "../api/workspaceApi";

import { Input } from "@/components/ui/input";

import { WorkspaceCreateDialog } from "./WorkspaceCreateDialog";
import { WorkspaceSwitcherEmptyState } from "./WorkspaceSwitcherEmptyState";
import { WorkspaceSwitcherItem } from "./WorkspaceSwitcherItem";

function matchesWorkspace(workspace: WorkspaceRecord, query: string) {
  const haystack = [workspace.name, workspace.status, workspace.engineTarget, workspace.activeMilestone ?? ""].join(" ").toLowerCase();
  return haystack.includes(query);
}

type WorkspaceSwitcherPanelProps = Readonly<{
  accessToken: string;
  workspaces: WorkspaceRecord[];
  currentWorkspace: WorkspaceRecord;
  onClose: () => void;
  onSelectWorkspace: (workspaceId: string) => void;
}>;

export function WorkspaceSwitcherPanel({ accessToken, workspaces, currentWorkspace, onClose, onSelectWorkspace }: WorkspaceSwitcherPanelProps) {
  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const normalizedQuery = query.trim().toLowerCase();

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const recentWorkspaces = useMemo(
    () => workspaces.filter((workspace) => workspace.id !== currentWorkspace.id).slice(0, 3),
    [currentWorkspace.id, workspaces],
  );

  const filteredWorkspaces = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return workspaces.filter((workspace) => workspace.id !== currentWorkspace.id && matchesWorkspace(workspace, normalizedQuery));
  }, [currentWorkspace.id, normalizedQuery, workspaces]);

  const hasQuery = normalizedQuery.length > 0;

  return (
    <div
      aria-label="Workspace options"
      className="absolute left-0 top-full z-50 mt-2 w-[min(31rem,calc(100vw-1rem))] overflow-hidden rounded-3xl border border-app bg-app-surface shadow-[0_28px_80px_-32px_rgba(15,23,42,0.45)]"
    >
      <div className="border-b border-app bg-app-surface px-3 py-3">
        <label className="sr-only" htmlFor="workspace-switcher-search">
          Search workspaces
        </label>
        <Input
          id="workspace-switcher-search"
          ref={searchRef}
          aria-label="Search workspaces"
          className="h-10 rounded-2xl border-app bg-app-bg px-3 text-sm text-app shadow-none placeholder:text-app-muted/60 focus-visible:border-[color-mix(in_oklch,var(--primary),white_12%)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklch,var(--primary),white_14%)]"
          placeholder="Search workspaces"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="max-h-[min(30rem,calc(100vh-7rem))] overflow-y-auto px-2 py-2">
        <div className="px-2 pb-2 pt-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-app-muted">Current workspace</p>
        </div>
        <WorkspaceSwitcherItem workspace={currentWorkspace} selected current onSelect={onClose} />

        <div className="px-2 pb-2 pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-app-muted">
            {hasQuery ? "Search results" : "Recent workspaces"}
          </p>
        </div>

        {hasQuery ? (
          filteredWorkspaces.length > 0 ? (
            <div className="space-y-1">
              {filteredWorkspaces.map((workspace) => (
                <WorkspaceSwitcherItem
                  key={workspace.id}
                  workspace={workspace}
                  onSelect={() => onSelectWorkspace(workspace.id)}
                />
              ))}
            </div>
          ) : (
            <WorkspaceSwitcherEmptyState description={`No workspaces match “${query.trim()}”.`} />
          )
        ) : recentWorkspaces.length > 0 ? (
          <div className="space-y-1">
            {recentWorkspaces.map((workspace) => (
              <WorkspaceSwitcherItem
                key={workspace.id}
                workspace={workspace}
                onSelect={() => onSelectWorkspace(workspace.id)}
              />
            ))}
          </div>
        ) : (
          <WorkspaceSwitcherEmptyState description="No other workspaces yet. Create another workspace to switch between them here." />
        )}
      </div>

      <div className="border-t border-app bg-app-surface p-2">
        <button
          className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-app transition hover:bg-app-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-primary/25"
          type="button"
          onClick={() => {
            setCreateOpen(true);
          }}
        >
          <span className="flex size-8 items-center justify-center rounded-xl border border-dashed border-app bg-app-bg text-app-primary">
            +
          </span>
          <span className="flex-1">
            <span className="block">+ Workspace</span>
            <span className="block text-xs font-normal text-app-muted">Create and jump into a new workspace</span>
          </span>
        </button>
      </div>

      <WorkspaceCreateDialog
        accessToken={accessToken}
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={(workspace) => {
          onClose();
          onSelectWorkspace(workspace.id);
        }}
      />
    </div>
  );
}
