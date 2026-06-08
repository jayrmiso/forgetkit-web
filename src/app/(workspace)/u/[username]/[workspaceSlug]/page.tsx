import { PublicWorkspaceShell } from "@/features/public-profile/components/PublicWorkspaceShell";

type PublicWorkspacePageProps = Readonly<{
  params: Promise<{
    username: string;
    workspaceSlug: string;
  }>;
}>;

export default async function PublicWorkspacePage({ params }: PublicWorkspacePageProps) {
  const { username, workspaceSlug } = await params;

  return (
    <PublicWorkspaceShell
      username={decodeURIComponent(username)}
      workspaceSlug={decodeURIComponent(workspaceSlug)}
    />
  );
}
