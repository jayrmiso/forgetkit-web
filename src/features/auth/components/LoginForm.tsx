import type { FormEvent } from "react";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { loginWithIdentifier } from "../authService";

type LoginFormProps = Readonly<{
  initialIdentifier?: string;
}>;

export function LoginForm({ initialIdentifier = "" }: LoginFormProps) {
  const router = useRouter();
  const [identifier, setIdentifier] = useState(initialIdentifier);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await loginWithIdentifier({ identifier, password });
      router.replace("/");
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-app" htmlFor="identifier">
          Username or email
        </label>
        <Input
          id="identifier"
          name="identifier"
          autoComplete="username email"
          placeholder="username or email"
          type="text"
          className="h-11 rounded-xl border-app bg-app-surface px-3.5 text-[15px] shadow-[0_1px_0_rgba(15,23,42,0.02)] placeholder:text-app-muted/60 focus-visible:border-[color-mix(in_oklch,var(--primary),white_12%)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklch,var(--primary),white_16%)]"
          value={identifier}
          onChange={(event) => {
            setIdentifier(event.target.value);
            if (error) {
              setError("");
            }
          }}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-app" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          name="password"
          placeholder="Enter your password"
          type="password"
          className="h-11 rounded-xl border-app bg-app-surface px-3.5 text-[15px] shadow-[0_1px_0_rgba(15,23,42,0.02)] placeholder:text-app-muted/60 focus-visible:border-[color-mix(in_oklch,var(--primary),white_12%)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklch,var(--primary),white_16%)]"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            if (error) {
              setError("");
            }
          }}
          required
        />
      </div>

      <div className="min-h-5 text-sm" aria-live="polite">
        {error ? <p className="text-rose-600 dark:text-rose-400">{error}</p> : null}
      </div>

      <button
        disabled={isSubmitting}
        className="h-11 w-full rounded-xl bg-app-primary text-[15px] font-semibold text-white shadow-[0_12px_30px_-16px_rgba(183,121,31,0.8)] transition-all hover:brightness-105 hover:shadow-[0_16px_36px_-18px_rgba(183,121,31,0.9)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklch,var(--primary),white_18%)] focus:ring-offset-2 focus:ring-offset-[var(--surface)]"
        type="submit"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
