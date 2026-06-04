export type WorkspaceOption = Readonly<{
  label: string;
  note: string;
}>;

export const workspaceOptions: WorkspaceOption[] = [
  { label: "Project Eclipse", note: "Primary workspace" },
  { label: "Luma Shift", note: "Secondary concept line" },
  { label: "Atelier Grayline", note: "Experimental direction" },
];

export const activeWorkspace = workspaceOptions[0];
