"use client";

import type { FormEvent } from "react";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";

const sharedFieldClassName =
  "h-11 rounded-xl border-app bg-app-surface px-3.5 text-[15px] shadow-[0_1px_0_rgba(15,23,42,0.02)] placeholder:text-app-muted/60 focus-visible:border-[color-mix(in_oklch,var(--primary),white_12%)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklch,var(--primary),white_16%)]";

export function RegisterForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const passwordsMatch = useMemo(() => {
    if (!password || !confirmPassword) {
      return true;
    }

    return password === confirmPassword;
  }, [confirmPassword, password]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
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

      <div className="min-h-5 text-sm text-rose-600 dark:text-rose-400" aria-live="polite">
        {error || (!passwordsMatch ? "Passwords do not match." : "")}
      </div>

      <button
        className="h-11 w-full rounded-xl bg-app-primary text-[15px] font-semibold text-white shadow-[0_12px_30px_-16px_rgba(183,121,31,0.8)] transition-all hover:brightness-105 hover:shadow-[0_16px_36px_-18px_rgba(183,121,31,0.9)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklch,var(--primary),white_18%)] focus:ring-offset-2 focus:ring-offset-[var(--surface)]"
        type="submit"
      >
        Create account
      </button>
    </form>
  );
}
