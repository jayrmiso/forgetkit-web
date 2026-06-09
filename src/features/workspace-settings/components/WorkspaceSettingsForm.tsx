"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { clearAuthSession, SESSION_EXPIRED_LOGIN_PATH } from "@/features/auth/authSession";
import { updateWorkspace, WorkspaceApiError, type WorkspaceRecord } from "@/features/workspace/api/workspaceApi";
import { clearActiveWorkspaceId } from "@/features/workspace/workspaceSession";

type WorkspaceSettingsFormProps = Readonly<{
  accessToken: string;
  workspace: WorkspaceRecord;
}>;

type CameraView = NonNullable<WorkspaceRecord["cameraView"]>;

type WorkspaceSettingsState = {
  gameTitle: string;
  genre: string;
  artDirection: string;
  targetResolution: string;
  defaultBiome: string;
  defaultStyle: string;
  currentFocus: string;
  nextMilestone: string;
  blockers: string;
  storageRootPath: string;
  godotProjectPath: string;
  namingConvention: string;
};

const cameraViewOptions: Array<Readonly<{ value: CameraView; label: string }>> = [
  { value: "unknown", label: "Unknown" },
  { value: "top_down", label: "Top down" },
  { value: "side_scroller", label: "Side scroller" },
  { value: "isometric", label: "Isometric" },
  { value: "first_person", label: "First person" },
  { value: "third_person", label: "Third person" },
];

function formatReadonlyValue(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "Not set";
}

function toFieldValue(value?: string | null) {
  return value ?? "";
}

