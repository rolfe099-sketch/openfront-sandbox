# Changelog

This file is the live project memory for OpenFront Sandbox.

Before making project updates, read this file first. After making meaningful changes, add a short entry under `Unreleased` so future work can quickly recover the current state after context compaction.

## Unreleased

### Added

- Created repository documentation for architecture decisions, OpenFront mechanics source tracking, and project discipline.
- Added this live changelog as the first place to check before project updates.
- Added an upstream watch framework for OpenFront source, release, terms, privacy, and mechanics-assumption review.
- Added Phase 0 README roadmap and project vocabulary for the long-term north star, fair-play sandbox boundary, upstream watch process, changelog-first rule, and `optimal under stated assumptions`.
- Added Phase 1A Vite, React, and TypeScript website scaffold with quality gates.
- Added shared app config, initial OpenFront Sandbox shell UI, support button placeholder, fair-play messaging, and `optimal under stated assumptions` messaging.
- Added reserved extension folders for popup, options, background, and manifest work without runtime behavior or permissions.
- Added version-control checkpoint workflow documentation with quality gates, changelog/ADR updates, git status review, proposed commit messages, optional phase tags, and approval-before-commit rules.
- Added Phase 1B licensing and attribution inspection documentation for OpenFront source, open assets, proprietary assets, and future attribution expectations.
- Added an OpenFront source map and source-intake process using an ignored local `.external/openfront` clone.
- Updated the mechanics source register to require source-faithful implementation by default and to record located upstream source paths without implementing mechanics.
- Excluded the ignored `.external/` source-inspection directory from ESLint project scans.
- Excluded the ignored `.external/` source-inspection directory from Vitest project scans.
- Added AGPL-3.0-only project licensing, root `LICENSE`, root `NOTICE`, and package license metadata.
- Added an OpenFront asset policy and initial asset inventory for future compliant use of open `resources` assets.
- Updated public docs to support compliance-first, source-derived architecture without copying OpenFront source or assets yet.
- Added Phase 1C local OpenFront clone verification, source-area mapping, and expanded high-level asset inventory at a pinned upstream commit.
- Added root `AGENTS.md` as the standing development contract for AI and coding assistants.
- Updated the README contributor process to point coding assistants to `AGENTS.md` before making changes.
- Added benchmark policy, support and coordination, simulation evaluation, and replay-review architecture boundaries for future offline coaching work.
- Added Phase 1D source-reference helpers and source-aligned scenario model infrastructure for future source-derived mechanics.
- Added Phase 1E source-derived OpenFront GameMap tile geometry helpers and tests for coordinate/ref conversion, validation, neighbors, distances, and circle search.
- Added Phase 1F source-derived OpenFront build/action catalogue helpers and tests for unit groups, build menu order, player-buildable membership, and construction kind classification.
- Added Phase 1G source-derived disabled-unit checks and tests for OpenFront-style `disabledUnits` membership behavior.
- Added Phase 1H source-aligned build availability preflight boundaries with active catalogue and disabled-unit reasons plus inactive future reason metadata.
- Added Phase 1I Build Availability Preflight V1 with source-derived target ref bounds validation, pass/fail helpers, and cautious explanation helpers.

### Notes

- The project now has a website app scaffold, package setup, build scripts, and a minimal test.
- Only the Phase 1E pure tile geometry primitives, Phase 1F build/action catalogue classification helpers, Phase 1G disabled-unit membership checks, and Phase 1I build availability preflight V1 boundary checks are implemented; broader OpenFront gameplay mechanics are not implemented yet.
- Major features, external integrations, new dependencies, and expanded browser permissions require approval before implementation.
- Upstream watch reports are informational only and must not automatically change gameplay formulas, fair-play rules, or browser permissions.
- Phase 1A intentionally does not implement mechanics, scoring, saved scenarios, storage, browser extension runtime behavior, content scripts, OpenFront integration, backend services, or analytics.
- Phase 1B intentionally does not implement mechanics, formulas, scoring, maps, canvas UI, extension behavior, permissions, content scripts, OpenFront integration, backend services, storage, or analytics.
- Future mechanics work is source-faithful by default; temporary educational placeholders require explicit approval and visible labeling.
- Future source and asset intake must track upstream paths, commit hashes, license status, attribution, and review notes before release.
- Phase 1C intentionally does not implement mechanics, formulas, scoring, map data, canvas UI, extension behavior, permissions, content scripts, OpenFront integration, backend services, storage, analytics, copied OpenFront source, or copied OpenFront assets.
- Benchmark policy, support and coordination actions, simulation evaluation, and replay-style review are not implemented and must remain offline or post-game only.
- Phase 1D intentionally does not implement mechanics, formulas, scoring, simulation, map loading, UI canvas, extension behavior, permissions, content scripts, OpenFront integration, backend services, storage, analytics, copied OpenFront source, or copied OpenFront assets.
- Phase 1E intentionally does not implement terrain, ownership, map binaries, map assets, BFS, pathfinding, scoring, simulation, UI canvas, extension behavior, permissions, content scripts, OpenFront integration, backend services, storage, analytics, copied OpenFront source, or copied OpenFront assets.
- Phase 1F intentionally does not implement costs, placement legality, disabled-unit checks, economy, construction duration, combat, action execution, UI canvas, UI icons/assets, extension behavior, permissions, content scripts, OpenFront integration, backend services, storage, analytics, copied OpenFront source, or copied OpenFront assets.
- Phase 1G intentionally does not implement public-modifier-to-unit mappings, costs, placement legality, economy checks, construction duration, build execution, combat, scoring, simulation, UI canvas, extension behavior, permissions, content scripts, OpenFront integration, backend services, storage, analytics, copied OpenFront source, or copied OpenFront assets.
- Phase 1H intentionally does not implement costs, gold checks, placement legality, target tile validation, player alive state, spawn phase logic, upgrade validity, construction duration, construction execution, combat, scoring, simulation, UI canvas, extension behavior, permissions, content scripts, OpenFront integration, backend services, storage, analytics, copied OpenFront source, or copied OpenFront assets.
- Phase 1I intentionally does not implement terrain checks, ownership checks, coast/water/land placement rules, spawn validity, placement legality, costs, gold checks, player alive state, spawn phase logic, upgrade validity, construction duration, construction execution, combat, scoring, simulation, UI canvas, extension behavior, permissions, content scripts, OpenFront integration, backend services, storage, analytics, copied OpenFront source, or copied OpenFront assets.
- No commits or tags should be created automatically; both require explicit approval.
