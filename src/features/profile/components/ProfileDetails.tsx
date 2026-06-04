import type { AuthSession } from "@/features/auth/authSession";
import { WorkspaceCard } from "@/features/workspace/components/WorkspaceCard";

type ProfileDetailsProps = Readonly<{
  session: AuthSession;
}>;

function DetailRow({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="grid gap-1 border-b border-app/70 py-4 last:border-b-0 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-6">
      <dt className="text-sm font-medium text-app-muted">{label}</dt>
      <dd className="text-sm text-app">{value}</dd>
    </div>
  );
}

function formatValue(value: string | null) {
  return value?.trim() ? value : "Not set";
}

export function ProfileDetails({ session }: ProfileDetailsProps) {
  const username = formatValue(session.username);
  const displayName = formatValue(session.displayName);

  return (
    <WorkspaceCard title="Public profile" description="Identity fields associated with this account.">
      <dl className="divide-y divide-app/70">
        <DetailRow label="Username" value={username} />
        <DetailRow label="Email" value={session.email} />
        <DetailRow label="Display name" value={displayName} />
      </dl>
    </WorkspaceCard>
  );
}
