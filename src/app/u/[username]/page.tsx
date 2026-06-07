import { PublicProfileShell } from "@/features/public-profile/components/PublicProfileShell";

type PublicProfilePageProps = Readonly<{
  params: Promise<{
    username: string;
  }>;
}>;

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { username } = await params;

  return <PublicProfileShell username={decodeURIComponent(username)} />;
}
