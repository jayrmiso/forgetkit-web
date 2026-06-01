import { Card } from "@heroui/react";

type QueueRow = {
  id: string;
  item: string;
  lane: string;
  status: string;
  owner: string;
};

type DashboardQueueTableProps = {
  rows: QueueRow[];
};

export function DashboardQueueTable({ rows }: DashboardQueueTableProps) {
  return (
    <section>
      <Card className="rounded-2xl border border-app bg-app-surface shadow-sm">
        <div className="px-4 pt-4">
          <p className="text-sm font-medium text-app">Review, Compare, and Version Queue</p>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm text-app">
            <thead>
              <tr className="border-b border-app text-app-muted">
                <th className="pb-2 pr-3 font-medium">ID</th>
                <th className="pb-2 pr-3 font-medium">Item</th>
                <th className="pb-2 pr-3 font-medium">Lane</th>
                <th className="pb-2 pr-3 font-medium">Status</th>
                <th className="pb-2 pr-3 font-medium">Owner</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-app/70">
                  <td className="py-3 pr-3">{row.id}</td>
                  <td className="py-3 pr-3">{row.item}</td>
                  <td className="py-3 pr-3">{row.lane}</td>
                  <td className="py-3 pr-3">{row.status}</td>
                  <td className="py-3 pr-3">{row.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}
