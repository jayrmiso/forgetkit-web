"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type WorkspacePreparingOverlayProps = Readonly<{
  workspaceName: string;
}>;

const loadingMessages = [
  "Please wait...",
  "Preparing your workspace...",
  "Saving this workspace as your active project...",
  "Setting up the workspace shell...",
  "Getting your workspace settings ready...",
  "Almost there...",
];

export function WorkspacePreparingOverlay({ workspaceName }: WorkspacePreparingOverlayProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const message = loadingMessages[messageIndex] ?? loadingMessages[loadingMessages.length - 1];
  const progress = Math.round(((messageIndex + 1) / loadingMessages.length) * 100);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMessageIndex((current) => Math.min(current + 1, loadingMessages.length - 1));
    }, 1100);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return createPortal(
    <div
      aria-live="polite"
      aria-modal="true"
      className="fixed inset-0 z-[1200] grid min-h-dvh place-items-center bg-slate-950/70 px-4 py-6 text-app backdrop-blur-md"
      role="dialog"
    >
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <div className="relative size-20">
          <div className="absolute inset-0 rounded-full border border-app-primary/20" />
          <div className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-app-primary" />
          <div className="absolute inset-6 rounded-full bg-app-primary/20 shadow-[0_0_42px_rgba(183,121,31,0.35)]" />
        </div>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.28em] text-app-primary">Workspace setup</p>
        <h2 key={message} className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-white">
          {message}
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
          We created <span className="font-semibold text-white">{workspaceName}</span>. Hold on while ForgetKit makes it the active workspace and loads the right shell.
        </p>

        <div
          aria-label="Workspace preparation progress"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progress}
          className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-white/10"
          role="progressbar"
        >
          <div
            className="h-full rounded-full bg-app-primary shadow-[0_0_22px_rgba(183,121,31,0.5)] transition-[width] duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
