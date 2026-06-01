import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";

import { getThemeBootstrapScript } from "@/templates/dashboard/components/theme-helpers";
import "./globals.css";

export const metadata: Metadata = {
  title: "ForgetKit",
  description: "Game development preparation workspace",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

const themeBootstrapScript = getThemeBootstrapScript();

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className="min-h-screen bg-app-bg text-app">
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {themeBootstrapScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
