import { WorkspaceCreateForm } from "./WorkspaceCreateForm";

type WorkspaceOnboardingFormProps = Readonly<{
  accessToken: string;
}>;

export function WorkspaceOnboardingForm({ accessToken }: WorkspaceOnboardingFormProps) {
  return <WorkspaceCreateForm accessToken={accessToken} submitLabel="Create workspace" />;
}
