"use client";

import { createPortal } from "react-dom";

type WorkspacePreparingOverlayProps = Readonly<{
  workspaceName: string;
}>;

const preparationSteps = [
  "Creating the scoped workspace route",
  "Saving the active workspace selection",
  "Preparing setup, settings, and dashboard state",
  "Loading the workspace shell",
];

export function WorkspacePreparingOverlay({ workspaceName }: WorkspacePreparingOverlayProps) {
  return createPortal(
    <div
      aria-live="polite"
      aria-modal="true"
      className="fixed inset-0 z-[1200] grid min-h-dvh place-items-center bg-slate-950/60 px-4 py-6 text-app backdrop-blur-md"
      role="dialog"
    >
      <div className="w-full max-w-lg rounded-[2rem] border border-app bg-app-surface/95 p-6 shadow-[0_28px_90px_-34px_rgba(0,0,0,0.72)]">
        <div className="flex items-start gap-4">
          <div className="relative mt-1 size-12 shrink-0">
            <div className="absolute inset-0 rounded-full border-2 border-app-primary/20" />
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-app-primary" />
            <div className="absolute inset-3 rounded-full bg-app-primary/20" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-app-primary">Preparing workspace</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-app">{workspaceName}</h2>
            <p className="mt-2 text-sm leading-6 text-app-muted">
              Setting up your workspace shell, active selection, and first setup state before we move you in.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {preparationSteps.map((step, index) => (
            <div key={step} className="flex items-center gap-3 rounded-2xl border border-app bg-app-raised/70 px-3 py-2.5">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-app-primary/15 text-xs font-semibold text-app-primary">
                {index + 1}
              </span>
              <span className="text-sm text-app-muted">{step}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-app-raised">
          <div className="h-full w-2/3 animate-pulse rounded-full bg-app-primary" />
        </div>
      </div>
    </div>,
    document.body,
  );
}
