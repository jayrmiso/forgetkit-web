import Link from "next/link";

type AuthRouteSwitchProps = Readonly<{
  href: string;
  label: string;
  linkLabel: string;
}>;

export function AuthRouteSwitch({ href, label, linkLabel }: AuthRouteSwitchProps) {
  return (
    <div className="flex items-center justify-between gap-4 text-xs text-app-muted">
      <span>{label}</span>
      <Link className="font-medium text-app-primary transition hover:underline" href={href}>
        {linkLabel}
      </Link>
    </div>
  );
}
