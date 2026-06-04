import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_SESSION_COOKIE, parseAuthSession } from "@/features/auth/authSession";
import { ProfileCard } from "@/features/profile/components/ProfileCard";
import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const session = parseAuthSession(cookieStore.get(AUTH_SESSION_COOKIE)?.value);

  if (!session) {
    redirect("/login");
  }

  return (
    <WorkspacePageFrame
      eyebrow="Profile"
      title="Personal account profile"
      description="App-owned identity data linked to your Supabase session."
      status="Read only"
    >
      <ProfileCard session={session} />
    </WorkspacePageFrame>
  );
}
