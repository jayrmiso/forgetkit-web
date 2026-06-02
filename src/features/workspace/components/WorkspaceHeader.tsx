"use client";

import { useEffect, useRef, useState } from "react";

import { ThemeToggle } from "@/templates/dashboard/components/ThemeToggle";

type WorkspaceOption = {
  label: string;
  note: string;
};

const workspaceOptions: WorkspaceOption[] = [
  { label: "Project Eclipse", note: "Primary workspace" },
  { label: "Luma Shift", note: "Secondary concept line" },
  { label: "Atelier Grayline", note: "Experimental direction" },
];

const userActions = [
  { label: "Profile" },
  { label: "Workspace settings" },
  { label: "Sign out" },
] as const;

function WorkspaceGlyph() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect height="14" width="16" x="4" y="5" rx="3" />
      <path d="M4 10h16" />
      <path d="M8 5v14" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Z" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}

export function WorkspaceHeader() {
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [workspace, setWorkspace] = useState(workspaceOptions[0]);
  const workspaceRef = useRef<HTMLDivElement | null>(null);
  const userRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;

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
    <header className="sticky top-0 z-40 border-b border-app bg-app-surface/92 px-4 py-3 shadow-sm backdrop-blur-md md:px-6">
      <div className="mx-auto flex max-w-[1480px] items-center gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <ThemeToggle />

          <span className="hidden text-xs font-semibold uppercase tracking-[0.22em] text-app-muted sm:inline">Workspace:</span>

          <div ref={workspaceRef} className="relative">
            <button
              aria-expanded={workspaceOpen}
              aria-haspopup="menu"
              aria-label="Select workspace"
              className="inline-flex h-9 items-center gap-2 rounded-xl border border-app bg-app-raised px-3 text-sm font-medium text-app shadow-sm transition hover:bg-app-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-primary/30"
              type="button"
              onClick={() => {
                setUserOpen(false);
                setWorkspaceOpen((current) => !current);
              }}
            >
              <span className="flex size-7 items-center justify-center rounded-lg border border-app bg-app-surface text-app-primary">
                <WorkspaceGlyph />
              </span>
              <span className="max-w-[10rem] truncate">{workspace.label}</span>
              <ChevronDownIcon />
            </button>

            {workspaceOpen ? (
              <div
                aria-label="Workspace options"
                className="absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-app bg-app-surface p-1.5 shadow-xl"
                role="menu"
              >
                {workspaceOptions.map((option) => {
                  const selected = option.label === workspace.label;

                  return (
                    <button
                      key={option.label}
                      aria-checked={selected}
                      className={
                        selected
                          ? "flex w-full items-start gap-3 rounded-xl bg-app-primary/12 px-3 py-2 text-left text-sm text-app"
                          : "flex w-full items-start gap-3 rounded-xl px-3 py-2 text-left text-sm text-app hover:bg-app-raised"
                      }
                      role="menuitemradio"
                      type="button"
                      onClick={() => {
                        setWorkspace(option);
                        setWorkspaceOpen(false);
                      }}
                    >
                      <span className="mt-0.5 flex size-8 items-center justify-center rounded-lg border border-app bg-app-raised text-app-primary">
                        <WorkspaceGlyph />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-medium">{option.label}</span>
                        <span className="block text-xs text-app-muted">{option.note}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        <div ref={userRef} className="relative ml-auto">
          <button
            aria-expanded={userOpen}
            aria-haspopup="menu"
            aria-label="Open user menu"
            className="inline-flex h-9 items-center gap-2 rounded-xl border border-app bg-app-raised px-3 text-sm font-medium text-app shadow-sm transition hover:bg-app-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-primary/30"
            type="button"
            onClick={() => {
              setWorkspaceOpen(false);
              setUserOpen((current) => !current);
            }}
          >
            <span className="hidden max-w-[10rem] truncate sm:inline">Kai Rivera</span>
            <span className="flex size-7 items-center justify-center rounded-full border border-app bg-app-primary text-xs font-semibold text-white">KR</span>
            <ChevronDownIcon />
          </button>

          {userOpen ? (
            <div
              aria-label="User options"
              className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-app bg-app-surface p-1.5 shadow-xl"
              role="menu"
            >
              {userActions.map((action) => (
                <button
                  key={action.label}
                  className="flex w-full items-center rounded-xl px-3 py-2 text-left text-sm text-app hover:bg-app-raised"
                  role="menuitem"
                  type="button"
                  onClick={() => setUserOpen(false)}
                >
                  {action.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
