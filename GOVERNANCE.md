# Governance - forgetkit-web

## Purpose
This repository contains the ForgetKit frontend application built with Next.js.

## Ownership
- Primary owner: product maintainer
- Contributors: approved collaborators via pull request

## Branching
- `main` is always deployable.
- Feature work uses short-lived branches: `feat/*`, `fix/*`, `chore/*`.
- Direct pushes to `main` are discouraged.

## Pull Requests
- At least one review before merge (except solo emergency fixes).
- PR must include: scope, screenshots for UI changes, and test notes.
- Keep PRs small and focused.

## Quality Gates
- `npm run lint` must pass.
- Build should pass in CI.
- New UI work should be responsive for desktop and mobile.

## Security
- Never commit `.env*` or secrets.
- Use least-privilege tokens.
- Report dependency vulnerabilities and patch regularly.

## Decision Records
- Major technical decisions should be written in `docs/adr/` as short ADR files.

## Versioning
- Semantic versioning for releases.
