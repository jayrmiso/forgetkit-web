"use client";

import type { FormEvent } from "react";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { registerAccount } from "../authService";

const sharedFieldClassName =
  "h-11 rounded-xl border-app bg-app-surface px-3.5 text-[15px] shadow-[0_1px_0_rgba(15,23,42,0.02)] placeholder:text-app-muted/60 focus-visible:border-[color-mix(in_oklch,var(--primary),white_12%)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklch,var(--primary),white_16%)]";

export function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordsMatch = useMemo(() => {
    if (!password || !confirmPassword) {
      return true;
    }

    return password === confirmPassword;
  }, [confirmPassword, password]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = await registerAccount({ email, password });

      if (payload.session) {
        router.replace("/");
        router.refresh();
        return;
      }

      setSuccess("Check your email to confirm your account.");
    } catch (registerError) {
      setError(registerError instanceof Error ? registerError.message : "Unable to create account.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-app" htmlFor="register-email">
          Email
        </label>
        <Input
          id="register-email"
          name="email"
          autoComplete="email"
          placeholder="kai@studio.dev"
          type="email"
          className={sharedFieldClassName}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) {
              setError("");
            }
            if (success) {
              setSuccess("");
            }
          }}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-app" htmlFor="register-password">
          Password
        </label>
        <Input
          id="register-password"
          name="password"
          autoComplete="new-password"
          placeholder="Create a password"
          type="password"
          className={sharedFieldClassName}
          minLength={8}
          onChange={(event) => {
            setPassword(event.target.value);
            if (error) {
              setError("");
            }
          }}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-app" htmlFor="register-confirm-password">
          Confirm password
        </label>
        <Input
          id="register-confirm-password"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Repeat your password"
          type="password"
          className={sharedFieldClassName}
          minLength={8}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
            if (error) {
              setError("");
            }
          }}
          required
        />
      </div>

      <div className="min-h-5 text-sm" aria-live="polite">
        {error ? (
          <p className="text-rose-600 dark:text-rose-400">{error}</p>
        ) : success ? (
          <p className="text-emerald-700 dark:text-emerald-400">{success}</p>
        ) : !passwordsMatch ? (
          <p className="text-rose-600 dark:text-rose-400">Passwords do not match.</p>
        ) : null}
      </div>

      <button
        disabled={isSubmitting}
        className="h-11 w-full rounded-xl bg-app-primary text-[15px] font-semibold text-white shadow-[0_12px_30px_-16px_rgba(183,121,31,0.8)] transition-all hover:brightness-105 hover:shadow-[0_16px_36px_-18px_rgba(183,121,31,0.9)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklch,var(--primary),white_18%)] focus:ring-offset-2 focus:ring-offset-[var(--surface)]"
        type="submit"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
