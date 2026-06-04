import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { AUTH_SESSION_COOKIE, parseAuthSession } from "@/features/auth/authSession";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { ProfileNavigation } from "@/features/profile/components/ProfileNavigation";
import { ProfileSectionContent } from "@/features/profile/components/ProfileSectionContent";

type ProfileSectionPageProps = Readonly<{
  params: Promise<{
    section: string;
  }>;
}>;

const profileSections: Record<string, { title: string; description: string; points: string[] }> = {
  account: {
    title: "Account",
    description: "Identity and authentication settings for the current account.",
    points: ["Email and login identity", "Username and display name", "Password and security state"],
  },
  appearance: {
    title: "Appearance",
    description: "Visual preferences for profile and workspace surfaces.",
    points: ["Theme preference", "Density and contrast", "Editor-friendly display settings"],
  },
  accessibility: {
    title: "Accessibility",
    description: "Readability and interaction preferences for the workspace.",
    points: ["Keyboard focus behavior", "Motion reduction", "Contrast and text legibility"],
  },
  notifications: {
    title: "Notifications",
    description: "User-level updates and workspace alert preferences.",
    points: ["Email notifications", "In-app alerts", "Review and update reminders"],
  },
};

export default async function ProfileSectionPage({ params }: ProfileSectionPageProps) {
  const cookieStore = await cookies();
  const session = parseAuthSession(cookieStore.get(AUTH_SESSION_COOKIE)?.value);

  if (!session) {
    redirect("/login");
  }

  const resolvedParams = await params;
  const section = profileSections[resolvedParams.section];

  if (!section) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-[1560px] px-3 py-5 md:px-4 lg:px-6">
      <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
        <ProfileNavigation />

        <div className="space-y-5">
          <ProfileHeader session={session} />
          <ProfileSectionContent title={section.title} description={section.description} points={section.points} />
        </div>
      </div>
    </main>
  );
}
