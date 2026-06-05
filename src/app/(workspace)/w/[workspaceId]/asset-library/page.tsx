import { Chip } from "@heroui/react";

import { WorkspaceCard } from "@/features/workspace/components/WorkspaceCard";
import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
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
      <section className="grid gap-4 md:grid-cols-3">
        {assetRows.slice(0, 3).map((asset) => (
          <WorkspaceCard key={asset.id} title={asset.name} description={`${asset.type} / ${asset.collection}`}>
            <div className="flex flex-wrap gap-2">
              {asset.tags.map((tag) => (
                <Chip key={tag} className="border border-app bg-app-raised text-app" size="sm" variant="soft">
                  {tag}
                </Chip>
              ))}
            </div>
            <p className="mt-4 text-sm text-app-muted">
              {asset.status} / {asset.priority}
            </p>
          </WorkspaceCard>
        ))}
      </section>

      <WorkspaceCard title="Library Index" description="Static rows representing metadata-ready asset records.">
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
      </WorkspaceCard>
    </WorkspacePageFrame>
  );
}
