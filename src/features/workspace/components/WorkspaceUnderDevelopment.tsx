import { WorkspacePageFrame } from "./WorkspacePageFrame";

type WorkspaceUnderDevelopmentProps = Readonly<{
  title: string;
  eyebrow?: string;
  description?: string;
}>;

export function WorkspaceUnderDevelopment({
  title,
  eyebrow = "Under development",
  description = "This workspace page is under development. The route is available, but the feature content is not ready yet.",
}: WorkspaceUnderDevelopmentProps) {
  return (
    <WorkspacePageFrame
      eyebrow={eyebrow}
      title={title}
      description={description}
      status="Coming soon"
    >
      <section className="border-t border-app pt-8">
        <p className="max-w-2xl text-sm leading-6 text-app-muted">
          Placeholder content is shown while the real workspace feature is being designed and wired to the API.
        </p>
      </section>
    </WorkspacePageFrame>
  );
}
