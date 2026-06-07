type PublicProfileShellProps = Readonly<{
  username: string;
}>;

export function PublicProfileShell({ username }: PublicProfileShellProps) {
  return (
    <main className="min-h-dvh bg-app-bg px-4 py-10 text-app">
      <div className="mx-auto w-full max-w-5xl space-y-10">
        <section className="border-b border-app pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-app-primary">Public profile</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-app">@{username}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-app-muted">
            This public profile will show published ForgetKit workspaces, featured game assets, documents, and project activity.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-[0.85fr_1.15fr]">
          <div className="border-b border-app pb-6 md:border-b-0 md:border-r md:pr-6">
            <p className="text-sm font-semibold text-app">Profile details</p>
            <dl className="mt-4 divide-y divide-app/70 text-sm">
              <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 py-3">
                <dt className="text-app-muted">Username</dt>
                <dd className="font-medium text-app">@{username}</dd>
              </div>
              <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 py-3">
                <dt className="text-app-muted">Visibility</dt>
                <dd className="text-app-muted">Public profile shell</dd>
              </div>
            </dl>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-app">Public workspaces</p>
              <p className="mt-1 text-sm leading-6 text-app-muted">
                Published workspaces will appear here once the public profile API is available.
              </p>
            </div>

            <div className="rounded-3xl border border-dashed border-app bg-app-surface/70 px-5 py-8 text-sm leading-6 text-app-muted">
              No public workspaces are loaded yet. The route exists so the profile/showcase model can be wired to backend visibility rules next.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
