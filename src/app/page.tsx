import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_SESSION_COOKIE, parseAuthSession } from "@/features/auth/authSession";
import { listWorkspaces, WorkspaceApiError } from "@/features/workspace/api/workspaceApi";
import { resolveWorkspaceBootstrap } from "@/features/workspace/api/workspaceBootstrap";
import { WorkspaceOnboardingForm } from "@/features/workspace/components/WorkspaceOnboardingForm";
import { ACTIVE_WORKSPACE_COOKIE } from "@/features/workspace/workspaceSession";
import { WorkspaceStateBanner } from "@/features/workspace/components/WorkspaceStateBanner";

export default async function HomePage() {
  const cookieStore = await cookies();
  const session = parseAuthSession(cookieStore.get(AUTH_SESSION_COOKIE)?.value);

  if (!session || !session.accessToken) {
    redirect("/login");
  }

  let workspaces;

  try {
    workspaces = await listWorkspaces(session.accessToken);
  } catch (error) {
    if (error instanceof WorkspaceApiError && error.status === 401) {
      redirect("/login");
    }

    throw error;
  }

  const preferredWorkspaceId = cookieStore.get(ACTIVE_WORKSPACE_COOKIE)?.value ?? null;
  const { redirectWorkspaceId } = resolveWorkspaceBootstrap(workspaces, preferredWorkspaceId);

  if (redirectWorkspaceId) {
    redirect(`/w/${redirectWorkspaceId}`);
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col justify-center px-4 py-10 text-app">
      <div className="space-y-6">
        <WorkspaceStateBanner
          eyebrow="Workspace onboarding"
          title="Create your first workspace"
          description="ForgetKit uses workspace-scoped URLs. Create a workspace to start organizing assets, narrative, review, and export state."
          status="No workspace detected"
        />

        <section className="rounded-2xl border border-app bg-app-surface p-6 shadow-sm">
          <div className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-app-muted">Setup</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-app">Workspace name</h2>
            <p className="mt-2 text-sm leading-6 text-app-muted">
              This name appears in the header selector and forms the root of the scoped workspace experience.
            </p>
          </div>

          <div className="mt-6 max-w-xl">
            <WorkspaceOnboardingForm accessToken={session.accessToken} />
          </div>
        </section>
      </div>
    </main>
  );
}

