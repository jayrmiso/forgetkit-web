type AuthBrandProps = Readonly<{
  label?: string;
}>;

export function AuthBrand({ label = "FK" }: AuthBrandProps) {
  return (
    <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-app bg-app-raised text-base font-semibold tracking-[-0.05em] text-app shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] dark:shadow-none">
      {label}
    </div>
  );
}