function toNullableText(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
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

function Section({
  eyebrow,
  title,
  description,
  children,
}: Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}>) {
  return (
    <section className="border-b border-app pb-7">
      <div className="mb-4 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-app-primary">{eyebrow}</p>
        <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-app">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-app-muted">{description}</p>
      </div>
      <div className="divide-y divide-app/70">{children}</div>
    </section>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  required,
}: Readonly<{
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}>) {
  return (
    <div className="grid gap-2 border-b border-app/70 py-4 last:border-b-0 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6">
      <label className="text-sm font-medium text-app-muted" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="h-11 rounded-xl border border-app bg-app-surface px-3.5 text-sm text-app outline-none transition focus-visible:border-[color-mix(in_oklch,var(--primary),white_12%)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklch,var(--primary),white_16%)]"
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function TextAreaField({
  id,
  label,
  value,
  onChange,
}: Readonly<{
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}>) {
  return (
    <div className="grid gap-2 border-b border-app/70 py-4 last:border-b-0 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6">
      <label className="text-sm font-medium text-app-muted" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className="min-h-24 rounded-xl border border-app bg-app-surface px-3.5 py-3 text-sm leading-6 text-app outline-none transition focus-visible:border-[color-mix(in_oklch,var(--primary),white_12%)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklch,var(--primary),white_16%)]"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  options,
  onChange,
}: Readonly<{
  id: string;
  label: string;
  value: string;
  options: ReadonlyArray<Readonly<{ value: string; label: string }>>;
  onChange: (value: string) => void;
}>) {
  return (
    <div className="grid gap-2 border-b border-app/70 py-4 last:border-b-0 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6">
      <label className="text-sm font-medium text-app-muted" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="h-11 cursor-pointer rounded-xl border border-app bg-app-surface px-3.5 text-sm text-app outline-none transition focus-visible:border-[color-mix(in_oklch,var(--primary),white_12%)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklch,var(--primary),white_16%)]"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function WorkspaceSettingsForm({ accessToken, workspace }: WorkspaceSettingsFormProps) {
  const router = useRouter();
  const [name, setName] = useState(workspace.name);
  const [engineTarget, setEngineTarget] = useState<"unknown" | "godot">(workspace.engineTarget);
  const [cameraView, setCameraView] = useState<CameraView>(workspace.cameraView ?? "unknown");
  const [visibility, setVisibility] = useState<"private" | "unlisted" | "public">(workspace.visibility ?? "private");
  const [settings, setSettings] = useState<WorkspaceSettingsState>({
    gameTitle: toFieldValue(workspace.gameTitle),
    genre: toFieldValue(workspace.genre),
    artDirection: toFieldValue(workspace.artDirection),
    targetResolution: toFieldValue(workspace.targetResolution),
    defaultBiome: toFieldValue(workspace.defaultBiome),
    defaultStyle: toFieldValue(workspace.defaultStyle),
    currentFocus: toFieldValue(workspace.currentFocus),
    nextMilestone: toFieldValue(workspace.nextMilestone),
    blockers: toFieldValue(workspace.blockers),
    storageRootPath: toFieldValue(workspace.storageRootPath),
    godotProjectPath: toFieldValue(workspace.godotProjectPath),
    namingConvention: toFieldValue(workspace.namingConvention),
  });
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [error, setError] = useState("");

  function markDirty() {
    setStatus("idle");
    setShowSavedToast(false);
    if (error) setError("");
  }

  function updateSetting(key: keyof WorkspaceSettingsState, value: string) {
    setSettings((current) => ({ ...current, [key]: value }));
    markDirty();
  }

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
        cameraView,
        gameTitle: toNullableText(settings.gameTitle),
        genre: toNullableText(settings.genre),
        artDirection: toNullableText(settings.artDirection),
        targetResolution: toNullableText(settings.targetResolution),
        defaultBiome: toNullableText(settings.defaultBiome),
        defaultStyle: toNullableText(settings.defaultStyle),
        currentFocus: toNullableText(settings.currentFocus),
        nextMilestone: toNullableText(settings.nextMilestone),
        blockers: toNullableText(settings.blockers),
        storageRootPath: toNullableText(settings.storageRootPath),
        godotProjectPath: toNullableText(settings.godotProjectPath),
        namingConvention: toNullableText(settings.namingConvention),
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
      <Section eyebrow="Editable settings" title="Workspace identity" description="Name the workspace and describe the game being prepared.">
        <TextField
          id="workspace-settings-name"
          label="Workspace name"
          required
          value={name}
          onChange={(value) => {
            setName(value);
            markDirty();
          }}
        />
        <TextField id="workspace-settings-game-title" label="Game title" value={settings.gameTitle} onChange={(value) => updateSetting("gameTitle", value)} />
        <TextField id="workspace-settings-genre" label="Genre" value={settings.genre} onChange={(value) => updateSetting("genre", value)} />
        <SelectField
          id="workspace-settings-camera-view"
          label="Camera view"
          options={cameraViewOptions}
          value={cameraView}
          onChange={(value) => {
            setCameraView(value as CameraView);
            markDirty();
          }}
        />
      </Section>

      <Section eyebrow="Production defaults" title="Generation and asset defaults" description="Set defaults that future generation, asset, and export surfaces can reuse.">
        <SelectField
          id="workspace-settings-engine"
          label="Engine target"
          options={[
            { value: "godot", label: "Godot" },
            { value: "unknown", label: "Unknown" },
          ]}
          value={engineTarget}
          onChange={(value) => {
            setEngineTarget(value === "godot" ? "godot" : "unknown");
            markDirty();
          }}
        />
        <TextAreaField id="workspace-settings-art-direction" label="Art direction" value={settings.artDirection} onChange={(value) => updateSetting("artDirection", value)} />
        <TextField id="workspace-settings-target-resolution" label="Target resolution" value={settings.targetResolution} onChange={(value) => updateSetting("targetResolution", value)} />
        <TextField id="workspace-settings-default-biome" label="Default biome" value={settings.defaultBiome} onChange={(value) => updateSetting("defaultBiome", value)} />
        <TextField id="workspace-settings-default-style" label="Default style" value={settings.defaultStyle} onChange={(value) => updateSetting("defaultStyle", value)} />
      </Section>

      <Section eyebrow="Planning" title="Current production focus" description="Keep the workspace pointed at the next useful milestone.">
        <TextAreaField id="workspace-settings-current-focus" label="Current focus" value={settings.currentFocus} onChange={(value) => updateSetting("currentFocus", value)} />
        <TextAreaField id="workspace-settings-next-milestone" label="Next milestone" value={settings.nextMilestone} onChange={(value) => updateSetting("nextMilestone", value)} />
        <TextAreaField id="workspace-settings-blockers" label="Blockers" value={settings.blockers} onChange={(value) => updateSetting("blockers", value)} />
      </Section>

      <Section eyebrow="Paths and export" title="Storage and Godot readiness" description="Capture paths and naming rules before export workflows are wired.">
        <TextField id="workspace-settings-storage-root" label="Storage root path" value={settings.storageRootPath} onChange={(value) => updateSetting("storageRootPath", value)} />
        <TextField id="workspace-settings-godot-path" label="Godot project path" value={settings.godotProjectPath} onChange={(value) => updateSetting("godotProjectPath", value)} />
        <TextAreaField id="workspace-settings-naming" label="Naming convention" value={settings.namingConvention} onChange={(value) => updateSetting("namingConvention", value)} />
      </Section>

      <Section eyebrow="Publishing" title="Workspace visibility" description="Control whether this workspace can be discovered or opened from shared routes.">
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
                    markDirty();
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </Section>

      <section className="border-b border-app pb-7">
        <div className="mb-4 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-app-primary">Read-only</p>
          <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-app">System state</h2>
          <p className="mt-2 text-sm leading-6 text-app-muted">These fields are owned by workspace lifecycle and membership state.</p>
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
