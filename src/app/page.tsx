import { Chip } from "@heroui/react";

import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
import { WorkspaceEmptyState } from "@/features/workspace/components/WorkspaceEmptyState";
import { WorkspaceStateRow } from "@/features/workspace/components/WorkspaceStateRow";
import { WorkspaceStateSection } from "@/features/workspace/components/WorkspaceStateSection";
import { WorkspaceTable } from "@/features/workspace/components/WorkspaceTable";
import { activeFilters, dashboardKpis, queueRows, workbenchModes } from "@/features/workspace/data/mockData";

const toneClass = {
  neutral: "border-app bg-app-raised text-app",
  positive: "border-app bg-app-success/20 text-app-success",
  warning: "border-app bg-app-warning/20 text-app-warning",
  danger: "border-app bg-app-danger/20 text-app-danger",
  primary: "border-app bg-app-primary/15 text-app-primary",
};

export default function DashboardPage() {
  return (
    <WorkspacePageFrame
      eyebrow="Workspace dashboard"
      title="Project Eclipse command center"
      description="Daily workspace state for project focus, tasks, blockers, recent assets, next milestone, and quick-generation actions."
      status="Static planning data"
    >
      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <WorkspaceStateSection
            title="Current project focus"
            description="Keep the top-level project state visible before diving into the current production lane."
          >
            <WorkspaceStateRow label="Active project" value="Project Eclipse" detail="The workspace is centered on one solo-dev game prototype." tone="primary" tag="On deck" />
            <WorkspaceStateRow label="Primary lane" value="Generation and review" detail="Visual assets, narrative beats, and version tracking are the current focus." tone="positive" tag="Ready" />
            <WorkspaceStateRow label="Style guardrails" value="Pixel-Mythic-v4" detail="Prompt preset, seed lock, and palette lock stay stable across sessions." tone="neutral" tag="Locked" />
          </WorkspaceStateSection>

          <WorkspaceStateSection title="Tasks" description="What needs attention in the current working session.">
            {queueRows.slice(0, 4).map((task) => (
              <WorkspaceStateRow
                key={task.id}
                label={task.item}
                value={`${task.lane} · ${task.status}`}
                detail={`Owner ${task.owner} · Updated ${task.updated}`}
                tone={task.priority === "P1" ? "warning" : task.priority === "P2" ? "primary" : "neutral"}
                tag={task.priority}
              />
            ))}
          </WorkspaceStateSection>

          <WorkspaceStateSection title="Recent assets" description="The latest state snapshot across library and review surfaces.">
            {dashboardKpis.map((card) => (
              <WorkspaceStateRow
                key={card.label}
                label={card.label}
                value={card.value}
                detail={card.helper}
                tone={card.tone === "positive" ? "positive" : card.tone === "warning" ? "warning" : "neutral"}
              />
            ))}
          </WorkspaceStateSection>
        </div>

        <div className="space-y-5">
          <WorkspaceStateSection title="Blockers" description="Any state that is currently holding the flow back.">
            <WorkspaceEmptyState
              title="No active blockers are currently escalated"
              description="The top-level review queue is stable. Keep an eye on spritesheet calibration and palette drift in the workbench."
            />
          </WorkspaceStateSection>

          <WorkspaceStateSection title="Next milestone" description="The next production checkpoint the workspace is oriented toward.">
            <WorkspaceStateRow label="Milestone" value="Godot-ready export handoff" detail="Validate metadata, export targets, and fallback naming for current assets." tone="primary" tag="Next" />
            <WorkspaceStateRow label="Success marker" value="All P1 assets queued" detail="The sprint should end with the highest-priority items reviewed or in flight." tone="positive" tag="Target" />
          </WorkspaceStateSection>

          <WorkspaceStateSection title="Quick-generate actions" description="High-frequency workbench lanes that should stay immediately visible.">
            <div className="space-y-2">
              {workbenchModes.slice(0, 4).map((mode) => (
                <button
                  key={mode.name}
                  type="button"
                  className="flex w-full items-center justify-between gap-4 border-b border-app/60 py-3 text-left transition-colors duration-200 hover:bg-app-raised/50"
                >
                  <span>
                    <span className="block text-sm font-medium text-app">{mode.name}</span>
                    <span className="mt-1 block text-xs text-app-muted">
                      {mode.queue} · {mode.output}
                    </span>
                  </span>
                  <Chip className={toneClass[mode.tone]} size="sm" variant="soft">
                    {mode.status}
                  </Chip>
                </button>
              ))}
            </div>
          </WorkspaceStateSection>
        </div>
      </section>

      <WorkspaceStateSection title="Workspace filters" description="The active planning filters that shape the queue and review surfaces.">
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Chip key={filter} className="border border-app bg-app-raised text-app" size="sm" variant="soft">
              {filter}
            </Chip>
          ))}
        </div>
      </WorkspaceStateSection>

      <WorkspaceStateSection title="Review, compare, and version queue" description="Approval states, candidate comparisons, and rollback readiness across the workspace history.">
        <WorkspaceTable
          rows={queueRows}
          getRowKey={(row) => row.id}
          columns={[
            { key: "id", header: "ID" },
            { key: "item", header: "Item" },
            { key: "lane", header: "Lane" },
            { key: "status", header: "Status" },
            { key: "owner", header: "Owner" },
            { key: "updated", header: "Updated" },
            { key: "priority", header: "Priority", render: (row) => <Chip className="border border-app bg-app-raised text-app" size="sm" variant="soft">{row.priority}</Chip> },
          ]}
        />
      </WorkspaceStateSection>
    </WorkspacePageFrame>
  );
}