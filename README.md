# OpenFront Sandbox

OpenFront Sandbox is an independent, fair-play, offline training sandbox for learning OpenFront strategy. It aims to become a source-faithful practice environment where players can test decisions, study mechanics, and eventually run simulations without interacting with live matches.

OpenFront Sandbox is not affiliated with or endorsed by OpenFront unless otherwise stated.

## Status

- Current phase: Phase 1E
- Current focus: source-derived OpenFront GameMap tile geometry primitives
- Playable mechanics: not implemented yet
- Live match integration: not implemented and not planned without explicit review
- Local app shell: available

## What This Will Become

OpenFront Sandbox is planned as a practice space for understanding OpenFront decisions before they happen in real matches.

Planned directions include:

- Source-faithful offline strategy practice.
- Scenario drills for common map, expansion, defense, and timing decisions.
- Map and mechanics study based on reviewed OpenFront public source behavior.
- Offline benchmark, simulation evaluation, and replay-style coaching tools in later phases.
- Clear explanations of what is optimal under stated assumptions.

## Fair Play

OpenFront Sandbox is designed for manual, offline learning. It should teach decision quality without touching live gameplay.

The project does not include:

- Live match interaction.
- Gameplay automation.
- Hidden-state reading.
- Live overlays.
- Content scripts.
- OpenFront client modification.
- Browser host permissions.

Any feature that could become a live gameplay advantage or cheat-adjacent behavior requires explicit review before implementation.

## Current Features

- Vite, React, and TypeScript website app shell.
- Public project documentation and roadmap.
- AGPL-3.0-only project license and NOTICE attribution.
- Source and asset intake policy for future OpenFront-derived work.
- Upstream watch process for source, release, and policy awareness.
- Source-derived pure tile geometry helpers for OpenFront-style map coordinates.
- Reserved browser extension folder structure with no runtime behavior or permissions.

There are no playable mechanics, planner formulas, scoring systems, saved scenarios, browser permissions, extension runtime behavior, content scripts, OpenFront integrations, backend services, analytics, or storage features.

## Local Development

Install dependencies:

```bash
npm install
```

Run the local app:

```bash
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

## Source-Faithful Approach

OpenFront Sandbox aims to use OpenFront public source code and open assets where legally and technically practical. The goal is source-faithful offline training, not an OpenFront-inspired approximation.

Future source-derived mechanics must be tracked with upstream paths, commit hashes, license status, attribution, and review notes. OpenFront open assets from upstream `/resources` may be used later only when they are documented and attributed. Proprietary, external, premium, or unknown-license OpenFront assets are not used.

When OpenFront Sandbox calls something `optimal`, it means `optimal under stated assumptions`: the best recommendation for the visible inputs, documented assumptions, simplifications, and sourced formulas currently in use. It does not mean guaranteed perfect play, hidden-state awareness, live-game automation, or exact OpenFront behavior unless the relevant mechanics are source-code verified and documented.

Future benchmark, simulation evaluation, and replay-review architecture is tracked in `docs/benchmark-policy-engine.md`.

## License and Attribution

OpenFront Sandbox code is licensed under AGPL-3.0-only. See `LICENSE`.

OpenFront-derived code, if added later, will be handled under AGPL-compatible terms and tracked with upstream paths, commit hashes, license status, and change notes.

OpenFront open assets from upstream `/resources`, if added later, will be tracked and attributed under CC BY-SA 4.0 unless otherwise indicated by upstream files. Proprietary or unknown-license OpenFront assets are not used.

OpenFront Sandbox preserves OpenFront attribution in `NOTICE`. OpenFront is copyright OpenFront and Contributors. OpenFront Sandbox is not affiliated with or endorsed by OpenFront unless otherwise stated.

## Roadmap

### Phase 0: Project Guardrails

- Establish changelog, project discipline, architecture decisions, mechanics source tracking, and upstream watch docs.
- Define the fair-play sandbox boundary.
- Define `optimal under stated assumptions`.

### Phase 1A: Website App Shell

- Create the Vite, React, and TypeScript app shell.
- Add quality gates.
- Add fair-play messaging and support button placeholder.
- Reserve extension folders without runtime behavior or permissions.

### Phase 1B: Licensing and Source Intake

- License OpenFront Sandbox code under AGPL-3.0-only.
- Add NOTICE attribution.
- Document source and asset intake policy.
- Prepare for future source-derived mechanics without copying OpenFront code or assets yet.

### Phase 1C: Source and Asset Inventory

- Verify the local ignored OpenFront source clone.
- Record the checked OpenFront branch and commit.
- Map relevant source areas for future source-derived mechanics.
- Expand the high-level asset inventory without copying OpenFront source or assets.

### Later Phases, Approval Required

- Source-derived mechanic models.
- Visual sandbox grid.
- Analysis panel and scenario explanations.
- Saved scenarios through local browser storage.
- Extension launcher with no live-match advantage.
- GitHub Pages deployment.
- Simulation and replay-style coaching tools after source, fair-play, and scope review.

Major features such as live overlays, content scripts, AI opponents, Monte Carlo full-game simulations, accounts, backend services, analytics, external APIs, or expanded browser permissions require approval before implementation.

## Contributor / Maintainer Process

Before changing mechanics, compliance-sensitive features, source intake, or asset intake, check the project documents listed below and keep the changelog current.

Key project documents:

- `AGENTS.md`
- `CHANGELOG.md`
- `docs/project-discipline.md`
- `docs/licensing-and-attribution.md`
- `docs/openfront-asset-policy.md`
- `docs/openfront-asset-inventory.md`
- `docs/openfront-source-map.md`
- `docs/openfront-mechanics-sources.md`
- `docs/benchmark-policy-engine.md`
- `docs/upstream-watch.md`
- `docs/upstream-status.json`

AI/coding assistants should read `AGENTS.md` before making changes.

The upstream watch process tracks OpenFront source, releases, terms, privacy policy, and local mechanics assumptions. It may detect and summarize changes, but it must not automatically update formulas, mechanics, fair-play policy, permissions, content scripts, planner behavior, or OpenFront integration behavior.

If `docs/upstream-status.json` has `"reviewRequired": true`, stop before changing game-related or compliance-sensitive logic and ask for approval.

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

- `v0.1.0-phase-1a` for app shell.
- `v0.1.1-phase-1b` for licensing and source intake.
- `v0.1.2-phase-1c` for source and asset inventory.
- `v0.1.3-phase-1d` for visual sandbox grid.
- `v0.1.4-phase-1e` for analysis panel.
- `v0.1.5-phase-1f` for extension launcher.
- `v0.1.6-phase-1g` for GitHub Pages deployment.

The upstream watch script is wired as:

```bash
npm run upstream:check
```

It requires network access and writes human-review reports only.

## Support

OpenFront Sandbox is free and fair-play focused. If the project helps you, support links may be added later through Buy Me a Coffee.
