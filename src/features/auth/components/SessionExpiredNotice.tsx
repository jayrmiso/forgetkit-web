"use client";

import { useEffect } from "react";

import { clearActiveWorkspaceId } from "@/features/workspace/workspaceSession";

import { clearAuthSession } from "../authSession";

export function SessionExpiredNotice() {
  useEffect(() => {
    clearAuthSession();
    clearActiveWorkspaceId();
  }, []);

  return (
    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm leading-6 text-app">
      <p className="font-semibold">Session expired</p>
      <p className="text-app-muted">Please sign in again to continue working in ForgetKit.</p>
    </div>
  );
}
