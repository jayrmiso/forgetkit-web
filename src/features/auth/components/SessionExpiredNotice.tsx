"use client";

import { useEffect } from "react";

import { clearActiveWorkspaceId } from "@/features/workspace/workspaceSession";

import { clearAuthSession } from "../authSession";

type AuthStatusNoticeProps = Readonly<{
  reason: "session-expired" | "signed-out";
}>;

const noticeCopy = {
  "session-expired": {
    title: "Session expired",
    description: "Please sign in again to continue working in ForgetKit.",
  },
  "signed-out": {
    title: "Signed out",
    description: "You have been signed out. Sign in again when you are ready to continue.",
  },
} satisfies Record<AuthStatusNoticeProps["reason"], { title: string; description: string }>;

export function SessionExpiredNotice({ reason }: AuthStatusNoticeProps) {
  const copy = noticeCopy[reason];

  useEffect(() => {
    clearAuthSession();
    clearActiveWorkspaceId();
  }, []);

  return (
    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm leading-6 text-app">
      <p className="font-semibold">{copy.title}</p>
      <p className="text-app-muted">{copy.description}</p>
    </div>
  );
}
