import { z } from "zod";

// Workspace ids are treated as opaque route-safe strings on the frontend.
// The canonical backend format can change without requiring UI changes here.
const workspaceIdSchema = z.string().trim().min(1);
const workspaceStatusSchema = z.enum(["draft", "active", "archived"]);
const engineTargetSchema = z.enum(["unknown", "godot"]);
const workspaceRoleSchema = z.enum(["owner", "member"]);

export const workspaceSchema = z.object({
  id: workspaceIdSchema,
  name: z.string(),
  status: workspaceStatusSchema,
  engineTarget: engineTargetSchema,
  activeMilestone: z.string().nullable(),
  role: workspaceRoleSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

const workspaceListResponseSchema = z.object({
  data: z.object({
    workspaces: z.array(workspaceSchema),
  }),
});

const workspaceResponseSchema = z.object({
  data: z.object({
    workspace: workspaceSchema,
  }),
});

const createWorkspaceBodySchema = z.object({
  name: z.string().trim().min(1).max(120),
  engineTarget: engineTargetSchema.default("unknown"),
});

export type WorkspaceRecord = z.infer<typeof workspaceSchema>;
export type CreateWorkspaceInput = z.infer<typeof createWorkspaceBodySchema>;

export class WorkspaceApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "WorkspaceApiError";
    this.status = status;
  }
}

function getApiBaseUrl() {
  const url = process.env.NEXT_PUBLIC_FORGETKIT_API_URL;

  if (!url) {
    throw new Error("Missing ForgetKit API environment variables.");
  }

  return url.replace(/\/$/, "");
}

async function readJson(response: Response) {
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

async function workspaceRequest<T>(token: string, path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    cache: "no-store",
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const payload = await readJson(response);

  if (!response.ok) {
    const error = payload?.error ?? {};
    throw new WorkspaceApiError(response.status, error.message ?? "Request failed.");
  }

  return payload as T;
}

export async function listWorkspaces(token: string) {
  const payload = await workspaceRequest<unknown>(token, "/v1/workspaces");
  const parsed = workspaceListResponseSchema.parse(payload);
  return parsed.data.workspaces;
}

export async function getWorkspace(token: string, workspaceId: string) {
  const payload = await workspaceRequest<unknown>(token, `/v1/workspaces/${workspaceId}`);
  const parsed = workspaceResponseSchema.parse(payload);
  return parsed.data.workspace;
}

export async function createWorkspace(token: string, input: CreateWorkspaceInput) {
  const parsedInput = createWorkspaceBodySchema.parse(input);
  const payload = await workspaceRequest<unknown>(token, "/v1/workspaces", {
    body: JSON.stringify(parsedInput),
    method: "POST",
  });
  const parsed = workspaceResponseSchema.parse(payload);
  return parsed.data.workspace;
}
