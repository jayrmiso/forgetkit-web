import { WorkspaceCard } from "@/features/workspace/components/WorkspaceCard";

type WorkspaceSettingsSectionContentProps = Readonly<{
  title: string;
  description: string;
  points: string[];
}>;

export function WorkspaceSettingsSectionContent({ title, description, points }: WorkspaceSettingsSectionContentProps) {
  return (
    <WorkspaceCard title={title} description={description}>
      <div className="space-y-3 text-sm leading-6 text-app-muted">
        <p>This section is a placeholder for the workspace-state work that comes later.</p>
        <div className="rounded-2xl border border-dashed border-app px-4 py-4">
          <p className="text-sm font-medium text-app">Planned settings</p>
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
