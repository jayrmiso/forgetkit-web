import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const tooltipPath = path.resolve("src/components/ui/tooltip.tsx");
const tooltipSource = fs.readFileSync(tooltipPath, "utf8");

test("Tooltip injects TooltipProvider so it can render without external provider", () => {
  assert.match(
    tooltipSource,
    /function Tooltip\(\{\s*\.\.\.props\s*\}:\s*React\.ComponentProps<typeof TooltipPrimitive\.Root>\)\s*\{\s*return\s*\(\s*<TooltipProvider>\s*<TooltipPrimitive\.Root data-slot="tooltip" \{\.\.\.props\} \/>\s*<\/TooltipProvider>\s*\)\s*\}/s
  );
});

test("Tooltip provider and trigger/content slots are preserved", () => {
  assert.match(tooltipSource, /data-slot="tooltip-provider"/);
  assert.match(tooltipSource, /data-slot="tooltip-trigger"/);
  assert.match(tooltipSource, /data-slot="tooltip-content"/);
});
