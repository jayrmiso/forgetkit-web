import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  consistencyControls,
  generationModes,
  integrationRows,
  kpiCards,
  queueRows,
} from "./mockData";

const kpiToneStyles: Record<string, string> = {
  neutral: "text-slate-500",
  positive: "text-blue-700",
  warning: "text-amber-700",
};

const modeStyles: Record<string, string> = {
  Ready: "bg-blue-100 text-blue-700",
  Calibrating: "bg-amber-100 text-amber-700",
};

const integrationStyles: Record<string, string> = {
  Connected: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
};

const priorityStyles: Record<string, string> = {
  P1: "bg-red-100 text-red-700",
  P2: "bg-amber-100 text-amber-700",
  P3: "bg-slate-100 text-slate-700",
};

export function WorkspaceContent() {
  return (
    <section className="min-h-0 min-w-0 w-full overflow-y-auto px-4 py-6 md:px-6 lg:px-8 lg:py-8">
      <div className="flex flex-col space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiCards.map((card) => (
            <Card
              key={card.label}
              className="border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_28px_-24px_rgba(37,99,235,0.28)] ring-1 ring-slate-950/5"
            >
              <CardHeader className="space-y-1 pb-2">
                <CardDescription className="text-slate-500">{card.label}</CardDescription>
                <CardTitle className="text-2xl text-slate-900">{card.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-xs ${kpiToneStyles[card.tone]}`}>{card.helper}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <Card className="border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_14px_30px_-26px_rgba(37,99,235,0.28)] ring-1 ring-slate-950/5 xl:col-span-2">
            <CardHeader>
              <CardTitle className="text-base text-slate-900">Generation Workbench Modes</CardTitle>
              <CardDescription className="text-slate-500">
                Prompt-to-image, variation, upscale, removal, spritesheet, icon set, and text generation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2">
                {generationModes.map((mode) => (
                  <div key={mode.name} className="flex items-center justify-between rounded-lg border border-slate-200/80 bg-slate-50/90 px-3 py-2 shadow-sm ring-1 ring-slate-950/5">
                    <p className="text-sm text-slate-800">{mode.name}</p>
                    <Badge variant="secondary" className={modeStyles[mode.status]}>
                      {mode.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_14px_30px_-26px_rgba(37,99,235,0.28)] ring-1 ring-slate-950/5">
            <CardHeader>
              <CardTitle className="text-base text-slate-900">Consistency Controls</CardTitle>
              <CardDescription className="text-slate-500">Preset, seed lock, and palette lock governance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {consistencyControls.map((control) => (
                <div key={control.label} className="flex items-center gap-2 rounded-lg border border-slate-200/80 bg-slate-50/90 px-3 py-2 shadow-sm ring-1 ring-slate-950/5">
                  <control.icon className="size-4 text-blue-600" />
                  <div>
                    <p className="text-xs font-medium text-slate-600">{control.label}</p>
                    <p className="text-sm text-slate-900">{control.value}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_14px_30px_-26px_rgba(37,99,235,0.28)] ring-1 ring-slate-950/5">
            <CardHeader>
              <CardTitle className="text-base text-slate-900">Integration Readiness</CardTitle>
              <CardDescription className="text-slate-500">Supabase storage, Godot export, and Aseprite sync state</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {integrationRows.map((row) => (
                <div
                  key={row.integration}
                  className="rounded-lg border border-slate-200/80 bg-white px-3 py-2 shadow-sm ring-1 ring-slate-950/5"
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-slate-900">{row.integration}</p>
                    <Badge variant="secondary" className={integrationStyles[row.state]}>
                      {row.state}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500">{row.note}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_14px_30px_-26px_rgba(37,99,235,0.28)] ring-1 ring-slate-950/5">
            <CardHeader>
              <CardTitle className="text-base text-slate-900">Library Operations</CardTitle>
              <CardDescription className="text-slate-500">
                Metadata, tags, collections, status, and priority signals across assets and narrative
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 rounded-lg border border-slate-200/80 bg-slate-50/90 p-3 shadow-sm ring-1 ring-slate-950/5">
                <p className="text-sm font-medium text-slate-900">Current filters</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Type: Spritesheet",
                    "Status: Review",
                    "Priority: P1/P2",
                    "Collection: Biome-02",
                    "Tag: npc-dialogue",
                  ].map((filter) => (
                    <Badge key={filter} variant="outline" className="border-blue-200 bg-white text-blue-700">
                      {filter}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_14px_30px_-26px_rgba(37,99,235,0.28)] ring-1 ring-slate-950/5">
          <CardHeader>
            <CardTitle className="text-base text-slate-900">Review, Compare, and Version Queue</CardTitle>
            <CardDescription className="text-slate-500">
              Full-history workflow with notes, approval state, compare view, and rollback readiness
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-xl border border-slate-200/80 bg-white shadow-sm ring-1 ring-slate-950/5">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200 hover:bg-transparent">
                    <TableHead className="text-slate-500">ID</TableHead>
                    <TableHead className="text-slate-500">Item</TableHead>
                    <TableHead className="text-slate-500">Lane</TableHead>
                    <TableHead className="text-slate-500">Status</TableHead>
                    <TableHead className="text-slate-500">Owner</TableHead>
                    <TableHead className="text-slate-500">Updated</TableHead>
                    <TableHead className="text-slate-500">Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queueRows.map((row) => (
                    <TableRow key={row.id} className="border-slate-200 text-sm hover:bg-slate-50">
                      <TableCell className="font-medium text-slate-700">{row.id}</TableCell>
                      <TableCell className="text-slate-900">{row.item}</TableCell>
                      <TableCell className="text-slate-700">{row.lane}</TableCell>
                      <TableCell className="text-slate-700">{row.status}</TableCell>
                      <TableCell className="text-slate-700">{row.owner}</TableCell>
                      <TableCell className="text-slate-700">{row.updated}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={priorityStyles[row.priority]}>
                          {row.priority}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
