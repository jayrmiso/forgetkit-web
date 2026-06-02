import { Chip } from "@heroui/react";

import { WorkspaceCard } from "@/features/workspace/components/WorkspaceCard";
import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
import { WorkspaceTable } from "@/features/workspace/components/WorkspaceTable";
import { queueRows, workbenchModes } from "@/features/workspace/data/mockData";

const toneClass = {
  neutral: "border-app bg-app-raised text-app",
  positive: "border-app bg-app-success/20 text-app-success",
  warning: "border-app bg-app-warning/20 text-app-warning",
  danger: "border-app bg-app-danger/20 text-app-danger",
  primary: "border-app bg-app-primary/15 text-app-primary",
};

export default function GenerationWorkbenchPage() {
  return (
    <WorkspacePageFrame
      eyebrow="Generation workbench"
      title="Plan every generation lane before production"
      description="Static workbench modes for visual, asset, and narrative generation without making model, backend, or storage calls."
      status="7 modes tracked"
    >
      <section className="grid gap-4 lg:grid-cols-3">
        {workbenchModes.map((mode) => (
          <WorkspaceCard key={mode.name} title={mode.name} description={mode.output}>
            <div className="flex items-center justify-between gap-3">
              <Chip className={toneClass[mode.tone]} size="sm" variant="soft">{mode.status}</Chip>
              <span className="text-sm font-medium text-app">{mode.queue}</span>
            </div>
            <div className="mt-4 rounded-xl border border-app bg-app-raised p-3 text-xs leading-5 text-app-muted">
              Route-owned planning card for queue health, mode status, and expected output handoff.
            </div>
          </WorkspaceCard>
        ))}
      </section>

      <WorkspaceCard title="Workbench Queue" description="Items currently tied to generation or calibration work.">
        <WorkspaceTable
          rows={queueRows.filter((row) => row.lane === "Generation Workbench" || row.status === "Calibrating")}
          getRowKey={(row) => row.id}
          columns={[
            { key: "id", header: "ID" },
            { key: "item", header: "Item" },
            { key: "status", header: "Status" },
            { key: "owner", header: "Owner" },
            { key: "priority", header: "Priority" },
          ]}
        />
      </WorkspaceCard>
    </WorkspacePageFrame>
  );
}
