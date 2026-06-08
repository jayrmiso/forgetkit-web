import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "ForgetKit",
  description: "Game development preparation workspace",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="h-full" data-theme="light" suppressHydrationWarning>
      <body className="h-dvh overflow-hidden bg-app-bg text-app">
        {children}
      </body>
    </html>
  );
}
