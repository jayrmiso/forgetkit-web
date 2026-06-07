type PublicWorkspaceShellProps = Readonly<{
  username: string;
  workspaceSlug: string;
}>;

export function PublicWorkspaceShell({ username, workspaceSlug }: PublicWorkspaceShellProps) {
  return (
    <main className="min-h-dvh bg-app-bg px-4 py-10 text-app">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <section className="border-b border-app pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-app-primary">Public workspace</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-app">{workspaceSlug}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-app-muted">
            A read-only showcase route for @{username}. Public assets, documents, progress, and comments will live here once publishing is wired.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-5">
            <section className="border-b border-app pb-6">
              <p className="text-sm font-semibold text-app">Featured work</p>
              <p className="mt-2 text-sm leading-6 text-app-muted">
                Featured assets and documents will appear here. Items should only render when the workspace and item are public.
              </p>
            </section>

            <div className="grid gap-3 sm:grid-cols-2">
              {["Assets", "Documents", "Versions", "Notes"].map((label) => (
                <div key={label} className="rounded-3xl border border-dashed border-app bg-app-surface/70 p-5">
                  <p className="text-sm font-semibold text-app">{label}</p>
                  <p className="mt-2 text-xs leading-5 text-app-muted">Public {label.toLowerCase()} placeholder.</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-5 border-t border-app pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <div>
              <p className="text-sm font-semibold text-app">Workspace owner</p>
              <p className="mt-2 text-sm text-app-muted">@{username}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-app">Comments</p>
              <p className="mt-2 text-sm leading-6 text-app-muted">
                Comments should be logged-in only and owner-moderated when the backend comment model exists.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
