import { Chip } from "@heroui/react";

import { WorkspaceCard } from "@/features/workspace/components/WorkspaceCard";
import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
import { WorkspaceTable } from "@/features/workspace/components/WorkspaceTable";
import { reviewRows } from "@/features/workspace/data/mockData";

export default function ReviewComparePage() {
  return (
    <WorkspacePageFrame
      eyebrow="Review & compare"
      title="Approval notes and candidate comparisons"
      description="Compare baselines against candidates with review verdicts and production notes."
      status="3 review lanes"
    >
      <section className="grid gap-4 lg:grid-cols-3">
        {reviewRows.map((review) => (
          <WorkspaceCard key={review.id} title={review.item} description={`${review.baseline} compared with ${review.candidate}`}>
            <Chip className="border border-app bg-app-warning/20 text-app-warning" size="sm" variant="soft">
              {review.verdict}
            </Chip>
            <p className="mt-4 text-sm leading-6 text-app-muted">{review.note}</p>
          </WorkspaceCard>
        ))}
      </section>

      <WorkspaceCard title="Comparison Queue" description="Static comparison rows with baseline, candidate, verdict, and notes.">
        <WorkspaceTable
          rows={reviewRows}
          getRowKey={(row) => row.id}
          columns={[
            { key: "id", header: "ID" },
            { key: "item", header: "Item" },
            { key: "baseline", header: "Baseline" },
            { key: "candidate", header: "Candidate" },
            { key: "verdict", header: "Verdict" },
            { key: "note", header: "Note" },
          ]}
        />
      </WorkspaceCard>
    </WorkspacePageFrame>
  );
}
