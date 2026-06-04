import type { AuthSession } from "@/features/auth/authSession";
import { Chip } from "@heroui/react";

type ProfileHeaderProps = Readonly<{
  session: AuthSession;
}>;

function Avatar({ label }: Readonly<{ label: string }>) {
  return (
    <div className="flex size-14 items-center justify-center rounded-full border border-app bg-app-raised text-lg font-semibold text-app-primary">
      {label}
    </div>
  );
}

export function ProfileHeader({ session }: ProfileHeaderProps) {
  const displayName = session.displayName ?? session.username ?? session.email.split("@")[0];
  const initials = displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <section className="rounded-2xl border border-app bg-app-surface p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar label={initials || "FK"} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-app-muted">Personal account</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-app">{displayName}</h1>
            <p className="mt-1 text-sm text-app-muted">{session.email}</p>
          </div>
        </div>
        <Chip className="w-fit border border-app bg-app-primary/15 text-app-primary" size="sm" variant="soft">
          Signed in
        </Chip>
      </div>
    </section>
  );
}
