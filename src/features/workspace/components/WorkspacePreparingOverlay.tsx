"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type WorkspacePreparingOverlayProps = Readonly<{
  mode?: "create" | "switch";
  workspaceName: string;
}>;

const loadingMessages = {
  create: [
    "Please wait...",
    "Preparing your workspace...",
    "Saving this workspace as your active project...",
    "Setting up the workspace shell...",
    "Getting your workspace settings ready...",
    "Almost there...",
  ],
  switch: [
    "Please wait...",
    "Switching workspace...",
    "Saving this workspace as active...",
    "Loading the workspace shell...",
    "Almost there...",
  ],
} satisfies Record<NonNullable<WorkspacePreparingOverlayProps["mode"]>, string[]>;

const overlayCopy = {
  create: {
    eyebrow: "Workspace setup",
    description: "We created",
    suffix: "Hold on while ForgetKit makes it the active workspace and loads the right shell.",
    progressLabel: "Workspace preparation progress",
  },
  switch: {
    eyebrow: "Workspace switch",
    description: "Switching to",
    suffix: "Hold on while ForgetKit saves your selection and loads the right workspace shell.",
    progressLabel: "Workspace switch progress",
  },
} satisfies Record<NonNullable<WorkspacePreparingOverlayProps["mode"]>, { eyebrow: string; description: string; suffix: string; progressLabel: string }>;

const defaultLoadingMessages = [
  "Please wait...",
];

export function WorkspacePreparingOverlay({ mode = "create", workspaceName }: WorkspacePreparingOverlayProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = loadingMessages[mode] ?? defaultLoadingMessages;
  const copy = overlayCopy[mode];
  const message = messages[messageIndex] ?? messages[messages.length - 1];
  const progress = Math.round(((messageIndex + 1) / messages.length) * 100);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMessageIndex((current) => Math.min(current + 1, messages.length - 1));
    }, 1100);

    return () => {
      window.clearInterval(interval);
    };
  }, [messages.length]);

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

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.28em] text-app-primary">{copy.eyebrow}</p>
        <h2 key={message} className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-white">
          {message}
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
          {copy.description} <span className="font-semibold text-white">{workspaceName}</span>. {copy.suffix}
        </p>

        <div
          aria-label={copy.progressLabel}
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
