import type { SVGProps } from "react";

export type WorkspaceIcon = (props: SVGProps<SVGSVGElement>) => JSX.Element;

export type WorkspaceRoute = {
  label: string;
  href: string;
  description: string;
  group: "Core" | "Integrations";
  icon: WorkspaceIcon;
};

function DashboardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" {...props}>
      <rect height="7" width="7" rx="1.5" x="3" y="3" />
      <rect height="7" width="7" rx="1.5" x="14" y="3" />
      <rect height="7" width="7" rx="1.5" x="3" y="14" />
      <rect height="7" width="7" rx="1.5" x="14" y="14" />
    </svg>
  );
}

function SparklesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" {...props}>
      <path d="M12 3l1.8 5.4L19 10.2l-5.2 1.8L12 17l-1.8-5L5 10.2l5.2-1.8L12 3Z" />
      <path d="M19 14l.9 2.6L22 17.5l-2.1.9L19 21l-.9-2.6-2.1-.9 2.1-.9L19 14Z" />
    </svg>
  );
}

function FolderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" {...props}>
      <path d="M3.5 7.5A2.5 2.5 0 0 1 6 5h4l2 2h6a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 18 19H6a2.5 2.5 0 0 1-2.5-2.5v-9Z" />
    </svg>
  );
}

function BookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" {...props}>
      <path d="M6 4.5h10a2 2 0 0 1 2 2V19a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2V6.5a2 2 0 0 1 2-2Z" />
      <path d="M8 8h7M8 12h5" />
    </svg>
  );
}

function ScaleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" {...props}>
      <path d="M12 4v16" />
      <path d="M7 7h10" />
      <path d="M6 7l-3 5a4 4 0 0 0 6 0L6 7Z" />
      <path d="M18 7l-3 5a4 4 0 0 0 6 0l-3-5Z" />
      <path d="M5 20h14" />
    </svg>
  );
}

function HistoryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" {...props}>
      <path d="M4 12a8 8 0 1 0 2.3-5.7" />
      <path d="M4 4v5h5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function DatabaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" {...props}>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="3.5" />
      <path d="M4.5 5.5V12c0 1.9 3.4 3.5 7.5 3.5s7.5-1.6 7.5-3.5V5.5" />
      <path d="M4.5 12v6.5c0 1.9 3.4 3.5 7.5 3.5s7.5-1.6 7.5-3.5V12" />
    </svg>
  );
}

function ExportIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" {...props}>
      <path d="M8 8V6a2 2 0 0 1 2-2h7" />
      <path d="M14 4l3 3-3 3" />
      <path d="M16 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h4" />
    </svg>
  );
}

function PaintIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" {...props}>
      <path d="M12 4a8 8 0 1 0 0 16h1.2a1.8 1.8 0 0 0 1.8-1.8c0-.8-.5-1.4-1.2-1.7H14a1.5 1.5 0 0 1 0-3h1.3a2 2 0 0 0 1.8-2.9A8 8 0 0 0 12 4Z" />
      <path d="M8.5 9.5h0" />
      <path d="M10.5 7.5h0" />
      <path d="M7 12h0" />
    </svg>
  );
}

function SlidersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24" {...props}>
      <path d="M5 6h14" />
      <path d="M5 12h14" />
      <path d="M5 18h14" />
      <circle cx="9" cy="6" r="1.8" />
      <circle cx="15" cy="12" r="1.8" />
      <circle cx="11" cy="18" r="1.8" />
    </svg>
  );
}

export const workspaceRoutes = [
  { label: "Dashboard", href: "/", description: "Studio overview and sprint readiness", group: "Core", icon: DashboardIcon },
  {
    label: "Generation Workbench",
    href: "/generation-workbench",
    description: "Prompt, variation, upscale, and spritesheet queues",
    group: "Core",
    icon: SparklesIcon,
  },
  { label: "Asset Library", href: "/asset-library", description: "Tagged assets, collections, status, and priority", group: "Core", icon: FolderIcon },
  { label: "Narrative Library", href: "/narrative-library", description: "Story arcs, lore cards, and dialogue branches", group: "Core", icon: BookIcon },
  { label: "Review & Compare", href: "/review-compare", description: "Approval queues and visual comparison notes", group: "Core", icon: ScaleIcon },
  { label: "Version History", href: "/version-history", description: "Full history, rollback points, and release notes", group: "Core", icon: HistoryIcon },
  { label: "Supabase Storage", href: "/integrations/supabase-storage", description: "Storage readiness and bucket planning", group: "Integrations", icon: DatabaseIcon },
  {
    label: "Godot Export Readiness",
    href: "/integrations/godot-export-readiness",
    description: "Engine export format and metadata checks",
    group: "Integrations",
    icon: ExportIcon,
  },
  {
    label: "Aseprite Integration",
    href: "/integrations/aseprite-integration",
    description: "Spritesheet slice and pixel-art handoff state",
    group: "Integrations",
    icon: PaintIcon,
  },
  { label: "Consistency Controls", href: "/consistency-controls", description: "Preset, seed, palette, and style governance", group: "Integrations", icon: SlidersIcon },
] satisfies WorkspaceRoute[];

export const workspaceRouteGroups = ["Core", "Integrations"] as const;
