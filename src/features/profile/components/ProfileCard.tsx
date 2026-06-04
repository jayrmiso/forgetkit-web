import type { AuthSession } from "@/features/auth/authSession";
import { WorkspaceCard } from "@/features/workspace/components/WorkspaceCard";
import { Chip } from "@heroui/react";

type ProfileCardProps = Readonly<{
  session: AuthSession;
}>;

function ProfileRow({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-app/70 py-3 last:border-b-0 last:pb-0 first:pt-0">
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-app-muted">{label}</dt>
      <dd className="max-w-[18rem] text-right text-sm font-medium text-app">{value}</dd>
    </div>
  );
}

function formatProfileValue(value: string | null) {
  return value?.trim() ? value : "Not set";
}

export function ProfileCard({ session }: ProfileCardProps) {
  const displayName = session.displayName ?? session.username ?? session.email.split("@")[0];

  return (
    <WorkspaceCard title="Current user" description="App-owned profile data linked to your signed-in session.">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-app bg-app-raised px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-app">{displayName}</p>
            <p className="text-xs text-app-muted">{session.email}</p>
          </div>
          <Chip className="border border-app bg-app-primary/15 text-app-primary" size="sm" variant="soft">
            Signed in
          </Chip>
        </div>

        <dl className="rounded-2xl border border-app bg-app-surface px-4">
          <ProfileRow label="Username" value={formatProfileValue(session.username)} />
          <ProfileRow label="Email" value={session.email} />
          <ProfileRow label="Display name" value={formatProfileValue(session.displayName)} />
        </dl>
      </div>
    </WorkspaceCard>
  );
}
