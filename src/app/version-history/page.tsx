import { Chip } from "@heroui/react";

import { WorkspaceCard } from "@/features/workspace/components/WorkspaceCard";
import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
import { WorkspaceTable } from "@/features/workspace/components/WorkspaceTable";
import { versionRows } from "@/features/workspace/data/mockData";

export default function VersionHistoryPage() {
  return (
    <WorkspacePageFrame
      eyebrow="Version history"
      title="Release notes and rollback readiness"
      description="Review scoped changes, authorship, dates, and rollback availability across workspace history."
      status="4 recent versions"
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {versionRows.map((version) => (
          <WorkspaceCard key={version.version} title={version.version} description={version.scope}>
            <p className="text-sm text-app-muted">{version.change}</p>
            <div className="mt-4 flex items-center justify-between gap-2">
              <span className="text-xs text-app-muted">{version.date}</span>
              <Chip className="border border-app bg-app-raised text-app" size="sm" variant="soft">{version.rollback}</Chip>
            </div>
          </WorkspaceCard>
        ))}
      </section>

      <WorkspaceCard title="History Ledger" description="Static version ledger for planning and review.">
        <WorkspaceTable
          rows={versionRows}
          getRowKey={(row) => row.version}
          columns={[
            { key: "version", header: "Version" },
            { key: "scope", header: "Scope" },
            { key: "author", header: "Author" },
            { key: "date", header: "Date" },
            { key: "change", header: "Change" },
            { key: "rollback", header: "Rollback" },
          ]}
        />
      </WorkspaceCard>
    </WorkspacePageFrame>
  );
}
