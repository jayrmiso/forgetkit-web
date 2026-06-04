import { WorkspaceCard } from "@/features/workspace/components/WorkspaceCard";

type ProfileSectionContentProps = Readonly<{
  title: string;
  description: string;
  points: string[];
}>;

export function ProfileSectionContent({ title, description, points }: ProfileSectionContentProps) {
  return (
    <WorkspaceCard title={title} description={description}>
      <div className="space-y-3 text-sm leading-6 text-app-muted">
        <p>This section is intentionally scoped as read-only while profile editing is still future work.</p>
        <div className="rounded-2xl border border-dashed border-app px-4 py-4">
          <p className="text-sm font-medium text-app">What this section will contain</p>
          <ul className="mt-3 space-y-2">
            {points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </WorkspaceCard>
  );
}
