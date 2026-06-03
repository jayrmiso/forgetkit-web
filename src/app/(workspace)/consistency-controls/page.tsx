import { Chip } from "@heroui/react";

import { WorkspaceCard } from "@/features/workspace/components/WorkspaceCard";
import { WorkspacePageFrame } from "@/features/workspace/components/WorkspacePageFrame";
import { consistencyControls } from "@/features/workspace/data/mockData";

export default function ConsistencyControlsPage() {
  return (
    <WorkspacePageFrame
      eyebrow="Consistency controls"
      title="Preset, seed, palette, and style governance"
      description="A static control surface for keeping generation output aligned across assets, narrative, and review."
      status="Controls locked"
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {consistencyControls.map((control) => (
          <WorkspaceCard key={control.label} title={control.label} description={control.detail}>
            <p className="text-2xl font-semibold tracking-[-0.04em] text-app">{control.value}</p>
            <Chip className="mt-4 border border-app bg-app-primary/15 text-app-primary" size="sm" variant="soft">
              {control.state}
            </Chip>
          </WorkspaceCard>
        ))}
      </section>
    </WorkspacePageFrame>
  );
}
