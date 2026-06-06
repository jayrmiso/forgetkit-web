"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

import type { WorkspaceRecord } from "../api/workspaceApi";

import { WorkspaceCreateForm } from "./WorkspaceCreateForm";

type WorkspaceCreateDialogProps = Readonly<{
  open: boolean;
  accessToken: string;
  onClose: () => void;
  onCreated: (workspace: WorkspaceRecord) => void;
}>;

export function WorkspaceCreateDialog({ open, accessToken, onClose, onCreated }: WorkspaceCreateDialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      aria-modal="true"
      aria-describedby="workspace-create-dialog-description"
      aria-labelledby="workspace-create-dialog-title"
      className="fixed inset-0 z-[100] grid cursor-pointer place-items-center bg-slate-950/70 px-4 py-6 backdrop-blur-md"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md cursor-default overflow-auto rounded-3xl border border-app bg-app-surface p-5 shadow-2xl max-h-[calc(100vh-3rem)]"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="space-y-2 border-b border-app pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-app-primary">New workspace</p>
          <h2 id="workspace-create-dialog-title" className="text-2xl font-semibold tracking-[-0.04em] text-app">
            Create workspace
          </h2>
          <p id="workspace-create-dialog-description" className="text-sm leading-6 text-app-muted">
            Create a new workspace from the header, then jump straight into the scoped workspace shell.
          </p>
        </div>

        <div className="pt-4">
          <WorkspaceCreateForm
            accessToken={accessToken}
            autoFocus
            submitLabel="Create workspace"
            onSuccess={(workspace) => {
              onCreated(workspace);
              onClose();
            }}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
