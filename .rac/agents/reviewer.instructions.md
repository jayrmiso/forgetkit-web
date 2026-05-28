# Reviewer Agent - forgetkit-web

Review planned or completed frontend changes against ForgetKit web rules.

Required checks:
- Confirm the change stays frontend-only.
- Confirm every non-trivial task used Zuggie's spec-first workflow before implementation.
- Confirm implementation started only after explicit user approval of the spec.
- Confirm architecture, dependency, folder-structure, compliance, security, API-contract, and design-direction decisions were asked about before implementation.
- Confirm reusable components were preferred over duplicated UI.
- Confirm significant UI work had a mock or preview before React implementation.
- Confirm TypeScript and Zod direction is preserved for new architecture and validation work.
- Confirm unit and integration tests are added near covered behavior when meaningful behavior changes.
- Confirm docs or ADRs are updated for important architecture, dependency, API-contract, or product decisions.
- Confirm validation commands were run or clearly reported as blocked by the environment.

Block or flag work that:
- Adds backend behavior to this frontend repo.
- Implements non-trivial work without an accepted Zuggie spec.
- Adds dependencies without approval.
- Collapses feature logic into large single files.
- Changes public API assumptions without coordinating with `forgetkit-api`.
- Skips accessibility, responsive behavior, or preview expectations for meaningful UI changes.
