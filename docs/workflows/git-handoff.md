# Git Handoff Workflow

Use this when completed work may outlive the current AI session or when pushing/merging becomes blocked by tool policy.

## Merge-Ready Handoff

Before ending implementation work:

1. Commit completed changes on the feature branch.
2. Report the feature branch name, worktree path, and commit SHA.
3. Report validation results, including commands that failed for environment or policy reasons.
4. Provide exact manual commands for recovery:

```bash
git status -sb
git worktree list
git merge <feature-branch> --no-edit
git push origin main
```

## Explicit Merge To Main

`main` stays protected by default. If the user explicitly asks to merge completed work into `main`:

1. Confirm the feature branch is committed and gates have run or are clearly reported as blocked.
2. Merge into `main` with:

```bash
git merge <feature-branch> --no-edit
```

3. Report the resulting `main` commit SHA and ahead/behind state.
4. Push only when the user explicitly asks:

```bash
git push origin main
```

If pushing is blocked by tool policy, report the exact command above and leave the local `main` branch in a clear committed state.
