import { Chip } from "@heroui/react";

import { WorkspaceCard } from "@/features/workspace/components/WorkspaceCard";
import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
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
      title="Project Eclipse preparation cockpit"
      description="A production workspace overview for generation, libraries, review, versioning, and integration readiness."
      status="Static planning data"
    >
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardKpis.map((card) => (
          <WorkspaceCard key={card.label}>
            <p className="text-sm text-app-muted">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-app">{card.value}</p>
            <p className="mt-3 text-xs leading-5 text-app-muted">{card.helper}</p>
            <div className={`mt-4 h-1.5 rounded-full ${card.tone === "positive" ? "bg-app-success" : card.tone === "warning" ? "bg-app-warning" : "bg-app-primary"}`} />
          </WorkspaceCard>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
        <WorkspaceCard title="Generation Workbench Modes" description="Prompt-to-image, variation, upscale, removal, spritesheet, icon set, and text generation.">
          <div className="grid gap-2 sm:grid-cols-2">
            {workbenchModes.map((mode) => (
              <div key={mode.name} className="rounded-xl border border-app bg-app-raised p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-app">{mode.name}</p>
                  <Chip className={toneClass[mode.tone]} size="sm" variant="soft">
                    {mode.status}
                  </Chip>
                </div>
                <p className="mt-2 text-xs text-app-muted">
                  {mode.queue} / {mode.output}
                </p>
              </div>
            ))}
          </div>
        </WorkspaceCard>

        <WorkspaceCard title="Active Filters" description="Current planning filters across libraries and review.">
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Chip key={filter} className="border border-app bg-app-raised text-app" size="sm" variant="soft">
                {filter}
              </Chip>
            ))}
          </div>
        </WorkspaceCard>
      </section>

      <WorkspaceCard title="Review, Compare, and Version Queue" description="Full-history workflow with notes, approval state, compare view, and rollback readiness.">
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
      </WorkspaceCard>
    </WorkspacePageFrame>
  );
}
