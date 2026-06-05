import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
import { WorkspaceStateRow } from "@/features/workspace/components/WorkspaceStateRow";
import { WorkspaceStateSection } from "@/features/workspace/components/WorkspaceStateSection";
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
      <WorkspaceStateSection title="History state" description="How close the workspace is to a release or rollback decision.">
        <WorkspaceStateRow label="Rollback coverage" value="Available on most entries" detail="The history ledger keeps every generation path visible for later reversal." tone="positive" tag="Ready" />
        <WorkspaceStateRow label="Latest release" value="v0.8.4" detail="Most recent changes are tied to the asset library and review notes." tone="primary" tag="Current" />
      </WorkspaceStateSection>

      <WorkspaceStateSection title="Recent versions" description="The latest version entries in the planning ledger.">
        {versionRows.map((version) => (
          <WorkspaceStateRow
            key={version.version}
            label={version.version}
            value={version.scope}
            detail={`${version.change} · ${version.author} · ${version.date}`}
            tone={version.rollback === "Available" ? "positive" : "warning"}
            tag={version.rollback}
          />
        ))}
      </WorkspaceStateSection>

      <WorkspaceStateSection title="History ledger" description="Static version ledger for planning and review.">
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
      </WorkspaceStateSection>
    </WorkspacePageFrame>
  );
}