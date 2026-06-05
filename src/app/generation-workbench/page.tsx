import { Chip } from "@heroui/react";

import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
import { WorkspaceStateRow } from "@/features/workspace/components/WorkspaceStateRow";
import { WorkspaceStateSection } from "@/features/workspace/components/WorkspaceStateSection";
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
      <WorkspaceStateSection title="Lane readiness" description="The current state of the generation lanes that matter most to the project.">
        {workbenchModes.map((mode) => (
          <WorkspaceStateRow
            key={mode.name}
            label={mode.name}
            value={mode.output}
            detail={`${mode.queue} · ${mode.status}`}
            tone={mode.tone === "positive" ? "positive" : mode.tone === "warning" ? "warning" : "neutral"}
            tag={mode.status}
          />
        ))}
      </WorkspaceStateSection>

      <WorkspaceStateSection title="Workbench queue" description="Items currently tied to generation or calibration work.">
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
      </WorkspaceStateSection>

      <WorkspaceStateSection title="Quick lane actions" description="Fast access to the most common workbench modes.">
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {workbenchModes.slice(0, 6).map((mode) => (
            <button
              key={mode.name}
              type="button"
              className="flex items-center justify-between gap-3 border-b border-app/60 py-3 text-left transition-colors duration-200 hover:bg-app-raised/50"
            >
              <span>
                <span className="block text-sm font-medium text-app">{mode.name}</span>
                <span className="mt-1 block text-xs text-app-muted">{mode.queue}</span>
              </span>
              <Chip className={toneClass[mode.tone]} size="sm" variant="soft">
                {mode.status}
              </Chip>
            </button>
          ))}
        </div>
      </WorkspaceStateSection>
    </WorkspacePageFrame>
  );
}