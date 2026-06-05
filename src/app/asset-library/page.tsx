import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
import { WorkspaceStateRow } from "@/features/workspace/components/WorkspaceStateRow";
import { WorkspaceStateSection } from "@/features/workspace/components/WorkspaceStateSection";
import { WorkspaceTable } from "@/features/workspace/components/WorkspaceTable";
import { assetRows } from "@/features/workspace/data/mockData";

export default function AssetLibraryPage() {
  return (
    <WorkspacePageFrame
      eyebrow="Asset library"
      title="Asset catalog with production metadata"
      description="Track collections, tags, statuses, and priority across pre-production visual assets."
      status="4 asset groups"
    >
      <WorkspaceStateSection title="Catalog readiness" description="How the asset library is currently staged for production review.">
        <WorkspaceStateRow label="Coverage" value="4 asset groups" detail="The catalog is small, but each group already carries review metadata." tone="positive" tag="Ready" />
        <WorkspaceStateRow label="Primary focus" value="Tags, collections, and priority" detail="These are the visible dimensions used to triage visual assets." tone="primary" tag="Indexed" />
      </WorkspaceStateSection>

      <WorkspaceStateSection title="Featured asset groups" description="The highest-signal asset groups for the current planning session.">
        {assetRows.slice(0, 3).map((asset) => (
          <WorkspaceStateRow
            key={asset.id}
            label={asset.name}
            value={`${asset.type} · ${asset.collection}`}
            detail={`Status ${asset.status} · Priority ${asset.priority}`}
            tone={asset.priority === "P1" ? "warning" : asset.priority === "P2" ? "primary" : "neutral"}
            tag={asset.tags.join(" · ")}
          />
        ))}
      </WorkspaceStateSection>

      <WorkspaceStateSection title="Library index" description="Static rows representing metadata-ready asset records.">
        <WorkspaceTable
          rows={assetRows}
          getRowKey={(row) => row.id}
          columns={[
            { key: "id", header: "ID" },
            { key: "name", header: "Name" },
            { key: "type", header: "Type" },
            { key: "collection", header: "Collection" },
            { key: "status", header: "Status" },
            { key: "tags", header: "Tags", render: (row) => row.tags.join(", ") },
            { key: "priority", header: "Priority" },
          ]}
        />
      </WorkspaceStateSection>
    </WorkspacePageFrame>
  );
}