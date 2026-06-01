import { Card } from "@heroui/react";

const controls = [
  "Prompt preset: Pixel-Mythic-v4",
  "Seed lock: Enabled",
  "Palette lock: 32-color Retro Core",
  "Style score: 91 / 100",
];

const quickFilters = ["Spritesheet", "Review", "P1/P2", "Biome-02"];

export function DashboardContextPanel() {
  return (
    <aside className="space-y-4">
      <Card className="rounded-2xl border border-app bg-app-surface shadow-sm">
        <div className="px-4 pt-4">
          <p className="text-sm font-medium text-app">Context Controls</p>
        </div>
        <div className="space-y-2 p-4">
          {controls.map((item) => (
            <div key={item} className="rounded-xl border border-app bg-app-raised px-3 py-2 text-sm text-app">
              {item}
            </div>
          ))}
        </div>
      </Card>

      <Card className="rounded-2xl border border-app bg-app-surface shadow-sm">
        <div className="px-4 pt-4">
          <p className="text-sm font-medium text-app">Active Filters</p>
        </div>
        <div className="flex flex-wrap gap-2 p-4">
          {quickFilters.map((item) => (
            <span key={item} className="rounded-full border border-app bg-app-raised px-2.5 py-1 text-xs text-app">
              {item}
            </span>
          ))}
        </div>
      </Card>
    </aside>
  );
}
