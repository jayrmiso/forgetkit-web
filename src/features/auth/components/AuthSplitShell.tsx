import type { ReactNode } from "react";

type AuthSplitShellProps = Readonly<{
  left: ReactNode;
  right: ReactNode;
}>;

export function AuthSplitShell({ left, right }: AuthSplitShellProps) {
  return (
    <div className="relative z-10 w-full max-w-[1120px]">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="flex justify-center">{left}</div>
        <div className="flex justify-center">{right}</div>
      </div>
    </div>
  );
}
