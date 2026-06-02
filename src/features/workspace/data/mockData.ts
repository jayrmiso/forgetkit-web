export type KpiCard = {
  label: string;
  value: string;
  helper: string;
  tone: "neutral" | "positive" | "warning" | "danger";
};

export type StatusTone = "neutral" | "positive" | "warning" | "danger" | "primary";

export type WorkbenchMode = {
  name: string;
  status: string;
  tone: StatusTone;
  queue: string;
  output: string;
};

export type QueueRow = {
  id: string;
  item: string;
  lane: string;
  status: string;
  owner: string;
  updated: string;
  priority: "P1" | "P2" | "P3";
};

export type AssetRow = {
  id: string;
  name: string;
  type: string;
  collection: string;
  status: string;
  tags: string[];
  priority: "P1" | "P2" | "P3";
};

export type NarrativeRow = {
  id: string;
  title: string;
  type: string;
  arc: string;
  status: string;
  coverage: string;
};

export type ReviewRow = {
  id: string;
  item: string;
  baseline: string;
  candidate: string;
  verdict: string;
  note: string;
};

export type VersionRow = {
  version: string;
  scope: string;
  author: string;
  date: string;
  change: string;
  rollback: string;
};

export type IntegrationCheck = {
  label: string;
  state: string;
  tone: StatusTone;
  detail: string;
};

export type ConsistencyControl = {
  label: string;
  value: string;
  state: string;
  detail: string;
};

export const dashboardKpis: KpiCard[] = [
  { label: "Generation Jobs", value: "148", helper: "Prompt, variation, upscale, removal, and text jobs", tone: "neutral" },
  { label: "Asset Readiness", value: "82%", helper: "Godot-compatible formats validated", tone: "positive" },
  { label: "Narrative Coverage", value: "64", helper: "Stories and dialogue nodes indexed", tone: "neutral" },
  { label: "Review Rollbacks", value: "5", helper: "Rollback candidates in current sprint", tone: "warning" },
];

export const workbenchModes: WorkbenchMode[] = [
  { name: "Prompt-to-image", status: "Ready", tone: "positive", queue: "34 queued", output: "Concept frames" },
  { name: "Variation generation", status: "Ready", tone: "positive", queue: "22 queued", output: "Exploration sets" },
  { name: "Upscale", status: "Ready", tone: "positive", queue: "16 queued", output: "2x and 4x assets" },
  { name: "Background removal", status: "Ready", tone: "positive", queue: "9 queued", output: "Transparent props" },
  { name: "Spritesheet generation", status: "Calibrating", tone: "warning", queue: "11 queued", output: "8-direction sheets" },
  { name: "Icon set generation", status: "Calibrating", tone: "warning", queue: "7 queued", output: "Inventory icons" },
  { name: "Lore and dialogue text", status: "Ready", tone: "positive", queue: "49 queued", output: "Narrative drafts" },
];

export const queueRows: QueueRow[] = [
  { id: "FK-401", item: "Forest ruins prop icon set", lane: "Asset Library", status: "Review", owner: "Kai", updated: "May 29", priority: "P1" },
  { id: "FK-407", item: "Companion arc dialogue branch", lane: "Narrative Library", status: "Draft", owner: "Mina", updated: "May 29", priority: "P2" },
  { id: "FK-413", item: "Dungeon spritesheet batch B", lane: "Generation Workbench", status: "Calibrating", owner: "Len", updated: "May 28", priority: "P1" },
  { id: "FK-416", item: "HUD item lore microcopy", lane: "Narrative Library", status: "Approved", owner: "Ava", updated: "May 28", priority: "P3" },
  { id: "FK-422", item: "Boss portrait upscale set", lane: "Review & Compare", status: "Rollback candidate", owner: "Noel", updated: "May 27", priority: "P2" },
];

export const assetRows: AssetRow[] = [
  { id: "AST-112", name: "Forest ruins props", type: "Icon set", collection: "Biome-02", status: "Review", tags: ["foliage", "ruins"], priority: "P1" },
  { id: "AST-118", name: "Dungeon batch B", type: "Spritesheet", collection: "Dungeon", status: "Calibrating", tags: ["enemy", "8-dir"], priority: "P1" },
  { id: "AST-121", name: "Boss portrait set", type: "Portrait", collection: "Characters", status: "Compare", tags: ["boss", "upscale"], priority: "P2" },
  { id: "AST-127", name: "HUD item icons", type: "UI assets", collection: "Interface", status: "Approved", tags: ["hud", "items"], priority: "P3" },
];

