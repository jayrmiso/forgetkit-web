# ForgetKit Personal Product Requirements

## Scope
Personal game development workspace for a solo developer to generate, store, organize, version, and review assets and narrative content.

## Product Q&A (Source of Truth)

1. What asset/content types are core?
Answer: All major game-preproduction content, including visual assets and narrative assets (stories and dialogues).

2. What generation modes are required?
Answer:
- Prompt-to-image
- Variation generation
- Upscale
- Background removal
- Spritesheet generation
- Icon set generation
- Text generation for lore/items
- Broad AI generation support for all listed modes

AI execution note:
- Prefer Codex-compatible execution path where possible (SDK if available, otherwise CLI-triggered workflows).

3. External tools to integrate with?
Answer:
- Aseprite
- Godot (engine target)

4. File storage source of truth?
Answer:
- Supabase Storage (cloud storage)

5. Organization model requirements?
Answer:
- Folder hierarchy
- Tags
- Collections
- Status
- Priority
- Version history
- "In use" references

6. Required metadata per asset?
Answer:
- Project
- Style
- Biome
- Resolution
- Engine target
- License/source
- Status (draft/final/etc.)
- Usage rights

7. Search/filter requirements?
Answer:
- Comprehensive filtering across all core dimensions above, including type/tag/date/project/aspect/state/favorites and related metadata.

8. Asset relationships needed?
Answer:
- Yes. Relationship graphing across assets and narrative entities is required.

9. Review loop requirements?
Answer:
- Side-by-side comparison
- Approve/reject states
- Notes
- Iteration history
- Rollback

10. Versioning policy?
Answer:
- Keep every generation.

11. Daily dashboard requirements?
Answer:
- Current project focus
- Tasks
- Recent assets
- Blockers
- Next milestone
- Quick-generate actions

12. Output formats/targets?
Answer:
- Formats and export targets that are compatible with Godot workflows.

13. Template pipelines required?
Answer:
- Yes. Reusable generation pipelines for common production flows are required.

14. Generation consistency constraints?
Answer:
- Very important:
  - Style consistency
  - Prompt presets
  - Seed lock
  - Color palette lock

15. MVP success statement?
Answer:
- Yes, explicit MVP success criteria are required.

## MVP Definition (Draft from Q&A)

In one working session, the user can:
- Generate and iterate on multiple asset/narrative outputs using locked style/seed/palette constraints.
- Save all outputs and metadata to Supabase Storage with full version retention.
- Organize assets with folders/tags/collections/status/priority and relationship links.
- Review versions side-by-side, add notes, approve/select final candidates, and rollback when needed.
- Export selected outputs in Godot-compatible formats.

## Implementation Implications

- Storage and indexing:
  - Supabase Storage for binaries
  - Structured metadata + relationships for advanced filtering and graph traversal

- Generation layer:
  - Unified job model supporting image and text generation workflows
  - Execution adapters for Codex SDK/CLI-compatible flows
  - Reproducibility controls (seed + palette + preset)

- Product surfaces:
  - Generation workbench
  - Asset library
  - Narrative library (stories/dialogue/lore)
  - Review/compare/version history surface
  - Dashboard for daily execution

## Workspace State

Workspace creation should stay lightweight:
- Workspace name
- Engine target, defaulting to Godot

Detailed setup belongs in workspace settings after creation:
- Game title
- Genre
- Camera view
- Art direction
- Target resolution
- Default biome
- Default style
- Current focus
- Next milestone
- Blockers
- Storage root path
- Godot project path
- Naming convention

Workspace settings are the shared source of state for future dashboard, asset, narrative, generation, review, storage, and export surfaces. Until backend update endpoints exist, the frontend should treat these fields as read-only or unset values returned by the workspace API.

## Public Profile And Showcase

ForgetKit should separate private workspace tooling from public showcase routes:
- `/w/[workspaceId]` is the authenticated workspace app.
- `/u/[username]` is the public profile.
- `/u/[username]/[workspaceSlug]` is the public workspace showcase.

Workspace visibility should start with:
- `private`: visible only to the owner.
- `unlisted`: readable by link, not shown on the profile.
- `public`: shown on the profile and readable through public routes.

Public workspace settings should include:
- Visibility
- Public slug
- Public description
- Comments toggle

Public showcase routes are read-only. Editing remains owner-only inside `/w/[workspaceId]`. Assets and documents should eventually have their own visibility controls, but the first version can show route shells until backend visibility enforcement exists.

## Open Clarifications Needed Later

- Exact Godot export presets and naming conventions.
- Which generation providers/models are used first in production.
- Whether narrative generation and image generation share a common prompt preset system or separate ones.
- Backup/sync policy beyond Supabase Storage.
