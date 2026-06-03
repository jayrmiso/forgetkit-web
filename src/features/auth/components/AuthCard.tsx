import type { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { AuthBrand } from "./AuthBrand";

type AuthCardProps = Readonly<{
  title: string;
  description: string;
  children: ReactNode;
}>;

export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <Card className="w-full max-w-[420px] border-app bg-app-surface/96 shadow-[0_24px_90px_-52px_rgba(15,23,42,0.7)] backdrop-blur-sm dark:shadow-[0_24px_90px_-56px_rgba(0,0,0,0.85)]">
      <CardHeader className="space-y-4 px-7 pt-7 pb-5 text-center sm:px-8">
        <AuthBrand />
        <div className="space-y-1.5">
          <CardTitle className="text-[1.55rem] font-semibold tracking-[-0.045em] text-app sm:text-[1.7rem]">{title}</CardTitle>
          <CardDescription className="mx-auto max-w-[28ch] text-[15px] leading-6 text-app-muted">{description}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 px-7 pb-7 sm:px-8 sm:pb-8">{children}</CardContent>
    </Card>
  );
}
