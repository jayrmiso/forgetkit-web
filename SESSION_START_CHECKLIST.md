# Session Start Checklist (Mandatory)

Run this checklist at the beginning of every new session before implementation work.

1. Re-read `AGENTS.md` and confirm workflow mode for the task.
2. Confirm git context:
   - Current branch and worktree path.
   - Whether the task should end with merge-ready handoff or explicit merge to `main`.
3. Classify task:
   - Non-trivial: MUST run `zuggie-spec` first.
   - Trivial mechanical one-liner only: may proceed direct.
4. For non-trivial tasks, do not write code until:
   - `zuggie-spec` output is shared
   - explicit user approval is received
5. After approval, run `zuggie-impl` and reviewer/project gates.
6. Before final handoff, report:
   - Gate outcomes (`lint`, tests, build or reason skipped).
   - Feature branch, worktree path, commit SHA, and merge/push commands when work is not already merged.

If any mandatory step is skipped, STOP and self-correct before continuing.
