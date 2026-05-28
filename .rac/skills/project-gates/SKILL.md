+++
name = "Project Gates"
description = "Run ForgetKit web quality gates before review"
+++
# Project Gates - forgetkit-web

Run the required quality gates and summarize pass/fail with evidence.

Required:
- `npm run lint`
- `npm run build` when the environment permits

When tests are configured:
- Run unit tests for changed behavior.
- Run integration tests for changed workflows.

Report any skipped command with the exact reason.
