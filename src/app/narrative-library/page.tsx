import { Chip } from "@heroui/react";

import { WorkspaceCard } from "@/features/workspace/components/WorkspaceCard";
import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
import { WorkspaceTable } from "@/features/workspace/components/WorkspaceTable";
import { narrativeRows } from "@/features/workspace/data/mockData";

export default function NarrativeLibraryPage() {
  return (
    <WorkspacePageFrame
      eyebrow="Narrative library"
      title="Story, lore, and dialogue preparation"
      description="Organize narrative entries by arc, type, status, and coverage before game implementation."
      status="64 nodes indexed"
    >
      <section className="grid gap-4 lg:grid-cols-4">
        {narrativeRows.map((entry) => (
          <WorkspaceCard key={entry.id} title={entry.title} description={entry.arc}>
            <Chip className="border border-app bg-app-raised text-app" size="sm" variant="soft">{entry.type}</Chip>
            <p className="mt-4 text-sm text-app-muted">{entry.status} / {entry.coverage}</p>
          </WorkspaceCard>
        ))}
      </section>

      <WorkspaceCard title="Narrative Index" description="Static narrative library rows for content planning.">
        <WorkspaceTable
          rows={narrativeRows}
          getRowKey={(row) => row.id}
          columns={[
            { key: "id", header: "ID" },
            { key: "title", header: "Title" },
            { key: "type", header: "Type" },
            { key: "arc", header: "Arc" },
            { key: "status", header: "Status" },
            { key: "coverage", header: "Coverage" },
          ]}
        />
      </WorkspaceCard>
    </WorkspacePageFrame>
  );
}
