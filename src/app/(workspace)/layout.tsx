import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_SESSION_COOKIE, parseAuthSession } from "@/features/auth/authSession";

type WorkspaceLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default async function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  const cookieStore = await cookies();
  const session = parseAuthSession(cookieStore.get(AUTH_SESSION_COOKIE)?.value);

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
