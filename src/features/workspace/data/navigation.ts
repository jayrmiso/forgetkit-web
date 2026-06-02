export type WorkspaceRoute = {
  label: string;
  href: string;
  description: string;
  group: "Core" | "Integrations";
  icon: string;
};

export const workspaceRoutes = [
  { label: "Dashboard", href: "/", description: "Studio overview and sprint readiness", group: "Core", icon: "D" },
  { label: "Generation Workbench", href: "/generation-workbench", description: "Prompt, variation, upscale, and spritesheet queues", group: "Core", icon: "G" },
  { label: "Asset Library", href: "/asset-library", description: "Tagged assets, collections, status, and priority", group: "Core", icon: "A" },
  { label: "Narrative Library", href: "/narrative-library", description: "Story arcs, lore cards, and dialogue branches", group: "Core", icon: "N" },
  { label: "Review & Compare", href: "/review-compare", description: "Approval queues and visual comparison notes", group: "Core", icon: "R" },
  { label: "Version History", href: "/version-history", description: "Full history, rollback points, and release notes", group: "Core", icon: "V" },
  { label: "Supabase Storage", href: "/integrations/supabase-storage", description: "Storage readiness and bucket planning", group: "Integrations", icon: "S" },
  { label: "Godot Export Readiness", href: "/integrations/godot-export-readiness", description: "Engine export format and metadata checks", group: "Integrations", icon: "E" },
  { label: "Aseprite Integration", href: "/integrations/aseprite-integration", description: "Spritesheet slice and pixel-art handoff state", group: "Integrations", icon: "P" },
  { label: "Consistency Controls", href: "/consistency-controls", description: "Preset, seed, palette, and style governance", group: "Integrations", icon: "C" },
] satisfies WorkspaceRoute[];

export const workspaceRouteGroups = ["Core", "Integrations"] as const;