export const narrativeRows: NarrativeRow[] = [
  { id: "NAR-064", title: "Companion oath branch", type: "Dialogue", arc: "Act II", status: "Draft", coverage: "18 nodes" },
  { id: "NAR-071", title: "Ruins discovery lore", type: "Lore", arc: "Biome-02", status: "Review", coverage: "9 cards" },
  { id: "NAR-083", title: "Boss defeat variants", type: "Bark set", arc: "Dungeon", status: "Approved", coverage: "24 lines" },
  { id: "NAR-092", title: "HUD item microcopy", type: "Item text", arc: "Interface", status: "Approved", coverage: "31 entries" },
];

export const reviewRows: ReviewRow[] = [
  { id: "REV-204", item: "Boss portrait upscale", baseline: "v1.8", candidate: "v1.9", verdict: "Rollback candidate", note: "Sharper edges but weaker palette discipline" },
  { id: "REV-209", item: "Forest prop icons", baseline: "v0.6", candidate: "v0.7", verdict: "Needs notes", note: "Silhouette set is consistent; moss values drift" },
  { id: "REV-211", item: "Companion oath branch", baseline: "draft 2", candidate: "draft 3", verdict: "Approved", note: "Branch labels now align with quest state" },
];

export const versionRows: VersionRow[] = [
  { version: "v0.8.4", scope: "Asset library", author: "Kai", date: "May 29", change: "Added Biome-02 icon review notes", rollback: "Available" },
  { version: "v0.8.3", scope: "Narrative", author: "Mina", date: "May 28", change: "Linked companion oath branch to quest states", rollback: "Available" },
  { version: "v0.8.2", scope: "Workbench", author: "Len", date: "May 27", change: "Calibrated dungeon spritesheet batch prompts", rollback: "Locked" },
  { version: "v0.8.1", scope: "Integrations", author: "Ava", date: "May 26", change: "Updated Godot export metadata checklist", rollback: "Available" },
];

export const supabaseStorageChecks: IntegrationCheck[] = [
  { label: "Bucket structure", state: "Planned", tone: "primary", detail: "Assets, narrative exports, and review artifacts are separated by workspace scope" },
  { label: "Metadata mapping", state: "Ready", tone: "positive", detail: "Static schema plan covers collection, tags, owner, status, and version pointers" },
  { label: "Binary handoff", state: "Pending", tone: "warning", detail: "No client or backend calls are wired in this frontend-only route" },
];

export const godotExportChecks: IntegrationCheck[] = [
  { label: "Texture formats", state: "Ready", tone: "positive", detail: "PNG, atlas, and icon exports include target resolution notes" },
  { label: "Scene metadata", state: "Mapped", tone: "primary", detail: "Collections can describe intended Godot scene usage before export" },
  { label: "Blocking issues", state: "2 open", tone: "warning", detail: "Spritesheet batch B still needs frame timing and slice validation" },
];

export const asepriteChecks: IntegrationCheck[] = [
  { label: "Slice naming", state: "Ready", tone: "positive", detail: "Character and prop slices follow collection-prefixed names" },
  { label: "Palette parity", state: "Watch", tone: "warning", detail: "Boss portrait variants need palette lock review before handoff" },
  { label: "Plugin sync", state: "Pending", tone: "neutral", detail: "This page documents readiness only; no integration client is installed" },
];

export const consistencyControls: ConsistencyControl[] = [
  { label: "Prompt preset", value: "Pixel-Mythic-v4", state: "Locked", detail: "Used for core visual exploration and asset prompt batches" },
  { label: "Seed lock", value: "441102", state: "Enabled", detail: "Keeps workbench variants comparable across review rounds" },
  { label: "Palette lock", value: "32-color Retro Core", state: "Enabled", detail: "Prevents drift between icon sets, spritesheets, and portraits" },
  { label: "Style score", value: "91 / 100", state: "Healthy", detail: "Static studio signal for design consistency planning" },
];

export const activeFilters = ["Type: Spritesheet", "Status: Review", "Priority: P1/P2", "Collection: Biome-02", "Tag: npc-dialogue"];
