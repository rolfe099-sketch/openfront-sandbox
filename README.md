# OpenFront Sandbox

OpenFront Sandbox is an independent, fair-play, offline training sandbox for learning OpenFront-style decision making without touching live gameplay.

It aims to be source-faithful to OpenFront where legally and technically practical. OpenFront Sandbox is not affiliated with or endorsed by OpenFront unless otherwise stated.

## Long-Term North Star

The long-term north star is to help a player reason clearly about OpenFront strategy: compare choices, understand tradeoffs, practice scenarios, and see why an option may be strong under stated assumptions. The project should teach decision quality, not automate live play.

## Fair-Play Sandbox Boundary

Phase 0 and Phase 1 stay inside a sandbox/manual/offline boundary:

- No interaction with live matches
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

## Source Intake and Licensing

OpenFront source research uses an ignored local clone at `.external/openfront`. Future approved source or asset intake should use direct OpenFront public source and open assets where legally allowed, technically useful, and tracked.

Do not commit OpenFront source code, maps, resources, proprietary assets, or generated copies of those materials into this repository until the specific intake is approved and documented.

Licensing and source-intake notes live in:

- `docs/licensing-and-attribution.md`
- `docs/openfront-asset-policy.md`
- `docs/openfront-asset-inventory.md`
- `docs/openfront-source-map.md`
- `docs/openfront-mechanics-sources.md`

OpenFront Sandbox is source-faithful by default. Do not add invented mechanics, fake formulas, fake constants, fake maps, or arbitrary gameplay values unless they are explicitly approved as temporary educational placeholders. Proprietary, external, premium, or unknown-license OpenFront assets are not used.

## License and Attribution

OpenFront Sandbox code is licensed under AGPL-3.0-only. See `LICENSE`.

OpenFront-derived code, if added later, will be handled under AGPL-compatible terms and tracked with upstream paths, commit hashes, license status, and change notes.

OpenFront open assets from upstream `/resources`, if added later, will be tracked and attributed under CC BY-SA 4.0 unless otherwise indicated by upstream files. Proprietary or unknown-license OpenFront assets are not used.

OpenFront Sandbox preserves OpenFront attribution in `NOTICE`. OpenFront is © OpenFront and Contributors. OpenFront Sandbox is not affiliated with or endorsed by OpenFront unless otherwise stated.

## Changelog-First Rule

Before updating the project, read `CHANGELOG.md`. After meaningful changes, update it so future work can recover the current state quickly after context compaction.

## Roadmap

### Phase 0: Project Guardrails

- Maintain `CHANGELOG.md` as the live project memory.
- Maintain project discipline, architecture decisions, mechanics source tracking, and upstream watch docs.
- Keep the repo free of app code, dependencies, mechanics, scoring, and planner formulas until Phase 1 is approved.

### Phase 1: Local Training App

- Scaffold a minimal local app shell.
- Inspect licensing and source structure before implementing mechanics.
- Keep data local.
- Avoid host permissions.
- Use no OpenFront page integration.
- Use source-faithful mechanics by default; temporary placeholders require explicit approval and visible labeling.
- Reserve extension folder structure without runtime behavior.
- Proceed through subphases only after approval.

### Later Phases, Approval Required

- Saved scenarios through local browser storage.
- More detailed scenario tools.
- Source-verified mechanic models.
- Approved source-derived mechanics and open asset intake with attribution tracking.
- Supporter-only ideas documented for later, not paywalled into core learning.

Major features such as live overlays, content scripts, AI opponents, Monte Carlo full-game simulations, accounts, backend services, analytics, external APIs, or expanded browser permissions require approval before implementation.

## Current State

Phase 1A has a Vite, React, and TypeScript website shell with quality gates, shared config, a support button placeholder, fair-play messaging, and reserved extension folders.

Phase 1B has AGPL-3.0-only project licensing, NOTICE attribution, asset policy, asset inventory, and source-intake documentation pinned to a checked OpenFront source commit. The OpenFront source clone is local-only and ignored by Git.

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
- `v0.1.1-phase-1b` for licensing and source intake
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
