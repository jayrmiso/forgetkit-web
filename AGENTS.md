<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Operating Rules - forgetkit-web

## Mission
ForgetKit is a game development preparation workspace. It supports concept building, story building, asset creation, asset libraries, documentation, planning, and pre-production workflows.

This repository is the frontend application only.

## Decision Policy
- Ask before making product, architecture, compliance, security, privacy, licensing, dependency, folder-structure, data-contract, or design-direction decisions.
- If research is needed for compliance, licensing, security, accessibility, or framework behavior, perform the research first and cite the relevant source in the final response.
- Make small local implementation choices only when they are clearly implied by existing files and do not change direction.

## Mandatory Zuggie Workflow
- For every non-trivial task, use the Zuggie spec-first workflow by default.
- Start with `zuggie-spec` to produce a concise spec before implementation.
- Wait for explicit user approval of the spec before writing code.
- Use `zuggie-impl` only after the spec is accepted.
- Use reviewer/project gates before completion.
- Trivial tasks may skip the spec only when they are mechanical, local, and do not involve product, architecture, dependency, folder-structure, API-contract, compliance, security, or design-direction decisions.
- When unsure whether a task is trivial, treat it as non-trivial and start with a spec.

## Stack
- Next.js App Router
- TypeScript target architecture, even if the initial scaffold still has JavaScript files
- Tailwind CSS
- HeroUI
- Zod for strict client-side and API-contract validation where applicable

## Architecture Rules
- Keep this repo frontend-only. Do not add backend server code here.
- Ask before changing top-level folder structure.
- Prefer clean architecture boundaries: app routes, reusable UI components, feature modules, shared utilities, validation schemas, and API clients should have clear ownership.
- Do not place all code for a feature in one large file.
- Extract reusable components early when a UI pattern can reasonably repeat.
- Shared UI primitives should be configurable through props and tokens rather than duplicated.

## Naming Rules
- React components use `UpperCamelCase`.
- Hooks use `useCamelCase`.
- Utility functions, variables, and folder-local helpers use `camelCase`.
- Route folders follow Next.js conventions.
- Ask before introducing a new naming convention.

## UI Rules
- The visual direction should combine polished creative-studio UI with clean SaaS workspace ergonomics.
- Build actual app screens, not marketing pages, unless explicitly requested.
- Show an HTML/static mock preview or design preview before implementing significant React UI.
- Use HeroUI and Tailwind consistently; do not introduce another component library without approval.
- Prefer reusable design primitives for buttons, fields, cards, panels, navigation, tabs, dialogs, and empty states.
- Keep interfaces responsive for mobile and desktop.
- Preserve accessibility: semantic HTML, labels, focus states, keyboard navigation, and sufficient contrast.

## Dependency Rules
- Ask before adding any new dependency.
- Explain why the dependency is needed, what it replaces, and any maintenance/security risk.
- Prefer existing platform, Next.js, React, HeroUI, and Tailwind capabilities before adding packages.

## Testing Rules
- Add unit and integration tests for meaningful behavior.
- Keep tests near the code they cover, using separate test files.
- Do not mix test code into implementation files.
- Ask before choosing or changing the test framework.

## Git Workflow
- Use feature branches and PR-style discipline.
- `main` should be treated as protected and deployable.
- Do not push directly to `main` unless explicitly instructed.
- Do not run destructive git commands unless explicitly requested.

## Documentation
- Update documentation when product behavior, architecture, API contracts, environment variables, or setup steps change.
- Add an ADR in `docs/adr/` for significant architecture, compliance, dependency, or product-direction decisions.
- Keep `.rac/` as the source of truth and generate vendor-specific agent outputs from it.
- Use the Zuggie RAC pack as the default structured AI workflow: spec first, accepted spec second, implementation third, review before completion.
- Use local ForgetKit RAC agents and skills for project-specific architecture, decision, UI preview, API contract, and test gates.

## Validation Before Completion
- Run `npm run lint`.
- Run `npm run build` when the environment permits.
- Report any command that could not be run or failed for environment reasons.
