type WorkspaceSettingsSectionContentProps = Readonly<{
  title: string;
  description: string;
  points: string[];
}>;

export function WorkspaceSettingsSectionContent({ title, description, points }: WorkspaceSettingsSectionContentProps) {
  return (
    <section className="border-b border-app pb-7">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-app-primary">Planned settings</p>
        <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-app">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-app-muted">{description}</p>
      </div>

      <ul className="mt-5 divide-y divide-app/70 text-sm leading-6 text-app-muted">
        {points.map((point) => (
          <li key={point} className="py-3">
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
}
