import { Card, Chip } from "@heroui/react";
import { DashboardContextPanel } from "./components/DashboardContextPanel";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardKpiGrid } from "./components/DashboardKpiGrid";
import { DashboardQueueTable } from "./components/DashboardQueueTable";
import { DashboardSidebar } from "./components/DashboardSidebar";

type DashboardShellProps = {
  title?: string;
};

const sidebarCoreItems = [
  { label: "Dashboard", isActive: true },
  { label: "Generation Workbench", isSoon: true },
  { label: "Asset Library", isSoon: true },
  { label: "Narrative Library", isSoon: true },
  { label: "Review & Compare", isSoon: true },
  { label: "Version History", isSoon: true },
];

const sidebarIntegrationItems = [
  { label: "Supabase Storage", isSoon: true },
  { label: "Godot Export Readiness", isSoon: true },
  { label: "Aseprite Integration", isSoon: true },
  { label: "Consistency Controls", isSoon: true },
];

const kpiCards = [
  { label: "Active Jobs", value: "148", status: "Synced" },
  { label: "Asset Readiness", value: "82%", status: "Healthy" },
  { label: "Narrative Coverage", value: "64", status: "Stable" },
  { label: "Review Rollbacks", value: "5", status: "Watch" },
];

const generationModes = [
  { label: "Prompt-to-image", status: "Ready" },
  { label: "Variation generation", status: "Ready" },
  { label: "Upscale", status: "Ready" },
  { label: "Background removal", status: "Ready" },
  { label: "Spritesheet generation", status: "Calibrating" },
  { label: "Icon set generation", status: "Calibrating" },
  { label: "Lore and dialogue text", status: "Ready" },
];

const queueRows = [
  { id: "FK-401", item: "Forest ruins prop icon set", lane: "Asset Library", status: "Review", owner: "Kai" },
  { id: "FK-407", item: "Companion arc dialogue branch", lane: "Narrative Library", status: "Draft", owner: "Mina" },
  { id: "FK-413", item: "Dungeon spritesheet batch B", lane: "Generation Workbench", status: "Calibrating", owner: "Len" },
];

export function DashboardShell({ title = "ForgetKit Dashboard" }: DashboardShellProps) {
  return (
    <main className="min-h-screen bg-app-bg text-app">
      <div className="mx-auto flex w-full max-w-[1880px] flex-col p-2 pb-20 md:p-3 md:pb-24">
        <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
          <div className="space-y-3 pt-16">
            <DashboardHeader title={title} />
            <DashboardKpiGrid cards={kpiCards} />

            <section className="grid gap-4">
              <Card className="rounded-2xl border border-app bg-app-surface shadow-sm">
                <div className="px-4 pt-4">
                  <p className="text-sm font-medium text-app">Generation Workbench Modes</p>
                </div>
                <div className="grid gap-2 p-4 sm:grid-cols-2">
                  {generationModes.map((mode) => (
                    <div
                      key={mode.label}
                      className="flex items-center justify-between rounded-xl border border-app bg-app-raised px-3 py-2"
                    >
                      <p className="text-sm text-app">{mode.label}</p>
                      <Chip
                        className={
                          mode.status === "Ready"
                            ? "border border-app bg-app-success/20 text-app-success"
                            : "border border-app bg-app-warning/20 text-app-warning"
                        }
                        size="sm"
                        variant="soft"
                      >
                        {mode.status}
                      </Chip>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            <DashboardQueueTable rows={queueRows} />
          </div>

          <DashboardContextPanel />
        </div>
        <DashboardSidebar coreItems={sidebarCoreItems} integrationItems={sidebarIntegrationItems} />
      </div>
    </main>
  );
}
