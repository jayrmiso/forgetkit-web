import { WorkspaceUnderDevelopment } from "@/features/workspace/components/WorkspaceUnderDevelopment";

export default function Page() {
  return (
    <WorkspaceUnderDevelopment
      title="Dashboard"
      description="This dashboard is under development. Complete workspace setup first so future assets, narrative, review, storage, and export panels have real project state to read from."
    />
  );
}
