"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type ProfileNavItem = Readonly<{
  label: string;
  href: string;
  description: string;
}>;

const profileNavItems: ProfileNavItem[] = [
  { label: "Public profile", href: "/profile", description: "Visible account identity" },
  { label: "Account", href: "/profile/account", description: "Email and login identity" },
  { label: "Appearance", href: "/profile/appearance", description: "Theme and surface tone" },
  { label: "Accessibility", href: "/profile/accessibility", description: "Keyboard and readability settings" },
  { label: "Notifications", href: "/profile/notifications", description: "Alerts and inbox routing" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ProfileNavigation() {
  const pathname = usePathname();

  return (
    <aside className="lg:sticky lg:top-4">
      <div className="rounded-2xl border border-app bg-app-surface p-2 shadow-sm">
        <div className="px-2 py-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-app-muted">Profile</p>
        </div>

        <nav aria-label="Profile navigation" className="space-y-1">
          {profileNavItems.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                className={cn(
                  "group flex flex-col rounded-xl px-3 py-2.5 text-left transition",
                  active ? "bg-app-primary/12 text-app" : "text-app-muted hover:bg-app-raised hover:text-app",
                )}
                href={item.href}
                aria-current={active ? "page" : undefined}
              >
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-xs leading-5 text-app-muted group-hover:text-app-muted/90">{item.description}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
