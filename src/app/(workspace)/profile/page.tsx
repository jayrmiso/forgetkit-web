import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_SESSION_COOKIE, parseAuthSession } from "@/features/auth/authSession";
import { ProfileDetails } from "@/features/profile/components/ProfileDetails";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { ProfileNavigation } from "@/features/profile/components/ProfileNavigation";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const session = parseAuthSession(cookieStore.get(AUTH_SESSION_COOKIE)?.value);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="mx-auto w-full max-w-[1560px] px-3 py-5 md:px-4 lg:px-6">
      <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
        <ProfileNavigation />

        <div className="space-y-5">
          <ProfileHeader session={session} />
          <ProfileDetails session={session} />
        </div>
      </div>
    </main>
  );
}
