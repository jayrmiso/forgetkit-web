import {
  type LucideIcon,
  BookOpenText,
  Boxes,
  ClipboardCheck,
  Database,
  FolderKanban,
  Gauge,
  Layers,
  Lock,
  Palette,
  RefreshCcw,
  Sparkles,
  Spline,
  WandSparkles,
} from "lucide-react";

export type SidebarItem = {
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
  isUnavailable?: boolean;
  availabilityLabel?: "Soon";
};

export type KpiCard = {
  label: string;
  value: string;
  helper: string;
  tone: "neutral" | "positive" | "warning";
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

export type GenerationMode = {
  name: string;
  status: "Ready" | "Calibrating";
};

export type IntegrationRow = {
  integration: string;
  state: "Connected" | "Pending";
  note: string;
};

export const sidebarPrimaryItems: SidebarItem[] = [
  { label: "Dashboard", icon: Layers, isActive: true },
  { label: "Generation Workbench", icon: WandSparkles, isUnavailable: true, availabilityLabel: "Soon" },
  { label: "Asset Library", icon: FolderKanban, isUnavailable: true, availabilityLabel: "Soon" },
  { label: "Narrative Library", icon: BookOpenText, isUnavailable: true, availabilityLabel: "Soon" },
  { label: "Review & Compare", icon: RefreshCcw, isUnavailable: true, availabilityLabel: "Soon" },
  { label: "Version History", icon: Boxes, isUnavailable: true, availabilityLabel: "Soon" },
];

export const sidebarSecondaryItems: SidebarItem[] = [
  { label: "Supabase Storage", icon: Database, isUnavailable: true, availabilityLabel: "Soon" },
  { label: "Godot Export Readiness", icon: ClipboardCheck, isUnavailable: true, availabilityLabel: "Soon" },
  { label: "Aseprite Integration", icon: Spline, isUnavailable: true, availabilityLabel: "Soon" },
  { label: "Consistency Controls", icon: Lock, isUnavailable: true, availabilityLabel: "Soon" },
];

export const kpiCards: KpiCard[] = [
  {
    label: "Generation Jobs",
    value: "148",
    helper: "Prompt-to-image, variation, upscale, bg removal",
    tone: "neutral",
  },
  {
    label: "Asset Readiness",
    value: "82%",
    helper: "Godot-compatible formats validated",
    tone: "positive",
  },
  {
    label: "Narrative Coverage",
    value: "64",
    helper: "Stories + dialogue nodes indexed",
    tone: "neutral",
  },
  {
    label: "Review Rollbacks",
    value: "5",
    helper: "Version rollback events in current sprint",
    tone: "warning",
  },
];

export const generationModes: GenerationMode[] = [
  { name: "Prompt-to-image", status: "Ready" },
  { name: "Variation generation", status: "Ready" },
  { name: "Upscale", status: "Ready" },
  { name: "Background removal", status: "Ready" },
  { name: "Spritesheet generation", status: "Calibrating" },
  { name: "Icon set generation", status: "Calibrating" },
  { name: "Lore and dialogue text", status: "Ready" },
];

export const consistencyControls = [
  { label: "Prompt preset", value: "Pixel-Mythic-v4", icon: Sparkles },
  { label: "Seed lock", value: "Enabled (Seed 441102)", icon: Lock },
  { label: "Palette lock", value: "32-color Retro Core", icon: Palette },
  { label: "Style score", value: "91 / 100", icon: Gauge },
];

export const integrationRows: IntegrationRow[] = [
  {
    integration: "Supabase Storage",
    state: "Connected",
    note: "Primary storage source for binaries and metadata",
  },
  {
    integration: "Godot export readiness",
    state: "Connected",
    note: "Templates mapped to engine target and resolution metadata",
  },
  {
    integration: "Aseprite integration",
    state: "Pending",
    note: "Spritesheet slice handoff queued for plugin sync",
  },
];

export const queueRows: QueueRow[] = [
  {
    id: "FK-401",
    item: "Forest ruins prop icon set",
    lane: "Asset Library",
    status: "Review",
    owner: "Kai",
    updated: "May 29",
    priority: "P1",
  },
  {
    id: "FK-407",
    item: "Companion arc dialogue branch",
    lane: "Narrative Library",
    status: "Draft",
    owner: "Mina",
    updated: "May 29",
    priority: "P2",
  },
  {
    id: "FK-413",
    item: "Dungeon spritesheet batch B",
    lane: "Generation Workbench",
    status: "Calibrating",
    owner: "Len",
    updated: "May 28",
    priority: "P1",
  },
  {
    id: "FK-416",
    item: "HUD item lore microcopy",
    lane: "Narrative Library",
    status: "Approved",
    owner: "Ava",
    updated: "May 28",
    priority: "P3",
  },
  {
    id: "FK-422",
    item: "Boss portrait upscale set",
    lane: "Review & Compare",
    status: "Rollback candidate",
    owner: "Noel",
    updated: "May 27",
    priority: "P2",
  },
];
