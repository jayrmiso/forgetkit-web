import { LoginCard } from "@/features/auth/components/LoginCard";

export default function LoginPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(183,121,31,0.10),_transparent_38%),linear-gradient(180deg,_rgba(255,255,255,0.82),_rgba(246,247,249,1))] px-4 py-6 text-app dark:bg-[radial-gradient(circle_at_top,_rgba(214,158,46,0.12),_transparent_36%),linear-gradient(180deg,_rgba(18,23,31,0.96),_rgba(14,18,24,1))]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(31,39,53,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(31,39,53,0.03)_1px,transparent_1px)] bg-[size:84px_84px] opacity-25 dark:bg-[linear-gradient(to_right,rgba(232,237,247,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(232,237,247,0.035)_1px,transparent_1px)]" />
      <div className="relative z-10 grid min-h-[calc(100dvh-3rem)] place-items-center">
        <LoginCard />
      </div>
    </main>
  );
}
