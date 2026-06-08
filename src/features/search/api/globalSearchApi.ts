import { z } from "zod";

const userSearchResultSchema = z.object({
  type: z.literal("user"),
  id: z.string(),
  username: z.string(),
  displayName: z.string().nullable(),
});

const workspaceSearchResultSchema = z.object({
  type: z.literal("workspace"),
  id: z.string(),
  name: z.string(),
  ownerUsername: z.string().nullable(),
  visibility: z.literal("public"),
});

const globalSearchResultSchema = z.discriminatedUnion("type", [userSearchResultSchema, workspaceSearchResultSchema]);

const globalSearchResponseSchema = z.object({
  data: z.object({
    results: z.array(globalSearchResultSchema),
  }),
});

const globalSearchInputSchema = z.object({
  query: z.string().trim().min(2).max(80),
  types: z.array(z.enum(["user", "workspace"])).default(["user", "workspace"]),
});

export type GlobalSearchResult = z.infer<typeof globalSearchResultSchema>;
export type GlobalSearchInput = z.infer<typeof globalSearchInputSchema>;

export class GlobalSearchApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "GlobalSearchApiError";
    this.status = status;
  }
}

function getApiBaseUrl() {
  return (process.env.NEXT_PUBLIC_FORGETKIT_API_URL ?? "http://localhost:3001").replace(/\/$/, "");
}

async function readJson(response: Response) {
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export async function searchGlobal(token: string, input: GlobalSearchInput, options?: Readonly<{ signal?: AbortSignal }>) {
  const parsedInput = globalSearchInputSchema.parse(input);
  const searchParams = new URLSearchParams({
    query: parsedInput.query,
    types: parsedInput.types.join(","),
  });

  const response = await fetch(`${getApiBaseUrl()}/v1/search?${searchParams.toString()}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    signal: options?.signal,
  });

  const payload = await readJson(response);

  if (!response.ok) {
    const error = payload?.error ?? {};
    throw new GlobalSearchApiError(response.status, error.message ?? "Search failed.");
  }

  const parsed = globalSearchResponseSchema.parse(payload);
  return parsed.data.results;
}
