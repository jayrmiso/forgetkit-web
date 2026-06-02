import type { ReactNode } from "react";

export type WorkspaceTableColumn<Row> = {
  key: keyof Row | string;
  header: string;
  render?: (row: Row) => ReactNode;
};

type WorkspaceTableProps<Row> = {
  columns: WorkspaceTableColumn<Row>[];
  rows: Row[];
  getRowKey: (row: Row) => string;
};

export function WorkspaceTable<Row extends object>({ columns, rows, getRowKey }: WorkspaceTableProps<Row>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-app bg-app-surface">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm text-app">
        <thead>
          <tr className="border-b border-app text-xs uppercase tracking-[0.16em] text-app-muted">
            {columns.map((column) => (
              <th key={String(column.key)} className="px-3 py-3 font-semibold">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)} className="border-b border-app/70 last:border-b-0 hover:bg-app-raised">
              {columns.map((column) => (
                <td key={String(column.key)} className="px-3 py-3 align-top">
                  {column.render ? column.render(row) : String((row as Record<string, unknown>)[String(column.key)] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
