import type { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

export type LucideIcon = (props: IconProps) => ReactElement;

export const PanelLeftIcon = BaseIcon;
export const Bell = BaseIcon;
export const ChevronsUpDown = BaseIcon;
export const Search = BaseIcon;
export const Check = BaseIcon;
export const ChevronDown = BaseIcon;
export const ChevronRight = BaseIcon;
export const Lock = BaseIcon;
export const BookOpenText = BaseIcon;
export const Boxes = BaseIcon;
export const ClipboardCheck = BaseIcon;
export const Database = BaseIcon;
export const FolderKanban = BaseIcon;
export const Gauge = BaseIcon;
export const Layers = BaseIcon;
export const Palette = BaseIcon;
export const RefreshCcw = BaseIcon;
export const Sparkles = BaseIcon;
export const Spline = BaseIcon;
export const WandSparkles = BaseIcon;
