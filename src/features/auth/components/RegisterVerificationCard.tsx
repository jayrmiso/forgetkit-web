"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { AuthCard } from "./AuthCard";
import { AuthRouteSwitch } from "./AuthRouteSwitch";
import { getVerificationStatus, resendVerificationEmail } from "../authService";

type RegisterVerificationCardProps = Readonly<{
  email: string;
  username?: string | null;
}>;

export function RegisterVerificationCard({ email, username }: RegisterVerificationCardProps) {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isResending, setIsResending] = useState(false);

  async function handleCheckVerification() {
    setError("");
    setStatus("");
    setIsChecking(true);

    try {
      const verification = await getVerificationStatus(email);

      if (verification.verified) {
        router.replace(`/login?identifier=${encodeURIComponent(email)}`);
        router.refresh();
        return;
      }

      setStatus("Still waiting for confirmation. Check your inbox and spam folder.");
    } catch (checkError) {
      setError(checkError instanceof Error ? checkError.message : "Unable to check verification status.");
    } finally {
      setIsChecking(false);
    }
  }

  async function handleResendVerification() {
    setError("");
    setStatus("");
    setIsResending(true);

    try {
      await resendVerificationEmail(email);
      setStatus("Verification email sent again.");
    } catch (resendError) {
      setError(resendError instanceof Error ? resendError.message : "Unable to resend verification email.");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <AuthCard
      title="Check your email"
      description={`We sent a verification link to ${email}${username ? ` for @${username}` : ""}.`}
    >
      <div className="space-y-3">
        <button
          className="h-11 w-full rounded-xl bg-app-primary text-[15px] font-semibold text-white shadow-[0_12px_30px_-16px_rgba(183,121,31,0.8)] transition-all hover:brightness-105 hover:shadow-[0_16px_36px_-18px_rgba(183,121,31,0.9)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklch,var(--primary),white_18%)] focus:ring-offset-2 focus:ring-offset-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isChecking}
          type="button"
          onClick={handleCheckVerification}
        >
          {isChecking ? "Checking..." : "Check if verified"}
        </button>

        <button
          className="h-11 w-full rounded-xl border border-app bg-app-surface text-[15px] font-semibold text-app shadow-[0_8px_24px_-18px_rgba(15,23,42,0.24)] transition-all hover:border-[color-mix(in_oklch,var(--primary),white_24%)] hover:bg-app-raised focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklch,var(--primary),white_18%)] focus:ring-offset-2 focus:ring-offset-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isResending}
          type="button"
          onClick={handleResendVerification}
        >
          {isResending ? "Resending..." : "Resend email"}
        </button>
      </div>

      <div className="min-h-5 text-sm" aria-live="polite">
        {error ? <p className="text-rose-600 dark:text-rose-400">{error}</p> : status ? <p className="text-emerald-700 dark:text-emerald-400">{status}</p> : null}
      </div>

      <AuthRouteSwitch href="/login" label="Already verified?" linkLabel="Sign in" />
    </AuthCard>
  );
}
