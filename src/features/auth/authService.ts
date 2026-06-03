type RegisterAccountInput = Readonly<{
  email: string;
  password: string;
}>;

type SupabaseSignupResponse = Readonly<{
  error_description?: string;
  msg?: string;
  message?: string;
  session?: unknown;
  user?: unknown;
}>;

function getSupabaseAuthConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing Supabase auth environment variables.");
  }

  return { url, anonKey };
}

async function parseResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text) as SupabaseSignupResponse;
  } catch {
    return {};
  }
}

export async function registerAccount({ email, password }: RegisterAccountInput) {
  const { url, anonKey } = getSupabaseAuthConfig();
  const response = await fetch(`${url}/auth/v1/signup`, {
    body: JSON.stringify({
      email,
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

  const payload = (await parseResponse(response)) as SupabaseSignupResponse;

  if (!response.ok) {
    throw new Error(payload.error_description ?? payload.msg ?? payload.message ?? "Unable to create account.");
  }

  return payload;
}
