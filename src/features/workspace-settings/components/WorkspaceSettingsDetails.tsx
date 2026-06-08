import type { WorkspaceRecord } from "@/features/workspace/api/workspaceApi";
import { WorkspaceSettingsForm } from "./WorkspaceSettingsForm";

type WorkspaceSettingsDetailsProps = Readonly<{
  accessToken: string;
  workspace: WorkspaceRecord;
}>;

export function WorkspaceSettingsDetails({ accessToken, workspace }: WorkspaceSettingsDetailsProps) {
  return <WorkspaceSettingsForm accessToken={accessToken} workspace={workspace} />;
}
