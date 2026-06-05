import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
import { WorkspaceStateRow } from "@/features/workspace/components/WorkspaceStateRow";
import { WorkspaceStateSection } from "@/features/workspace/components/WorkspaceStateSection";
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
      <WorkspaceStateSection title="Coverage state" description="What the narrative library is currently emphasizing.">
        <WorkspaceStateRow label="Arc coverage" value="Act II and Biome-02" detail="The currently planned arcs have the strongest signal." tone="positive" tag="Review" />
        <WorkspaceStateRow label="Entry mix" value="Dialogue, lore, bark sets, and item text" detail="The library includes both story and implementation-facing narrative assets." tone="primary" tag="Indexed" />
      </WorkspaceStateSection>

      <WorkspaceStateSection title="Featured narrative entries" description="The current batch of story and dialogue records in motion.">
        {narrativeRows.map((entry) => (
          <WorkspaceStateRow
            key={entry.id}
            label={entry.title}
            value={`${entry.type} · ${entry.arc}`}
            detail={`${entry.status} · ${entry.coverage}`}
            tone={entry.status === "Approved" ? "positive" : entry.status === "Draft" ? "primary" : "warning"}
            tag={entry.status}
          />
        ))}
      </WorkspaceStateSection>

      <WorkspaceStateSection title="Narrative index" description="Static narrative library rows for content planning.">
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
      </WorkspaceStateSection>
    </WorkspacePageFrame>
  );
}