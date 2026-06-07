export type AuthSession = Readonly<{
  email: string;
  username: string | null;
  displayName: string | null;
  accessToken: string | null;
}>;

export const AUTH_SESSION_COOKIE = "forgetkit-auth-session";
export const SESSION_EXPIRED_LOGIN_PATH = "/login?reason=session-expired";

const AUTH_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function normalizeOptionalText(value: string | null | undefined) {
  const trimmed = value?.trim() ?? "";
  return trimmed ? trimmed : null;
}

export function createAuthSession({
  email,
  username,
  displayName,
  accessToken,
}: Readonly<{
  email: string;
  username?: string | null;
  displayName?: string | null;
  accessToken?: string | null;
}>): AuthSession {
  return {
    email: email.trim().toLowerCase(),
    username: normalizeOptionalText(username)?.toLowerCase() ?? null,
    displayName: normalizeOptionalText(displayName),
    accessToken: normalizeOptionalText(accessToken),
  };
}

export function serializeAuthSession(session: AuthSession) {
  return encodeURIComponent(JSON.stringify(session));
}

export function parseAuthSession(value: string | undefined | null): AuthSession | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as Partial<AuthSession>;

    if (!parsed.email) {
      return null;
    }

    return createAuthSession({
      email: parsed.email,
      username: parsed.username,
      displayName: parsed.displayName,
      accessToken: parsed.accessToken,
    });
  } catch {
    return null;
  }
}

export function persistAuthSession(session: AuthSession) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${AUTH_SESSION_COOKIE}=${serializeAuthSession(session)}; path=/; max-age=${AUTH_SESSION_MAX_AGE}; samesite=lax`;
}

export function clearAuthSession() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${AUTH_SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
}
