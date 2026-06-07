import { AuthCard } from "./AuthCard";
import { LoginForm } from "./LoginForm";
import { AuthProviderButton } from "./AuthProviderButton";
import { AuthRouteSwitch } from "./AuthRouteSwitch";
import { SessionExpiredNotice } from "./SessionExpiredNotice";

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24">
      <path
        d="M21.35 11.1h-8.7v2.95h4.98c-.22 1.16-.9 2.14-1.93 2.8v2.33h3.12c1.82-1.67 2.86-4.13 2.86-7.04 0-.68-.06-1.19-.18-1.74Z"
        fill="#4285F4"
      />
      <path
        d="M12.65 22c2.48 0 4.57-.82 6.09-2.23l-3.12-2.33c-.86.58-1.96.92-2.97.92-2.28 0-4.2-1.53-4.89-3.58H4.53v2.4A9.99 9.99 0 0 0 12.65 22Z"
        fill="#34A853"
      />
      <path
        d="M7.76 14.78a5.95 5.95 0 0 1 0-3.56V8.82H4.53a9.99 9.99 0 0 0 0 8.36l3.23-2.4Z"
        fill="#FBBC05"
      />
      <path
        d="M12.65 5.12c1.35 0 2.57.47 3.53 1.39l2.64-2.64C17.2 2.32 15.11 1.4 12.65 1.4A9.99 9.99 0 0 0 4.53 8.82l3.23 2.4c.69-2.05 2.61-3.58 4.89-3.58Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.04 1.53 1.04.88 1.55 2.31 1.1 2.87.84.09-.66.35-1.1.63-1.35-2.22-.26-4.56-1.13-4.56-5.02 0-1.11.38-2.01 1.02-2.72-.1-.26-.44-1.3.1-2.71 0 0 .84-.27 2.75 1.04A9.3 9.3 0 0 1 12 6.89c.85 0 1.7.12 2.5.34 1.91-1.31 2.75-1.04 2.75-1.04.54 1.41.2 2.45.1 2.71.64.71 1.02 1.61 1.02 2.72 0 3.9-2.35 4.75-4.58 5 .36.32.68.96.68 1.94 0 1.4-.01 2.52-.01 2.86 0 .26.18.59.69.48A10.08 10.08 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

type LoginCardProps = Readonly<{
  initialIdentifier?: string;
  sessionExpired?: boolean;
  showRouteSwitch?: boolean;
}>;

export function LoginCard({ initialIdentifier = "", sessionExpired = false, showRouteSwitch = true }: LoginCardProps) {
  return (
    <AuthCard title="Sign in to ForgetKit" description="Use your username or email to get back into your workspace.">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <div className="space-y-5">
          {sessionExpired ? <SessionExpiredNotice /> : null}
          <LoginForm initialIdentifier={initialIdentifier} />
          {showRouteSwitch ? <AuthRouteSwitch href="/register" label="New here?" linkLabel="Create an account" /> : null}
        </div>

        <div className="space-y-4 border-l border-app/60 pl-6 lg:pl-8">
          <div className="space-y-1.5">
            <p className="text-sm font-semibold text-app">Use a provider</p>
            <p className="text-sm leading-6 text-app-muted">Jump in faster with a saved Google or GitHub account.</p>
          </div>

          <div className="space-y-3">
            <AuthProviderButton icon={<GoogleIcon />} label="Sign in with Google" />
            <AuthProviderButton icon={<GitHubIcon />} label="Sign in with GitHub" />
          </div>
        </div>
      </div>
    </AuthCard>
  );
}
