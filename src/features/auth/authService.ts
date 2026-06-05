import { createAuthSession, type AuthSession } from "./authSession";

type SupabaseAuthConfig = Readonly<{
  url: string;
  anonKey: string;
}>;

export class AuthApiError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "AuthApiError";
    this.code = code;
  }
}

type SupabaseAuthResponse = Readonly<{
  error_description?: string;
  access_token?: string | null;
  msg?: string;
  message?: string;
  session?: Readonly<{
    access_token?: string | null;
    refresh_token?: string | null;
  }>;
  user?: Readonly<{
    email?: string | null;
    user_metadata?: Record<string, unknown> | null;
  }>;
}>;

type IdentifierResolution = Readonly<{
  email: string;
  username: string | null;
  verified: boolean;
}>;

type VerificationStatus = Readonly<{
  email: string;
  verified: boolean;
  verifiedAt: string | null;
}>;

type VerificationSendResult = Readonly<{
  email: string;
  sent: boolean;
}>;

type RegisterAccountInput = Readonly<{
  username: string;
  email: string;
  password: string;
}>;

type LoginAccountInput = Readonly<{
  identifier: string;
  password: string;
}>;

type LoginAccountResult = Readonly<{
  authSession: AuthSession;
  payload: SupabaseAuthResponse;
}>;

function getSupabaseAuthConfig(): SupabaseAuthConfig {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing Supabase auth environment variables.");
  }

  return { url, anonKey };
}

function getApiBaseUrl() {
  const url = process.env.NEXT_PUBLIC_FORGETKIT_API_URL;

  if (!url) {
    throw new Error("Missing ForgetKit API environment variables.");
  }

  return url.replace(/\/$/, "");
}

async function parseResponse<T>(response: Response) {
  const text = await response.text();

  if (!text) {
    return {} as T;
  }

  return JSON.parse(text) as T;
}

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const payload = await parseResponse<{
    data?: T;
    error?: { code?: string; message?: string };
  }>(response);

  if (!response.ok) {
    throw new AuthApiError(payload.error?.code ?? "REQUEST_FAILED", payload.error?.message ?? "Request failed.");
  }

  if (!payload.data) {
    throw new AuthApiError("INVALID_RESPONSE", "Invalid response from auth service.");
  }

  return payload.data;
}

function normalizeIdentifier(value: string) {
  return value.trim().toLowerCase();
}

function normalizeUsername(value: string) {
  return value.trim().toLowerCase();
}

function hasWhitespace(value: string) {
  return /\s/.test(value);
}

export async function resolveIdentifier(identifier: string) {
  const payload = await apiRequest<{ user: IdentifierResolution }>("/v1/auth/resolve-identifier", {
    body: JSON.stringify({ identifier: normalizeIdentifier(identifier) }),
    method: "POST",
  });

  return payload.user;
}

export async function getVerificationStatus(email: string) {
  const params = new URLSearchParams({ email: normalizeIdentifier(email) });
  const payload = await apiRequest<{ verification: VerificationStatus }>(`/v1/auth/verification-status?${params.toString()}`);
  return payload.verification;
}

export async function resendVerificationEmail(email: string) {
  const payload = await apiRequest<{ verification: VerificationSendResult }>("/v1/auth/resend-verification", {
    body: JSON.stringify({ email: normalizeIdentifier(email) }),
    method: "POST",
  });

  return payload.verification;
}

export async function registerAccount({ username, email, password }: RegisterAccountInput) {
  const normalizedUsername = normalizeUsername(username);

  if (!normalizedUsername) {
    throw new AuthApiError("USERNAME_REQUIRED", "Username is required.");
  }

  if (hasWhitespace(normalizedUsername)) {
    throw new AuthApiError("USERNAME_INVALID", "Username cannot contain spaces.");
  }

  try {
    await resolveIdentifier(normalizedUsername);
    throw new AuthApiError("USERNAME_TAKEN", "Username is already taken.");
  } catch (error) {
    if (error instanceof AuthApiError && error.code !== "NOT_FOUND") {
      throw error;
    }
  }

  const { url, anonKey } = getSupabaseAuthConfig();
  const response = await fetch(`${url}/auth/v1/signup`, {
    body: JSON.stringify({
      email: email.trim(),
      password,
      data: {
        username: normalizedUsername,
      },
    }),
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json",
      "X-Client-Info": "forgetkit-web",
    },
    method: "POST",
  });

  const payload = (await parseResponse<SupabaseAuthResponse>(response)) as SupabaseAuthResponse;

  if (!response.ok) {
    throw new AuthApiError(
      "REGISTER_FAILED",
      payload.error_description ?? payload.msg ?? payload.message ?? "Unable to create account.",
    );
  }

  return payload;
}

export async function loginWithIdentifier({ identifier, password }: LoginAccountInput) {
  const resolved = await resolveIdentifier(identifier);
  const verification = await getVerificationStatus(resolved.email);

  if (!verification.verified) {
    throw new AuthApiError("EMAIL_UNVERIFIED", "Please verify your email before signing in.");
  }

  const { url, anonKey } = getSupabaseAuthConfig();
  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    body: JSON.stringify({
      email: resolved.email,
      password,
    }),
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json",
      "X-Client-Info": "forgetkit-web",
    },
    method: "POST",
  });

  const payload = (await parseResponse<SupabaseAuthResponse>(response)) as SupabaseAuthResponse;

  if (!response.ok) {
    throw new AuthApiError("LOGIN_FAILED", payload.error_description ?? payload.msg ?? payload.message ?? "Unable to sign in.");
  }

  const username = resolved.username ?? (typeof payload.user?.user_metadata?.username === "string" ? payload.user.user_metadata.username : null);
  const displayName =
    typeof payload.user?.user_metadata?.display_name === "string"
      ? payload.user.user_metadata.display_name
      : typeof payload.user?.user_metadata?.full_name === "string"
        ? payload.user.user_metadata.full_name
        : null;

  return {
    authSession: createAuthSession({
      email: payload.user?.email ?? resolved.email,
      username,
      displayName,
      accessToken: payload.session?.access_token ?? payload.access_token ?? null,
    }),
    payload,
  } satisfies LoginAccountResult;
}
