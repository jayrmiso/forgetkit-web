import { Card, Chip } from "@heroui/react";

type KpiCard = {
  label: string;
  value: string;
  status: string;
};

type DashboardKpiGridProps = {
  cards: KpiCard[];
};

export function DashboardKpiGrid({ cards }: DashboardKpiGridProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="rounded-2xl border border-app bg-app-surface shadow-sm">
          <div className="flex items-center justify-between px-4 pt-4 pb-0">
            <p className="text-sm text-app-muted">{card.label}</p>
            <Chip className="border border-app bg-app-raised text-app" size="sm" variant="soft">
              {card.status}
            </Chip>
          </div>
          <div className="px-4 pt-2 pb-4">
            <p className="text-2xl font-semibold text-app">{card.value}</p>
          </div>
        </Card>
      ))}
    </section>
  );
}
