import * as React from "react";

export function Slot({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  if (!React.isValidElement(children)) return null;
  return React.cloneElement(children, { ...props, ...(children.props ?? {}) });
}
