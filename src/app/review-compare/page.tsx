import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
import { WorkspaceStateRow } from "@/features/workspace/components/WorkspaceStateRow";
import { WorkspaceStateSection } from "@/features/workspace/components/WorkspaceStateSection";
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
      <WorkspaceStateSection title="Review state" description="The current health of comparison and approval work.">
        <WorkspaceStateRow label="Approval flow" value="Active" detail="The review queue is collecting candidate notes and rollback judgment." tone="warning" tag="Needs notes" />
        <WorkspaceStateRow label="Candidate state" value="3 lanes in motion" detail="Each comparison is tracked with baseline, candidate, verdict, and notes." tone="primary" tag="Ready" />
      </WorkspaceStateSection>

      <WorkspaceStateSection title="Comparison lanes" description="The strongest signals currently moving through review.">
        {reviewRows.map((review) => (
          <WorkspaceStateRow
            key={review.id}
            label={review.item}
            value={`${review.baseline} → ${review.candidate}`}
            detail={review.note}
            tone={review.verdict === "Approved" ? "positive" : review.verdict === "Rollback candidate" ? "danger" : "warning"}
            tag={review.verdict}
          />
        ))}
      </WorkspaceStateSection>

      <WorkspaceStateSection title="Comparison queue" description="Static comparison rows with baseline, candidate, verdict, and notes.">
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
      </WorkspaceStateSection>
    </WorkspacePageFrame>
  );
}