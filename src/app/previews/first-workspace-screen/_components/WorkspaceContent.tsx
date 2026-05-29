import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { kpiCards, queueRows } from "./mockData";

const riskStyles: Record<string, string> = {
  Low: "bg-zinc-700/30 text-zinc-200",
  Medium: "bg-zinc-600/35 text-zinc-100",
  High: "bg-zinc-500/40 text-black",
};

const kpiToneStyles: Record<string, string> = {
  neutral: "text-zinc-300",
  positive: "text-zinc-100",
  warning: "text-zinc-200",
};

export function WorkspaceContent() {
  return (
    <section className="mx-auto w-full max-w-6xl space-y-5 px-6 py-10 lg:px-8">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((card) => (
          <Card key={card.label} className="border-zinc-800/80 bg-zinc-900/80 shadow-[0_10px_24px_-18px_rgba(0,0,0,0.8)]">
            <CardHeader className="space-y-1 pb-2">
              <CardDescription className="text-zinc-400">{card.label}</CardDescription>
              <CardTitle className="text-2xl text-zinc-100">{card.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-xs ${kpiToneStyles[card.tone]}`}>{card.helper}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-zinc-800/80 bg-zinc-900/80 shadow-[0_10px_24px_-18px_rgba(0,0,0,0.8)]">
          <CardHeader>
            <CardTitle className="text-base text-zinc-100">Narrative Throughput</CardTitle>
            <CardDescription className="text-zinc-400">Scene branches approved over 14 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-52 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black p-4">
              <div className="flex h-full items-end gap-2">
                {[35, 52, 48, 62, 58, 72, 66, 79].map((height, index) => (
                  <div key={height} className="flex-1 rounded-t-md bg-zinc-300/70" style={{ height: `${height}%`, opacity: 0.55 + index * 0.05 }} />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800/80 bg-zinc-900/80 shadow-[0_10px_24px_-18px_rgba(0,0,0,0.8)]">
          <CardHeader>
            <CardTitle className="text-base text-zinc-100">Asset Load Distribution</CardTitle>
            <CardDescription className="text-zinc-400">Current prep capacity by discipline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-52 rounded-xl border border-zinc-800 bg-black p-4">
              <div className="grid h-full grid-cols-6 gap-2">
                {["22%", "18%", "16%", "15%", "17%", "12%"].map((value, index) => (
                  <div key={value} className="flex flex-col justify-end rounded-md bg-zinc-800/80 p-2">
                    <div className="mb-2 rounded-sm bg-zinc-300/70" style={{ height: `${30 + index * 10}%` }} />
                    <p className="text-[11px] text-zinc-400">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-zinc-800/80 bg-zinc-900/80 shadow-[0_10px_24px_-18px_rgba(0,0,0,0.8)]">
        <CardHeader>
          <CardTitle className="text-base text-zinc-100">Preparation Queue</CardTitle>
          <CardDescription className="text-zinc-400">High-density snapshot of current studio prep work</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl border border-zinc-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-400">ID</TableHead>
                  <TableHead className="text-zinc-400">Item</TableHead>
                  <TableHead className="text-zinc-400">Stage</TableHead>
                  <TableHead className="text-zinc-400">Owner</TableHead>
                  <TableHead className="text-zinc-400">Due</TableHead>
                  <TableHead className="text-zinc-400">Risk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queueRows.map((row) => (
                  <TableRow key={row.id} className="border-zinc-800 text-sm hover:bg-zinc-800/40">
                    <TableCell className="font-medium text-zinc-300">{row.id}</TableCell>
                    <TableCell className="text-zinc-100">{row.item}</TableCell>
                    <TableCell className="text-zinc-300">{row.stage}</TableCell>
                    <TableCell className="text-zinc-300">{row.owner}</TableCell>
                    <TableCell className="text-zinc-300">{row.due}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={riskStyles[row.risk]}>
                        {row.risk}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
