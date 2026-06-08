"use client";

import type { FormEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { clearAuthSession, SESSION_EXPIRED_LOGIN_PATH } from "@/features/auth/authSession";
import { updateWorkspace, WorkspaceApiError, type WorkspaceRecord } from "@/features/workspace/api/workspaceApi";
import { clearActiveWorkspaceId } from "@/features/workspace/workspaceSession";

type WorkspaceSettingsFormProps = Readonly<{
  accessToken: string;
  workspace: WorkspaceRecord;
}>;

function formatReadonlyValue(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "Not set";
}

function ReadonlyRow({ label, value }: Readonly<{ label: string; value?: string | null }>) {
  return (
    <div className="grid gap-2 border-b border-app/70 py-4 last:border-b-0 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6">
      <dt className="text-sm font-medium text-app-muted">{label}</dt>
      <dd className={formatReadonlyValue(value) === "Not set" ? "text-sm text-app-muted" : "text-sm font-medium text-app"}>
        {formatReadonlyValue(value)}
      </dd>
    </div>
  );
}

export function WorkspaceSettingsForm({ accessToken, workspace }: WorkspaceSettingsFormProps) {
  const router = useRouter();
  const [name, setName] = useState(workspace.name);
  const [engineTarget, setEngineTarget] = useState<"unknown" | "godot">(workspace.engineTarget);
  const [visibility, setVisibility] = useState<"private" | "unlisted" | "public">(workspace.visibility ?? "private");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!showSavedToast) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setShowSavedToast(false);
    }, 3200);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [showSavedToast]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("saving");

    try {
      await updateWorkspace(accessToken, workspace.id, {
        name,
        engineTarget,
        visibility,
      });
      setStatus("saved");
      setShowSavedToast(true);
      router.refresh();
    } catch (updateError) {
      if (updateError instanceof WorkspaceApiError && updateError.status === 401) {
        clearAuthSession();
        clearActiveWorkspaceId();
        router.replace(SESSION_EXPIRED_LOGIN_PATH);
        return;
      }

      setStatus("idle");
      setError(updateError instanceof Error ? updateError.message : "Unable to save workspace settings.");
    }
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <section className="border-b border-app pb-7">
        <div className="mb-4 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-app-primary">Editable settings</p>
          <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-app">Workspace identity</h2>
          <p className="mt-2 text-sm leading-6 text-app-muted">
            Edit the settings currently supported by the workspace API.
          </p>
        </div>

        <div className="divide-y divide-app/70">
          <div className="grid gap-2 border-b border-app/70 py-4 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6">
            <label className="text-sm font-medium text-app-muted" htmlFor="workspace-settings-name">
              Workspace name
            </label>
            <input
              id="workspace-settings-name"
              className="h-11 rounded-xl border border-app bg-app-surface px-3.5 text-sm text-app outline-none transition focus-visible:border-[color-mix(in_oklch,var(--primary),white_12%)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklch,var(--primary),white_16%)]"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setStatus("idle");
                setShowSavedToast(false);
                if (error) setError("");
              }}
              required
            />
          </div>

          <div className="grid gap-2 border-b border-app/70 py-4 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6">
            <label className="text-sm font-medium text-app-muted" htmlFor="workspace-settings-engine">
              Engine target
            </label>
            <select
              id="workspace-settings-engine"
              className="h-11 cursor-pointer rounded-xl border border-app bg-app-surface px-3.5 text-sm text-app outline-none transition focus-visible:border-[color-mix(in_oklch,var(--primary),white_12%)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklch,var(--primary),white_16%)]"
              value={engineTarget}
              onChange={(event) => {
                setEngineTarget(event.target.value === "godot" ? "godot" : "unknown");
                setStatus("idle");
                setShowSavedToast(false);
                if (error) setError("");
              }}
            >
              <option value="godot">Godot</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>

          <div className="grid gap-2 py-4 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6">
            <p className="text-sm font-medium text-app-muted">Visibility</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {(["private", "unlisted", "public"] as const).map((option) => {
                const selected = visibility === option;

                return (
                  <button
                    key={option}
                    aria-pressed={selected}
                    className={
                      selected
                        ? "cursor-pointer rounded-xl bg-app-primary px-3 py-2 text-sm font-semibold capitalize text-white shadow-[0_10px_24px_-18px_rgba(183,121,31,0.8)] transition"
                        : "cursor-pointer rounded-xl border border-app px-3 py-2 text-sm font-medium capitalize text-app-muted transition hover:bg-app-raised hover:text-app"
                    }
                    type="button"
                    onClick={() => {
                      setVisibility(option);
                      setStatus("idle");
                      setShowSavedToast(false);
                      if (error) setError("");
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-app pb-7">
        <div className="mb-4 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-app-primary">Read-only</p>
          <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-app">System state</h2>
          <p className="mt-2 text-sm leading-6 text-app-muted">
            These fields are returned by the API but are not editable in workspace settings yet.
          </p>
        </div>

        <dl className="divide-y divide-app/70">
          <ReadonlyRow label="Status" value={workspace.status} />
          <ReadonlyRow label="Active milestone" value={workspace.activeMilestone} />
          <ReadonlyRow label="Role" value={workspace.role} />
        </dl>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          className="h-11 cursor-pointer rounded-xl bg-app-primary px-5 text-sm font-semibold text-white shadow-[0_12px_30px_-16px_rgba(183,121,31,0.8)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={status === "saving"}
          type="submit"
        >
          {status === "saving" ? "Saving..." : "Save workspace settings"}
        </button>
        <div className="min-h-5 text-sm" aria-live="polite">
          {error ? <p className="text-rose-600 dark:text-rose-400">{error}</p> : null}
        </div>
      </div>

      {showSavedToast ? (
        <div
          className="fixed inset-x-0 bottom-24 z-[1100] flex justify-center px-4 sm:bottom-28 sm:justify-end sm:px-6 lg:px-8"
          role="status"
          aria-live="polite"
        >
          <div className="workspace-toast-enter flex w-full max-w-sm items-center gap-3 rounded-[1.35rem] border border-white/20 bg-slate-950/88 px-4 py-3.5 text-white shadow-[0_26px_80px_-28px_rgba(0,0,0,0.9)] ring-1 ring-black/10 backdrop-blur-2xl dark:border-white/15 dark:bg-slate-950/82">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-400 text-sm font-black text-slate-950 shadow-[0_0_0_5px_rgba(52,211,153,0.14)]">
              OK
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold tracking-[-0.02em]">Workspace settings saved</span>
              <span className="block truncate text-xs text-slate-300">Your workspace updates are active.</span>
            </span>
          </div>
        </div>
      ) : null}
    </form>
  );
}
