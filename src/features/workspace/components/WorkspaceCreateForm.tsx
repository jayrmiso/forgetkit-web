"use client";

import type { FormEvent, ReactNode } from "react";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Input } from "@/components/ui/input";

import { createWorkspace, type WorkspaceRecord } from "../api/workspaceApi";
import { persistActiveWorkspaceId } from "../workspaceSession";
import { WorkspacePreparingOverlay } from "./WorkspacePreparingOverlay";

const WORKSPACE_PREPARATION_DELAY_MS = 6200;

type WorkspaceCreateFormProps = Readonly<{
  accessToken: string;
  submitLabel?: string;
  description?: ReactNode;
  autoFocus?: boolean;
  onSuccess?: (workspace: WorkspaceRecord) => void;
}>;

export function WorkspaceCreateForm({
  accessToken,
  submitLabel = "Create workspace",
  description,
  autoFocus = false,
  onSuccess,
}: WorkspaceCreateFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [engineTarget, setEngineTarget] = useState<"godot" | "unknown">("godot");
  const [visibility, setVisibility] = useState<"private" | "public">("private");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preparingWorkspaceName, setPreparingWorkspaceName] = useState("");

  function waitForWorkspacePreparation() {
    return new Promise((resolve) => {
      window.setTimeout(resolve, WORKSPACE_PREPARATION_DELAY_MS);
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const workspace = await createWorkspace(accessToken, { name, engineTarget, visibility });
      persistActiveWorkspaceId(workspace.id);
      setPreparingWorkspaceName(workspace.name);
      await waitForWorkspacePreparation();
      if (onSuccess) {
        onSuccess(workspace);
      } else {
        router.push(`/w/${workspace.id}`);
      }
      router.refresh();
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Unable to create workspace.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {preparingWorkspaceName ? <WorkspacePreparingOverlay workspaceName={preparingWorkspaceName} /> : null}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {description ? <div className="text-sm leading-6 text-app-muted">{description}</div> : null}

        <div className="space-y-2">
          <label className="text-sm font-medium text-app" htmlFor="workspace-name">
            Workspace name
          </label>
          <Input
            id="workspace-name"
            name="workspaceName"
            autoComplete="organization"
            autoFocus={autoFocus}
            placeholder="Project Eclipse"
            type="text"
            className="h-11 rounded-xl border-app bg-app-surface px-3.5 text-[15px] shadow-[0_1px_0_rgba(15,23,42,0.02)] placeholder:text-app-muted/60 focus-visible:border-[color-mix(in_oklch,var(--primary),white_12%)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklch,var(--primary),white_16%)]"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (error) {
                setError("");
              }
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-app" htmlFor="workspace-engine-target">
            Engine target
          </label>
          <select
            id="workspace-engine-target"
            name="workspaceEngineTarget"
            className="h-11 w-full cursor-pointer rounded-xl border border-app bg-app-surface px-3.5 text-[15px] text-app shadow-[0_1px_0_rgba(15,23,42,0.02)] outline-none transition focus-visible:border-[color-mix(in_oklch,var(--primary),white_12%)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklch,var(--primary),white_16%)]"
            value={engineTarget}
            onChange={(event) => {
              setEngineTarget(event.target.value === "unknown" ? "unknown" : "godot");
              if (error) {
                setError("");
              }
            }}
          >
            <option value="godot">Godot</option>
            <option value="unknown">I will decide later</option>
          </select>
          <p className="text-xs leading-5 text-app-muted">
            This sets the initial export direction. More Godot and storage details can be added in workspace settings.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-app">Visibility</p>
          <div className="grid grid-cols-2 gap-2 rounded-2xl border border-app bg-app-bg p-1">
            {(["private", "public"] as const).map((option) => {
              const selected = visibility === option;

              return (
                <button
                  key={option}
                  className={
                    selected
                      ? "cursor-pointer rounded-xl bg-app-primary px-3 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_-18px_rgba(183,121,31,0.8)] transition"
                      : "cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-app-muted transition hover:bg-app-raised hover:text-app"
                  }
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setVisibility(option);
                    if (error) {
                      setError("");
                    }
                  }}
                >
                  {option === "private" ? "Private" : "Public"}
                </button>
              );
            })}
          </div>
          <p className="text-xs leading-5 text-app-muted">
            Private workspaces stay in your app. Public workspaces are intended for your future /u profile showcase.
          </p>
        </div>

        <div className="min-h-5 text-sm" aria-live="polite">
          {error ? <p className="text-rose-600 dark:text-rose-400">{error}</p> : null}
        </div>

        <button
          disabled={isSubmitting}
          className="h-11 w-full rounded-xl bg-app-primary text-[15px] font-semibold text-white shadow-[0_12px_30px_-16px_rgba(183,121,31,0.8)] transition-all hover:brightness-105 hover:shadow-[0_16px_36px_-18px_rgba(183,121,31,0.9)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklch,var(--primary),white_18%)] focus:ring-offset-2 focus:ring-offset-[var(--surface)]"
          type="submit"
        >
          {isSubmitting ? "Creating workspace..." : submitLabel}
        </button>
      </form>
    </>
  );
}
