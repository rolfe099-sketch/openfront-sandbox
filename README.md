# OpenFront Sandbox

OpenFront Sandbox is planned as an offline, manual training environment for learning OpenFront-style decision making without touching live gameplay.

## Long-Term North Star

The long-term north star is to help a player reason clearly about OpenFront strategy: compare choices, understand tradeoffs, practice scenarios, and see why an option may be strong under stated assumptions. The project should teach decision quality, not automate live play.

## Fair-Play Sandbox Boundary

Phase 0 and Phase 1 stay inside a sandbox/manual/offline boundary:

- No OpenFront page integration
- No content scripts
- No live overlays
- No gameplay automation
- No hidden-state reading
- No client modification
- No host permissions
- No formulas or scoring that claim to be exact unless sourced and reviewed

Any feature that could become a live gameplay advantage or cheat-adjacent behavior requires explicit approval before implementation.

## Optimal Under Stated Assumptions

When OpenFront Sandbox calls something `optimal`, it means `optimal under stated assumptions`: the best recommendation for the visible inputs, documented assumptions, simplifications, and sourced formulas currently in use.

It does not mean guaranteed perfect play, hidden-state awareness, live-game automation, or exact OpenFront behavior unless the relevant mechanics are source-code verified and documented.

## Upstream Watch

The upstream watch process tracks OpenFront source, releases, terms, privacy policy, and local mechanics assumptions. It may detect and summarize changes, but it must not automatically update formulas, mechanics, fair-play policy, permissions, content scripts, planner behavior, or OpenFront integration behavior.

Read `docs/upstream-watch.md` and `docs/upstream-status.json` before mechanics or compliance-sensitive changes. If `reviewRequired` is true, stop and ask for approval.

## Changelog-First Rule

Before updating the project, read `CHANGELOG.md`. After meaningful changes, update it so future work can recover the current state quickly after context compaction.

## Roadmap

### Phase 0: Project Guardrails

- Maintain `CHANGELOG.md` as the live project memory.
- Maintain project discipline, architecture decisions, mechanics source tracking, and upstream watch docs.
- Keep the repo free of app code, dependencies, mechanics, scoring, and planner formulas until Phase 1 is approved.

### Phase 1: Local Training App, Pending Approval

- Scaffold a minimal local app shell.
- Keep data local.
- Avoid host permissions.
- Use no OpenFront page integration.
- Present unverified logic as training assumptions.
- Reserve extension folder structure without runtime behavior.

### Later Phases, Approval Required

- Saved scenarios through local browser storage.
- More detailed scenario tools.
- Source-verified mechanic models.
- Supporter-only ideas documented for later, not paywalled into core learning.

Major features such as live overlays, content scripts, AI opponents, Monte Carlo full-game simulations, accounts, backend services, analytics, external APIs, or expanded browser permissions require approval before implementation.

## Current State

Phase 1A has a Vite, React, and TypeScript website shell with quality gates, shared config, a support button placeholder, fair-play messaging, and reserved extension folders.

There are no implemented mechanics, planner formulas, scoring systems, saved scenarios, browser permissions, extension runtime behavior, content scripts, OpenFront integrations, backend services, analytics, or storage features.

## Local Development

Install dependencies, then run the local dev server:

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173`.

Run quality gates:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

## Version-Control Checkpoints

After each meaningful phase or subphase:

1. Run quality gates:
   - `npm run typecheck`
   - `npm run lint`
   - `npm run test`
   - `npm run build`
2. Update `CHANGELOG.md`.
3. Update `docs/architecture-decisions.md` if architecture changed.
4. Show `git status`.
5. Propose a commit message and optional version tag.
6. Wait for approval before committing.

Do not auto-commit or create tags without explicit approval.

Version tag pattern:

- `v0.1.0-phase-1a` for app shell
- `v0.1.1-phase-1b` for core math foundation
- `v0.1.2-phase-1c` for visual sandbox grid
- `v0.1.3-phase-1d` for analysis panel
- `v0.1.4-phase-1e` for extension launcher
- `v0.1.5-phase-1f` for GitHub Pages deployment

A future `npm run checkpoint` helper may be added only if it does not commit or tag automatically. It should only run quality gates, print git status, remind the user to update the changelog, and suggest the next tag.

The upstream watch script is wired as:

```bash
npm run upstream:check
```

It requires network access and writes human-review reports only. It must not update gameplay formulas or compliance-sensitive behavior automatically.
