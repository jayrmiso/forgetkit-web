"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import type { AuthSession } from "@/features/auth/authSession";
import { clearAuthSession, SIGNED_OUT_LOGIN_PATH } from "@/features/auth/authSession";

import type { WorkspaceRecord } from "../api/workspaceApi";
import { clearActiveWorkspaceId, persistActiveWorkspaceId } from "../workspaceSession";
import { workspacePath } from "../workspacePath";
import { WorkspaceCreateDialog } from "./WorkspaceCreateDialog";
import { WorkspaceGlobalSearch } from "./WorkspaceGlobalSearch";
import { WorkspacePreparingOverlay } from "./WorkspacePreparingOverlay";
import { WorkspaceSwitcherPanel } from "./WorkspaceSwitcherPanel";

const WORKSPACE_SWITCH_DELAY_MS = 3200;

function ChevronDownIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function WorkspaceSelectorIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="m10 6-5 6 5 6" />
      <path d="m14 6 5 6-5 6" />
    </svg>
  );
}

function getUserInitials(label: string) {
  const parts = label
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return (parts[0]?.slice(0, 2) ?? "FK").toUpperCase();
}

type WorkspaceHeaderProps = Readonly<{
  session: AuthSession;
  workspaces: WorkspaceRecord[];
  currentWorkspace: WorkspaceRecord;
}>;

export function WorkspaceHeader({ session, workspaces, currentWorkspace }: WorkspaceHeaderProps) {
  const router = useRouter();
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [createWorkspaceOpen, setCreateWorkspaceOpen] = useState(false);
  const [switchingWorkspaceName, setSwitchingWorkspaceName] = useState("");
  const [userOpen, setUserOpen] = useState(false);
  const workspaceRef = useRef<HTMLDivElement | null>(null);
  const userRef = useRef<HTMLDivElement | null>(null);
  const userLabel = session.displayName ?? session.username ?? session.email.split("@")[0];
  const userInitials = getUserInitials(userLabel);

  function waitForWorkspaceSwitch() {
    return new Promise((resolve) => {
      window.setTimeout(resolve, WORKSPACE_SWITCH_DELAY_MS);
    });
  }

  async function handleWorkspaceSelect(workspaceId: string, options?: Readonly<{ skipLoading?: boolean }>) {
    const workspace = workspaces.find((item) => item.id === workspaceId);

    persistActiveWorkspaceId(workspaceId);
    setCreateWorkspaceOpen(false);
    setWorkspaceOpen(false);
    setUserOpen(false);

    if (!options?.skipLoading && workspaceId !== currentWorkspace.id) {
      setSwitchingWorkspaceName(workspace?.name ?? "workspace");
      await waitForWorkspaceSwitch();
    }

    router.push(workspacePath(workspaceId, "/"));
    setSwitchingWorkspaceName("");
  }

  function handleProfileClick() {
    setUserOpen(false);
    router.push(workspacePath(currentWorkspace.id, "/profile"));
  }

  function handleWorkspaceSettingsClick() {
    setUserOpen(false);
    router.push(workspacePath(currentWorkspace.id, "/workspace-settings"));
  }

  function handleSignOut() {
    setUserOpen(false);
    clearAuthSession();
    clearActiveWorkspaceId();
    router.replace(SIGNED_OUT_LOGIN_PATH);
    router.refresh();
  }

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      const elementTarget = event.target as Element | null;

      if (elementTarget?.closest("[data-workspace-create-dialog='true']")) {
        return;
      }

      if (workspaceRef.current && !workspaceRef.current.contains(target)) {
        setWorkspaceOpen(false);
      }

      if (userRef.current && !userRef.current.contains(target)) {
        setUserOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setWorkspaceOpen(false);
        setCreateWorkspaceOpen(false);
        setUserOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-app bg-app-surface/96 px-2 py-3 shadow-md backdrop-blur-md md:px-3 lg:px-4">
      <div className="mx-auto grid w-full max-w-[1560px] grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-3">
        <div className="flex min-w-0 items-center gap-2 justify-self-start">
          <div ref={workspaceRef} className="relative">
            <button
              aria-expanded={workspaceOpen}
              aria-haspopup="dialog"
              aria-label="Select workspace"
              className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-xl px-2 text-sm font-medium text-app transition hover:bg-app-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-primary/30"
              type="button"
              onClick={() => {
                setUserOpen(false);
                setWorkspaceOpen((current) => !current);
              }}
            >
              <span className="flex size-6 items-center justify-center text-app-primary">
                <WorkspaceSelectorIcon />
              </span>
              <span className="max-w-[10rem] truncate">{currentWorkspace.name}</span>
              <ChevronDownIcon />
            </button>

            {workspaceOpen ? (
              <WorkspaceSwitcherPanel
                currentWorkspace={currentWorkspace}
                workspaces={workspaces}
                onClose={() => setWorkspaceOpen(false)}
                onCreateWorkspace={() => {
                  setWorkspaceOpen(false);
                  setCreateWorkspaceOpen(true);
                }}
                onSelectWorkspace={handleWorkspaceSelect}
              />
            ) : null}
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-2 justify-self-end -translate-x-3 lg:-translate-x-5">
          <WorkspaceGlobalSearch
            accessToken={session.accessToken}
            onOpenChange={(open) => {
              if (open) {
                setWorkspaceOpen(false);
                setUserOpen(false);
              }
            }}
          />
          <div ref={userRef} className="relative">
            <button
              aria-expanded={userOpen}
              aria-haspopup="menu"
              aria-label="Open user menu"
              className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-xl px-2 text-sm font-medium text-app transition hover:bg-app-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-primary/30"
              type="button"
              onClick={() => {
                setWorkspaceOpen(false);
                setUserOpen((current) => !current);
              }}
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-xl border border-app bg-app-bg text-[11px] font-semibold text-app-primary">
                {userInitials}
              </span>
              <span className="max-w-[9rem] truncate">{userLabel}</span>
              <ChevronDownIcon />
            </button>

            {userOpen ? (
              <div
                aria-label="User options"
                className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-app bg-app-surface p-1.5 shadow-xl"
                role="menu"
              >
                <button
                  className="flex w-full cursor-pointer items-center rounded-xl px-3 py-2 text-left text-sm text-app transition-all duration-200 hover:-translate-y-0.5 hover:bg-app-raised"
                  role="menuitem"
                  type="button"
                  onClick={handleProfileClick}
                >
                  Profile
                </button>
                <button
                  className="flex w-full cursor-pointer items-center rounded-xl px-3 py-2 text-left text-sm text-app transition-all duration-200 hover:-translate-y-0.5 hover:bg-app-raised"
                  role="menuitem"
                  type="button"
                  onClick={handleWorkspaceSettingsClick}
                >
                  Workspace settings
                </button>
                <button
                  className="flex w-full cursor-pointer items-center rounded-xl px-3 py-2 text-left text-sm text-app transition-all duration-200 hover:-translate-y-0.5 hover:bg-app-raised"
                  role="menuitem"
                  type="button"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <WorkspaceCreateDialog
        accessToken={session.accessToken}
        open={createWorkspaceOpen}
        onClose={() => setCreateWorkspaceOpen(false)}
        onCreated={(workspace) => {
          void handleWorkspaceSelect(workspace.id, { skipLoading: true });
        }}
      />

      {switchingWorkspaceName ? <WorkspacePreparingOverlay mode="switch" workspaceName={switchingWorkspaceName} /> : null}
    </header>
  );
}
